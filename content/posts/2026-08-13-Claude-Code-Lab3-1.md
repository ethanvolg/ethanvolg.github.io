---
title: "Claude Code로 취약점 찾기 #3-1 — API 문서 노출과 BFLA"
date: 2026-08-13T00:30:00+09:00
categories: ["web"]
url: /categories/web/claude-code-lab-3-1/
---

<br>

# Claude Code로 취약점 찾기 #3-1 — API 문서 노출과 BFLA

이번 편에서는 API Testing 랩을 진행했다. 랩 이름도 모르고, 아무것도 모른다는 가정에서 시작했다. 이 글에서 중요한 건 취약점 자체보다 <strong>어떤 순서로 생각하고 판단했는가에 집중했다.</strong> 실수도 포함해서 그대로 기록한다.

<br>

## 시작: 사이트를 둘러보며 파악하기

우선 Burp를 프록시로 켜놓고 사이트를 전체적으로 둘러보며 어떤 기능이 있는지 파악했다. 단지 로그인 기능 뿐이라서 사전에 랩에서 알려준 `wiener:peter` 로 로그인을 진행했고, 이후 추가 기능을 살펴보았다.

확인된 기능은 하나였다. <strong>이메일 변경</strong>. Burp HTTP History에서 이메일 변경 요청을 확인했다.

```
PATCH /api/user/wiener
{"email": "wiener@normal-user.net"}
```

REST API를 사용하고 있었다. 인증은 세션 쿠키 방식이었다. URL 경로에 username이 직접 들어가는 구조였다.

<br>

## 1단계: IDOR 시도

URL 경로에 username이 노출되어 있으니 첫 번째로 시도한 건 IDOR이었다. `wiener` 세션으로 `/api/user/carlos`에 PATCH 요청을 보냈다.

결과는 401 Forbidden이었다. 서버가 소유권을 검증하고 있었다. IDOR은 막혀있었다.

<br>

## 2단계: 허용 메서드 확인

IDOR이 막혔으니 다음 판단은 이것이었다.

> "PATCH 외에 다른 메서드가 살아있을 수 있다."

OPTIONS 요청을 보냈다.

```
OPTIONS /api/user/wiener
→ 405 Method Not Allowed
Allow: GET, PATCH, DELETE
```

OPTIONS 자체는 거부됐지만 <strong>Allow 헤더에 허용 메서드 목록이 담겨 있었다.</strong> GET, PATCH, DELETE 세 가지가 살아있었다.

여기서 실수가 발생했다. Claude Code에 "모든 메서드를 테스트해줘"라고 지시했고, DELETE 요청이 실제로 실행되어 wiener 계정이 삭제됐다.

<strong>이 실수에서 배운 것:</strong>

OPTIONS 응답의 Allow 헤더를 먼저 읽었으면 됐다. DELETE가 있다는 걸 확인한 다음, 실행할지는 사람이 판단했어야 했다. 프롬프트에 제약 조건을 명시하지 않은 게 원인이었다.

```
# 잘못된 프롬프트
"모든 메서드를 테스트해줘"

# 올바른 프롬프트
"OPTIONS 요청을 보내서 Allow 헤더를 확인해줘.
DELETE 같은 파괴적인 요청은 실행하지 말고
존재 여부만 보고해줘."
```

랩을 새로 열고 다시 시작했다.

<br>

## 3단계: 허용 메서드 안전하게 확인

이번엔 프롬프트에 제약 조건을 명시했다.

```
OPTIONS 요청을 보내서 Allow 헤더를 확인해줘.
DELETE나 PUT 같은 파괴적인 요청은 절대 실행하지 마.
허용 메서드 목록에 있어도 실행하지 말고 존재 여부만 보고해줘.
```

결과는 동일했다. Allow 헤더에 GET, PATCH, DELETE가 확인됐다. 이번엔 실행하지 않고 존재 여부만 파악했다.

이어서 GET과 PATCH를 테스트했다.

- GET → `{"username":"wiener","email":"wiener@normal-user.net"}` 반환
- PATCH → email 필드 변경 정상 동작

<br>

## 4단계: Mass Assignment 시도

PATCH에서 email만 변경하는 게 확인됐으니, 다른 필드도 같이 보내면 어떻게 되는지 확인했다.

```json
{"email": "test@test.com", "role": "admin"}
{"email": "test@test.com", "username": "administrator"}
{"email": "test@test.com", "admin": true}
```

세 케이스 모두 email만 반영됐다. 서버가 화이트리스트 방식으로 파싱하고 있었다. Mass Assignment 취약점은 없었다.

이 시도가 의미 있는 이유는, 실패를 확인하고 나서야 다음 방향으로 넘어갈 수 있기 때문이다. 시도하지 않고 넘어가면 나중에 다시 돌아와야 한다.

<br>

## 5단계: API 문서 탐색

이미 `/api/user/wiener`라는 경로를 알고 있었다. 자연스러운 다음 판단은 상위 경로였다.

> "/api/ 자체에 접근하면 뭔가 나오지 않을까?"

`/api/`에 GET 요청을 보냈다. 200 OK가 반환됐다.

```
GET /api/ → 200 OK (HTML 문서 페이지)
GET /api/openapi.json → 200 OK (OpenAPI 3.0.0 스펙)
```

사이트 어디에도 링크되어 있지 않은 페이지였다. API 문서가 그대로 노출되어 있었다.

<strong>`/api/` 문서 내용:</strong>

