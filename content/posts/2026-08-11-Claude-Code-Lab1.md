---
title: "Claude Code로 취약점 찾기 #1 — JS 번들 분석부터 GraphQL까지"
date: 2026-08-11T00:30:00+09:00
categories: ["web"]
url: /categories/web/claude-code-lab-1/
---

<br>

# Claude Code로 취약점 찾기 #1 — JS 번들 분석부터 GraphQL까지

이전 글에서 Claude Code를 버그바운티에 활용하는 방법론을 정리했다. 이번 글부터는 직접 실습하며 그 흐름이 실제로 어떻게 작동하는지 확인한다. 실습 환경은 PortSwigger Web Security Academy 랩을 사용했다.

이번 편에서 다룬 랩은 두 개다.

- <strong>Lab 1:</strong> Finding and exploiting an unused API endpoint
- <strong>Lab 2:</strong> Accessing private GraphQL posts

두 랩 모두 같은 흐름으로 접근했다. katana로 JS 파일을 수집하고, 파일을 분석해 숨겨진 엔드포인트를 찾은 뒤, Claude Code로 실제 요청을 보내 취약점을 검증했다.

<br>

## 공통 워크플로우

### JS 파일 수집

랩 URL을 열면 먼저 katana(설치 필요)로 사이트를 크롤링한다. JS 파일 목록이 자동으로 추출된다.

```
katana -u [타깃 URL] -jc -o js_urls.txt
```

실제 서비스의 JS 파일 이름에는 `main.a3f92bc.js` 같이 무작위 문자열이 붙어 있어서 URL을 미리 알 수 없다. 직접 사이트에 접속해서 로드되는 파일을 확인해야 한다. katana는 이 과정을 자동으로 처리해 준다.

추출된 URL 중 JS 파일만 다운로드한다.

```
mkdir -p ./js_files
grep '\.js' js_urls.txt | while read url; do
  curl -s -o "./js_files/$(basename "$url" | cut -d'?' -f1)" "$url"
done
```

<br>

## Lab 1: Finding and exploiting an unused API endpoint

### JS 파일 분석

katana 크롤링 결과에서 수상한 파일이 하나 보였다.

```
/resources/js/api/productPrice.js
```

파일 이름부터 API 관련임을 알 수 있다. 다운로드 후 내용을 확인했다.

```javascript
const loadPricing = (productId) => {
    const url = new URL(location);
    fetch(`//${url.host}/api/products/${encodeURIComponent(productId)}/price`)
        .then(res => res.json())
        .then(handleResponse(getAddToCartForm()));
};
```

`/api/products/${productId}/price` 엔드포인트가 보인다. 브라우저 UI에서는 GET으로 가격을 조회하는 용도로만 쓰이는 것처럼 보이지만, 실제로 어떤 HTTP 메서드가 허용되는지는 확인이 필요하다.

### Claude Code로 검증

Claude Code에 분석을 지시했다.

```
/api/products/1/price 엔드포인트에 OPTIONS 요청을 보내서
어떤 HTTP 메서드가 허용되는지 확인해줘.
타깃: [랩 URL]
```

결과가 바로 나왔다.

```
allow: GET, PATCH
```

<strong>GET 외에 PATCH가 허용되어 있었다.</strong> JS 파일에서는 GET만 쓰고 있었지만, API 자체는 PATCH도 받고 있었다. 서버 입장에서는 UI에 노출되지 않았으니 괜찮다고 생각했겠지만, JS 파일을 읽으면 누구나 엔드포인트를 찾을 수 있다.

이어서 PATCH 요청으로 가격을 0으로 바꾸는 테스트를 진행했고, 권한 검증 없이 가격이 변조됐고, 랩을 클리어 할 수 있었다.

### 핵심 포인트

기존 스캐너는 이 엔드포인트를 찾지 못한다. DNS 레벨이나 경로 퍼징으로는 JS 번들 안에 하드코딩된 API 주소를 볼 수 없기 때문이다. JS 파일을 직접 읽고 분석하는 것이 핵심이다.

<br>

## Lab 2: Accessing private GraphQL posts

### JS 파일 분석

katana 크롤링 결과에서 GraphQL 관련 파일 두 개가 나왔다.

```
/resources/js/blogSummaryGql.js
/resources/js/gqlUtil.js
```

`blogSummaryGql.js`를 열어보면 현재 사용 중인 GraphQL 쿼리가 그대로 들어있다.

```javascript
const QUERY = `
query getBlogSummaries {
    getAllBlogPosts {
        image
        title
        summary
        id
    }
}`;
```

`getAllBlogPosts`가 `image`, `title`, `summary`, `id`만 가져오고 있다. <strong>빠진 필드가 있을 가능성이 높다.</strong>

`gqlUtil.js`에서는 GraphQL 엔드포인트가 확인됐다.

```javascript
fetch('/graphql/v1', { method: 'POST', ... })
```

### Claude Code로 Introspection

Claude Code에 Introspection 쿼리를 지시했다.

```
/graphql/v1 엔드포인트에 Introspection 쿼리를 보내서
getAllBlogPosts에서 사용 가능한 모든 필드를 확인해줘.
타깃: [랩 URL]
```

결과로 나온 전체 필드 목록이다.

| 필드 | 타입 |
|---|---|
| id | Int! |
| image | String! |
| title | String! |
| author | String! |
| date | Timestamp! |
| summary | String! |
| paragraphs | [String!]! |
| isPrivate | Boolean! |
| postPassword | String |

<strong>`postPassword` 필드가 있었다.</strong> JS 파일의 쿼리에는 포함되어 있지 않았지만, GraphQL 스키마에는 실제로 존재하는 필드였다.

### 비공개 데이터 추출

`postPassword` 필드를 포함한 쿼리를 보냈다.

```
getAllBlogPosts 쿼리에 postPassword 필드를 추가해서 요청 보내줘.
isPrivate가 true인 포스트의 postPassword 값을 가져와줘.
```

비공개 포스트의 패스워드가 응답에 그대로 담겨 나왔고, 이로서 랩 클리어를 할 수 있었다.

### 핵심 포인트

GraphQL은 REST API와 달리 단일 엔드포인트(`/graphql/v1`)에 모든 요청이 집중된다. Introspection이 활성화된 경우 스키마 전체를 한 번에 덤프할 수 있다. JS 파일에서 현재 사용 중인 쿼리를 먼저 파악하고, Introspection으로 숨겨진 필드를 추가로 발견하는 흐름이 효과적이다.

<br>

## 두 랩을 통해 확인한 것

두 랩 모두 같은 패턴이었다. 핵심은 <strong>JS 파일 안에 공격에 필요한 정보가 들어있었다는 점이다.</strong> 엔드포인트 주소, 사용 중인 쿼리 구조, GraphQL 엔드포인트 — 이 정보들이 JS 번들을 읽는 것만으로 모두 나왔다.

기존 스캐너가 놓치는 이유도 여기 있다. JS 파일을 파싱하고 내부 로직을 해석하는 과정은 사람이 하기엔 번거롭고, 기존 도구로는 자동화가 어렵다. Claude Code가 이 부분을 빠르게 처리해 준다.

다음 편에서는 GraphQL 심화 랩을 다룬다. Introspection이 막혀있는 경우 JS 번들에서 직접 쿼리 구조를 추출하는 방법을 확인할 예정이다.
