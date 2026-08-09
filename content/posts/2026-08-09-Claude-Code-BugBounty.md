---
title: "Claude Code로 5,000만 원을 번 해커의 방법"
date: 2026-08-09T00:30:00+09:00
categories: ["web"]
url: /categories/web/claude-code-bugbounty/
---

<br>

# Claude Code로 5,000만 원을 번 해커의 방법

보안 연구원 Archangel은 {{< term label="Claude Code" title="Claude Code란?" >}}Anthropic이 만든 AI인 Claude를 터미널(명령줄 화면)에서 쓸 수 있게 만든 도구입니다. 코드를 읽고, 분석하고, 직접 작업을 이어가는 것까지 할 수 있습니다.{{< /term >}}<!-- --> 하나로 {{< term label="버그바운티" title="버그바운티(Bug Bounty)란?" >}}기업이 "우리 서비스에서 보안 취약점을 찾아주면 돈을 드립니다"라고 공개 모집하는 제도입니다. 취약점을 찾아 신고하면 심각도에 따라 수십만 원에서 수억 원까지 포상금을 받을 수 있습니다.{{< /term >}}<!-- --> 대회에서 약 5,000만 원의 포상금을 받았습니다. 거창한 자동화 인프라 없이, 터미널에서 AI와 함께 작업한 결과입니다. 이 글은 그 방법을 순서대로 정리해봤습니다.

