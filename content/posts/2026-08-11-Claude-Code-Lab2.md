---
title: "Claude Code로 취약점 찾기 #2 — GraphQL 심화"
date: 2026-08-11T01:00:00+09:00
categories: ["web"]
url: /categories/web/claude-code-lab-2/
---

<br>

# Claude Code로 취약점 찾기 #2 — GraphQL 심화

이번 편에서는 GraphQL 관련 랩 3개를 진행했다. 지난 편에서 GraphQL 기초를 다뤘다면, 이번엔 Introspection 차단 우회, 숨겨진 필드 노출, 브루트포스 보호 우회까지 한 단계 더 들어간다.

이번 편에서 다룬 랩은 세 개다.

- <strong>Lab 1:</strong> Finding a hidden GraphQL endpoint
- <strong>Lab 2:</strong> Accidental exposure of private GraphQL fields
- <strong>Lab 3:</strong> Bypassing GraphQL brute force protections

<br>

## Lab 1: Finding a hidden GraphQL endpoint

### JS 파일 분석

katana 크롤링 결과 GraphQL 관련 JS 파일이 없었다. `labHeader.js` 하나뿐이었고 내부에도 단서가 없었다. JS 번들에서 단서를 얻을 수 없는 경우다.

### 엔드포인트 탐색

JS에서 단서가 없으면 다음 단계는 직접 엔드포인트를 찾는 것이다. 일반적인 GraphQL 경로들에 요청을 보냈다.

대부분 404가 나왔지만 `/api`만 달랐다.

- POST 요청 → `405 Method Not Allowed (Allow: GET)`
- GET 요청 (쿼리 없이) → `400 "Query not present"`

<strong>404가 아니라는 것 자체가 신호다.</strong> 경로가 실제로 존재한다는 의미다. "Query not present"는 GraphQL 엔드포인트 특유의 에러 메시지다. `/api`가 GraphQL 엔드포인트임을 확인했다.

### Introspection 차단 우회

표준 Introspection 쿼리를 보내자 서버가 차단했다.

```
"GraphQL introspection is not allowed, but the query contained __schema or __type"
```

필터가 `__schema {` 패턴을 문자열로 감지하고 있었다. `__schema`와 `{` 사이에 개행 문자를 삽입했다.

```graphql
query {
  __schema
  {
    ...
  }
}
```

GraphQL 문법상 토큰 사이 개행은 공백과 동일하게 처리된다. 하지만 서버의 문자열 필터는 패턴을 인식하지 못했다. 우회 성공, 36KB 스키마 전체를 덤프했다.

### 숨겨진 Mutation 발견 및 공격

스키마에서 UI에 노출되지 않은 기능이 나왔다.

```graphql
type mutation {
  deleteOrganizationUser(input: DeleteOrganizationUserInput): DeleteOrganizationUserResponse
}
```

`getUser(id: N)` 쿼리로 사용자를 열거했다.

| id | username |
|---|---|
| 1 | administrator |
| 2 | wiener |
| 3 | carlos |

인증 없이 `deleteOrganizationUser(input: { id: 3 })`를 호출했고 carlos 계정이 삭제됐다. 랩 클리어.

### 핵심 포인트

JS 번들에 단서가 없어도 포기하지 않는다. 404가 아닌 응답 코드에 주목하고, Introspection 차단은 문자열 필터 수준인 경우가 많아 개행 삽입으로 우회할 수 있다.

<br>

## Lab 2: Accidental exposure of private GraphQL fields

### JS 파일 분석

katana에서 JS 파일 3개가 나왔다.

```
/resources/js/gqlUtil.js       → 엔드포인트: /graphql/v1
/resources/js/blogSummaryGql.js → getAllBlogPosts 쿼리
/resources/js/loginGql.js      → login mutation
```

`loginGql.js`를 열어보니 로그인이 GraphQL mutation으로 처리되고 있었다. 응답으로 `token`과 `success`만 반환하는 것처럼 보였다.

### Introspection으로 숨겨진 필드 발견

Introspection으로 전체 스키마를 덤프했다. User 타입에서 문제가 발견됐다.