| Verb | Endpoint | Response |
|---|---|---|
| GET | /user/[username] | User |
| DELETE | /user/[username] | Result |
| PATCH | /user/[username] | User |

해당 섹션을 다시 작성해드릴게요. 기존 어투 유지합니다.

------

## 5단계: API 문서 탐색

이미 `/api/user/wiener`라는 경로를 알고 있었다. 자연스러운 다음 판단은 상위 경로였다.

> "/api/ 자체에 접근하면 뭔가 나오지 않을까?"

`/api/`에 GET 요청을 보냈다. 200 OK가 반환됐다. 사이트 어디에도 링크되어 있지 않은 API 문서 페이지였다.

| Verb   | Endpoint         | Response |
| ------ | ---------------- | -------- |
| GET    | /user/[username] | User     |
| DELETE | /user/[username] | Result   |
| PATCH  | /user/[username] | User     |

여기서 한 가지 추론을 했다. **이 HTML 페이지는 어딘가에 있는 원본 파일을 읽어서 렌더링한 결과물일 가능성이 높다.**

개발자들이 API 문서를 만드는 방식은 보통 이렇다. `openapi.json` 같은 원본 스펙 파일을 먼저 작성하고, Swagger UI나 ReDoc 같은 도구가 이 파일을 읽어서 사람이 보기 좋은 HTML 페이지로 자동 렌더링한다. HTML 문서는 결과물이고, 원본 파일이 어딘가 있다는 뜻이다.

페이지 소스를 확인하면 어떤 원본 파일을 쓰는지 바로 알 수 있는 경우가 많다. Swagger UI라면 소스 안에 이런 코드가 있다.

```javascript
SwaggerUIBundle({
    url: "/api/openapi.json",
    ...
})
```

원본 파일 경로가 소스에 직접 명시되어 있다. 소스에서 못 찾으면 렌더링 도구와 프레임워크 관례 순서로 시도한다.

| 발견한 것          | 추론 가능한 원본                                 |
| ------------------ | ------------------------------------------------ |
| Swagger UI 화면    | `/openapi.json`, `/swagger.json`, `/v2/api-docs` |
| ReDoc 화면         | `/openapi.json`, `/openapi.yaml`                 |
| Spring Boot 서비스 | `/v2/api-docs`, `/v3/api-docs`                   |
| FastAPI (Python)   | `/openapi.json`, `/docs`, `/redoc`               |
| Express/Node.js    | `/api-docs`, `/swagger.json`                     |
| Django REST        | `/api/schema/`, `/api/schema/swagger-ui/`        |

이 경우 `/api/openapi.json`을 시도했고 200이 반환됐다.

**`/api/openapi.json`에서 추가로 확인된 것:**

- User 스키마: `username`, `email` 두 필드만 정의됨 — Mass Assignment 시도 시 다른 필드가 무시된 이유가 여기서 확인됨
- `securitySchemes` 정의 없음 — 인증이 필요한지조차 문서에 명시되어 있지 않음

UI에는 PATCH만 노출되어 있었지만 문서에는 DELETE도 버젓이 적혀 있었다. 개발자가 "클라이언트에 없으니 안전하다"고 생각하고 숨겨둔 기능이었다. 문서를 찾으면 숨겨진 기능 전체가 드러난다.

<br>

## 6단계: DELETE 소유권 검증 확인

PATCH는 소유권 검증이 있었다. DELETE도 똑같이 검증하는지는 별개 문제다. 메서드별로 인가 로직이 다를 수 있다.

직접 실행하기 전에 존재하지 않는 사용자로 먼저 테스트했다.

```
DELETE /api/user/nonexist (wiener 세션)
→ 400 {"code": 404, "error": "User not found"}
```

PATCH를 carlos에 시도했을 때는 `401 Forbidden`이 왔다. DELETE는 `404 User not found`가 왔다. <strong>Forbidden이 아니라 404라는 것 자체가 신호였다.</strong> 소유권 검증 없이 사용자 조회 단계까지 도달했다는 의미였다.

```
DELETE /api/user/carlos (wiener 세션)
→ 200 OK {"status": "User deleted"}
```

인증(로그인 여부)만 확인하고 인가(본인 소유인지)는 확인하지 않았다. 이로서 랩 클리어를 할 수 있었다.

<br>

## 이 랩에서 확인한 것

<strong>취약점:</strong> BFLA (Broken Function Level Authorization)
같은 엔드포인트에서 PATCH는 소유권 검증을 하고, DELETE는 하지 않았다. 메서드별로 인가 로직이 다를 수 있다. 하나가 막혔다고 다른 메서드도 막혀있다고 가정하면 안 된다.

<strong>API 문서 탐색:</strong> 이미 발견한 경로의 상위로 올라가는 것이 자연스러운 흐름이다. `/api/user/wiener`를 발견했으면 `/api/`를 확인해본다. 개발자들이 편의를 위해 남겨둔 문서가 공격 표면이 된다.

<strong>Human-in-the-Loop:</strong> 이 랩에서 실제로 DELETE 실수가 발생했다. AI에게 "모든 메서드를 테스트해줘"라고 하면 DELETE도 실행한다. 파괴적인 요청은 프롬프트에 명시적으로 제약 조건을 걸어야 한다. OPTIONS 응답의 Allow 헤더를 먼저 읽고, 실행 여부는 사람이 판단한다.

다음 편에서는 Mass Assignment 취약점을 다룬다.