> 💡 NahamSec의 영상 「My Friend Made $40,000 Using Claude Code (Here's How)」를 바탕으로 작성했습니다.

<br>

## 1. AI에게 "버그 찾아줘"라고 하면 안 되는 이유

<strong>AI는 스캐너가 아니라 반복 작업을 대신해 주는 도구다.</strong>

많은 사람들이 AI에게 "버그 찾아줘"라고 말합니다. 그러면 AI는 이것저것 뱉어내지만, 실제로 쓸 수 있는 결과는 거의 없습니다. AI의 진짜 쓸모는 사람이 하기엔 너무 반복적이고 시간이 오래 걸리는 작업을 빠르게 처리해 주는 것입니다.

### 기존 도구가 못 하는 것

Amass, Subfinder, ffuf 같은 기존 해킹 도구들은 {{< term label="서버 주소나 경로" title="도메인과 경로란?" >}}웹 주소를 보면 `https://app.target.com/admin/users` 이런 식으로 생겼습니다. 여기서 `app.target.com`이 도메인이고, `/admin/users`가 경로입니다.{{< /term >}}를 자동으로 찾아주는 데 강하지만 요즘 웹 서비스들은 다릅니다. React, Vue, Next.js 같은 기술로 만들어진 서비스는 경로를 서버가 직접 알려주지 않습니다. 대신 자바스크립트(JS) 파일 안에 경로를 넣어서 브라우저가 알아서 처리하게 합니다.

기존 도구로는 이 경로들을 찾을 수 없습니다. 정보가 JS 파일 안에 숨어 있기 때문에 서버에 물어봐도 알 수 없는게 당연합니다.

Claude Code는 이 JS 파일을 직접 읽고 분석할 수 있습니다. 숨겨진 경로, 사용하지 않는 API 주소, 관리자 기능처럼 보이는 코드 등을 찾아냅니다. 이러한 작업들이 기존 도구가 놓치는 부분입니다.

이게 왜 돈이 되는지는 간단합니다. JS 번들에서 `/api/v2/admin/export_users` 와 같은 경로를 발견했다고 가정해 보겠습니다. 이 경로는 브라우저 화면에서 관리자만 볼 수 있는 메뉴지만, API 자체에 권한 검증이 없으면 일반 사용자 계정으로도 직접 호출할 수 있습니다. 서버 입장에서는 "이 경로는 UI에 안 보이니까 괜찮겠지"라고 생각하지만, JS 파일을 읽으면 누구나 찾을 수 있습니다. 이 간극이 실제 포상금으로 이어지는 구조입니다.

<br>

## 2. AI가 내 방향으로 움직이게 만드는 준비

<strong>AI는 컨텍스트를 줄수록 정확해진다. 그 컨텍스트를 파일로 만들어 두는 것이 첫 번째 작업이다.</strong>

### 리포트 모아서 패턴 추려내기

HackerOne에는 과거에 신고된 취약점 리포트들이 공개되어 있습니다. "이런 상황에서 이런 취약점이 자주 나오더라"는 식으로 모아서 읽다 보면 패턴이 보이게 됩니다.

이때 중요한 건 걸러내기입니다. Low 리포트를 그대로 넣으면 AI가 잘못된 방향으로 학습합니다. "CORS 헤더가 없다", "Rate Limit이 없다" 같은 패턴을 계속 보여주면, AI는 그것을 찾는 데 집중하게 되겠죠. 버그바운티 플랫폼은 실제 피해가 증명되지 않는 취약점에는 포상금을 주지 않습니다. AI에게 주는 데이터가 AI가 바라보는 방향을 결정한다고 생각하시면 됩니다.

그래서 개인정보 유출, 원격 코드 실행, {{< term label="SSRF" title="SSRF란?" >}}서버가 내 대신 다른 곳에 요청을 보내도록 만드는 공격입니다. 서버 내부 시스템에 접근할 수 있게 됩니다.{{< /term >}}, {{< term label="IDOR" title="IDOR란?" >}}다른 사람의 데이터에 내 계정으로 접근할 수 있는 취약점입니다. 예를 들어 URL에서 숫자 하나만 바꿔도 다른 사람 정보가 보이는 경우입니다.{{< /term >}}, {{< term label="GraphQL 권한 우회" title="GraphQL 권한 우회란?" >}}GraphQL은 데이터를 요청하는 방식 중 하나인데, 권한 확인이 제대로 안 되어 있으면 본인을 제외하고 접근하면 안 되는 데이터를 가져올 수 있습니다.{{< /term >}}처럼 위험도가 높은 것만 추립니다.

### 스킬 파일 만들기

추려낸 패턴을 마크다운 파일로 저장합니다. AI가 분석을 시작하기 전에 이 파일을 먼저 읽도록 지시하면, 원하는 방향으로 분석해줍니다.

`~/skills/js-mining.md` 예시:

```markdown
# Skill: JavaScript Bundle Mining
When analyzing JS bundles, look for:
- Hidden routing patterns: /admin, /internal, /debug, /v2/private
- Unused or commented-out fetch() / axios() calls
- Feature flag conditions (e.g., if (user.role === 'admin'))
- Hardcoded API tokens or internal staging URLs (e.g., dev.api.target.com)
```

### 프로젝트 폴더와 `.claude.md` 만들기

타깃 사이트마다 폴더를 따로 만들고, 그 안에 {{< term label=".claude.md" title=".claude.md란?" >}}Claude Code는 프로젝트 폴더에 `.claude.md` 파일이 있으면 그것을 자동으로 읽습니다. 마치 새 직원한테 "우리 회사 규칙입니다"라고 문서를 주는 것과 같습니다. AI가 어떤 역할을 해야 하는지, 무엇을 찾아야 하는지 미리 알 수 있습니다.{{< /term >}}<!-- --> 파일을 씁니다. Claude Code는 폴더에 진입할 때 이 파일을 자동으로 읽습니다. 이러면 AI가 어떤 역할을 해야 하는지, 무엇을 찾아야 하는지 매번 말하지 않아도 됩니다.

폴더 구조:

```text
~/targets/target-app/
├── .claude.md
└── js_files/
```

`.claude.md` 예시:

```markdown
# Authorized Scope
This is an authorized bug bounty program for TargetApp.
Target URL: https://app.target.com/
Testing is strictly limited to authorized scope.

# Role & Goal
You are an expert Bug Bounty Hunter. Your primary goal is to find
HIGH-IMPACT security vulnerabilities (PII Leakage, RCE, SSRF, Critical IDOR, GraphQL Bypass).

# Behavioral Rules
1. DO NOT focus on theoretical misconfigurations, missing security headers, or low-impact CORS issues.
2. Focus heavily on mining JavaScript bundles for hidden API endpoints and undocumented routing paths.
3. Always demonstrate real data-flow and security impact.
```

> 💰 <strong>비용 참고:</strong> Claude Pro 플랜(월 20달러)은 JS 파일을 많이 분석하다 보면 금방 한도에 걸립니다. Archangel은 Claude Max 플랜(월 100달러)을 썼습니다. 포상금 한 건이면 구독료를 충분히 뽑을 수 있는 구조입니다.

<br>

## 3. 실제 작업 흐름: 3단계로 취약점 찾기

<strong>준비가 끝났으면 타깃을 정하고 순서대로 진행한다.</strong>

### Step 1. JS 파일 모으기

타깃 사이트의 JS 파일을 먼저 내려받습니다. 실제 서비스의 JS 파일 이름에는 `main.a3f92bc.js` 같이 무작위 문자열이 붙어 있어서 URL을 직접 추측하기 어렵습니다. 그래서 직접 사이트에 접속해서 로드되는 파일을 확인해야 합니다.

파일을 확인하는 두 가지 방법이 있습니다.

- <strong>브라우저로 직접 확인하기 (도구 설치 불필요):</strong> 타깃 사이트에서 F12를 눌러 개발자 도구를 열고, Network 탭에서 JS 파일만 필터링합니다. 로드된 파일 목록이 보이면 URL을 복사해서 다운로드하면 됩니다.
- <strong>자동 수집 도구 쓰기:</strong> `katana`, `gau`, `hakrawler` 같은 도구를 쓰면 사이트를 돌아다니면서 JS 파일 주소를 자동으로 긁어옵니다.

### Step 2. Claude Code로 분석하기

JS 파일을 `./js_files/` 폴더에 넣은 다음, Claude Code에게 분석을 시킵니다. 스킬 파일을 먼저 읽으라고 지시하는 것이 핵심입니다.

```
"~/skills/js-mining.md 스킬 지침을 먼저 읽고,
./js_files/ 안의 모든 JS 파일을 분석해줘.
숨겨진 API 주소, 파라미터, 비공개 경로를 추출하고
React, Lodash 같은 외부 라이브러리는 무시해."
```

분석이 오래 걸릴 것 같으면 끝낼 조건을 명확하게 줍니다. 그러면 Claude Code가 중간에 멈추지 않고 끝까지 작업합니다.

```
"./js_files/ 안의 모든 JS 파일 분석이 끝날 때까지 멈추지 마.
발견된 경로마다 파라미터 구조와 권한 우회 가능성을
final_results.md 파일에 기록해."
```

### Step 3. GraphQL 분석하기

{{< term label="GraphQL" title="GraphQL이란?" >}}데이터를 주고받는 방식 중 하나입니다. REST API와 달리, 클라이언트가 원하는 데이터를 직접 골라서 요청할 수 있습니다. 설정이 잘못되면 접근하면 안 되는 데이터까지 가져올 수 있게 됩니다.{{< /term >}}을 쓰는 서비스라면 Claude Code에게 스키마를 파악하게 합니다.

REST API는 엔드포인트가 수백 개로 나뉘어 있어서 하나씩 확인해야 합니다. GraphQL은 다릅니다. 모든 요청이 `/graphql` 하나로 집중됩니다. Introspection이 활성화된 경우 스키마 전체를 한 번에 덤프할 수 있고, 비활성화된 경우에도 JS 번들 안에 쿼리와 뮤테이션 정의가 남아있는 경우가 많습니다. 공격 표면 전체를 한 번에 파악할 수 있다는 게 GraphQL이 버그바운티에서 특히 효과적인 이유입니다.

```
"JS 파일 안의 GraphQL 스키마, 뮤테이션, Node ID 구조를 파악하고
사용자 데이터를 조회하거나 수정할 수 있는 쿼리 목록을 정리해줘."
```

Claude Code가 세션 정보를 찾지 못할 때는, {{< term label="Burp Suite나 Caido" title="Burp Suite / Caido란?" >}}내 브라우저와 서버 사이에서 오가는 요청을 중간에 가로채서 볼 수 있는 도구입니다. 어떤 데이터가 어떻게 오가는지 확인하고, 값을 바꿔서 다시 보낼 수 있습니다.{{< /term >}}에서 캡처한 실제 HTTP 요청을 직접 붙여넣습니다.

```
"여기 Caido에서 캡처한 실제 GraphQL 요청이야. [패킷 붙여넣기]
이 세션으로 JS에서 발견한 뮤테이션에 다른 사용자 ID를 주입해서
권한 우회가 되는지 테스트해줘."
```

<br>

## 4. AI가 "찾았다"고 해도 직접 확인해야 하는 것들

<strong>AI는 에러 응답을 취약점으로 잘못 판단할 때가 있다. 직접 검증하지 않으면 시간을 낭비한다.</strong>

AI는 서버가 403을 돌려줄 때와 500을 돌려줄 때의 차이를 "뭔가 다르다 = 취약점"으로 해석하는 경향이 있습니다. 실제로는 잘못된 파라미터를 넣었을 때 나오는 일반적인 에러일 수 있습니다. 자동화 결과의 상당 부분은 사람이 직접 걸러야 합니다. AI가 "크리티컬 취약점 발견!"을 외칠 때 아래 세 가지를 직접 확인해야 합니다.

- <strong>권한 재확인:</strong> 다른 테스트 계정의 쿠키를 직접 넣어보고, 실제로 다른 사람 데이터가 보이는지 확인해야 합니다.
- <strong>데이터 보호:</strong> DELETE나 UPDATE 요청을 테스트할 때는, 실제 데이터가 지워지거나 바뀌지 않도록 범위를 먼저 확인해야합니다.
- <strong>실제 피해 증명:</strong> 단순히 에러 메시지가 다르게 나오는 게 아니라, 이름·이메일·전화번호 같은 실제 개인정보가 응답 데이터에 담겨서 오는지 확인해야 진짜 취약점입니다.

<br>

## 5. 지금 당장 시작하는 3단계

<strong>복잡한 자동화 시스템이 필요 없다. 터미널 하나로 시작할 수 있다.</strong>

1. `~/targets/my-first-target/` 폴더를 만든다
2. 위 템플릿을 참고해서 `.claude.md`를 쓴다 (허가된 범위를 반드시 명시한다)
3. 타깃 사이트 개발자 도구에서 JS 파일 하나를 내려받고, Claude Code에게 엔드포인트를 추출하게 한다

AI는 해커를 대신하는 도구가 아닙니다. 분석 속도를 빠르게 높여주는 파트너입니다. 나 스스로 방향을 잡고, AI는 반복 작업을 처리하도록 해야합니다. 이 역할 분담이 맞아야 "AI를 제대로 쓴다" 라고 할수 있습니다.