```graphql
type User {
    id: Int!
    username: String!
    password: String!
}
```

`password` 필드가 그대로 노출되어 있었다. JS 파일 어디에도 `password`를 요청하는 코드는 없었지만, 스키마에는 존재했다.

### 공격 체인

<strong>1단계 — administrator 비밀번호 탈취</strong>

`getUser(id: 1)` 쿼리에 `password` 필드를 추가해서 요청했다. administrator의 평문 비밀번호가 응답에 그대로 담겨 나왔다.

<strong>2단계 — administrator 로그인</strong>

`login` mutation으로 획득한 비밀번호를 사용해 세션 토큰을 발급받았다.

<strong>3단계 — carlos 계정 삭제</strong>

GraphQL 스키마에는 삭제 mutation이 없었다. administrator 세션 토큰을 브라우저 쿠키에 직접 주입하고 `/admin` 페이지에서 carlos 계정을 삭제했다. 랩 클리어.

### 핵심 포인트

개발자가 UI에서 요청하지 않는다고 해서 안전한 게 아니다. GraphQL 스키마에 필드가 존재하는 한 누구나 직접 쿼리할 수 있다. Introspection으로 스키마를 덤프하는 이유가 여기 있다.

<br>

## Lab 3: Bypassing GraphQL brute force protections

### 접근 순서

이 랩에서 중요한 건 기술보다 <strong>사고 순서</strong>다.

1. JS 파일 3개 확인 → 로그인이 GraphQL mutation으로 처리됨
2. Introspection으로 스키마 파악 → `login`, `changeEmail` mutation 존재
3. 사이트 직접 확인 → 로그인 페이지 존재, carlos 계정과 패스워드 목록 보유
4. 보호 메커니즘 파악 → 3번 실패 후 1분 잠금

랩 이름을 보고 바로 브루트포스로 뛰어들면 안 된다. 보호가 어떻게 구현됐는지 먼저 확인해야 우회 방법을 도출할 수 있다.

### 브루트포스 보호 분석

carlos 계정으로 틀린 패스워드를 연속으로 시도했다.

- 1~3번: 정상 실패 응답
- 4번째부터: "Too many incorrect login attempts. Please try again in 1 minute(s)."

주목할 점이 있었다. <strong>매 요청마다 새 세션 토큰이 발급됐다.</strong> 잠금이 IP나 계정이 아니라 세션 단위로 카운트될 가능성이 있었다.

### GraphQL Alias로 우회

세션 단위 잠금이라면 한 번의 요청에 여러 패스워드를 담아 보내면 된다. GraphQL alias를 사용했다.

```graphql
mutation {
    attempt1: login(input: {username: "carlos", password: "abc"}) { success token }
    attempt2: login(input: {username: "carlos", password: "def"}) { success token }
    attempt3: login(input: {username: "carlos", password: "ghi"}) { success token }
    ...
}
```

서버 입장에서는 요청 1번이지만 실제로는 78개의 패스워드를 동시에 시도한 것이다. 잠금 카운터가 올라가지 않았다.

78개 후보 패스워드를 한 번의 요청에 담아 보냈고 `summer`가 `success: true`를 반환했다. 브라우저에서 직접 로그인해서 확인했다. 랩 클리어.

### 핵심 포인트

브루트포스 보호를 우회하는 방법은 보호가 어떻게 구현됐는지에 달려있다. 요청 횟수로 카운트하면 한 요청에 여러 시도를 담는다. IP로 차단하면 IP를 바꾼다. 먼저 파악하고, 그 다음 우회한다.

<br>

## 3개 랩을 통해 확인한 것

GraphQL은 단일 엔드포인트에 모든 기능이 집중된다. 이게 강점이자 약점이다. Introspection이 활성화되어 있으면 스키마 전체가 노출되고, 비활성화되어 있어도 우회할 수 있는 경우가 많다. JS 파일에서 단서가 없어도 포기하지 않는다. 404가 아닌 응답, 예상과 다른 에러 메시지, 스키마와 UI의 차이 — 이 간극에서 취약점이 나온다.

다음 편에서는 API Testing 랩을 다룬다.
