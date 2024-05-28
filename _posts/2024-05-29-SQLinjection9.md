---
layout: single
title:  "5주차 SQL injection 인증우회 문제풀이(5)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false

---

<br>

# <span style="background:#000000; color:#ffffff">1. 5주차 SQL injection 인증우회 문제풀이(5)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1  5번 문제</span>

<br>

<img src="/images/2024-05-29-SQLinjection9/1.PNG" alt="1" style="zoom:80%;" />

<br>

<span style='font-weight:bold; font-size:25px'>▶ 목표 : normaltic1으로 로그인하기!!! </span>

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.1 주어진 정보 확인하기</span>

***

<br>

<img src="/images/2024-05-29-SQLinjection9/2.PNG" alt="2" style="zoom:67%;" />

doldol로 로그인 했을 때 데이터를 POST방식으로 보내네요.

<img src="/images/2024-05-29-SQLinjection9/3.PNG" alt="3" style="zoom:60%;" />

살펴본 결과, 요청보내는 페이로드를의 sql injection을 시도해 봐야겠습니다.   
doldol' and '1'='1 시도 해본 결과, 302 Found로 리다이렉션이 되는 것 보니까 로그인에 성공합니다.  
따라서 sql injection로 로그인이 가능합니다.

<img src="/images/2024-05-29-SQLinjection9/4.PNG" alt="4" style="zoom:60%;" />

만약 식별/인증이 분리라면 doldol' or '1'='1를 넣었을 시 참이 되는 아이디가 여러 개가 되므로 로그인이 되어서는 안됩니다.  
하지만 여기서는 302 Found로 로그인이 되었습니다. 따라서 식별/인증이 동시에 진행된 구조로 되어 있다고 할 수 있겠습니다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.2  로그인하기</span>

***

<br>

<img src="/images/2024-05-29-SQLinjection9/5.PNG" alt="5" style="zoom:60%;" />

그렇다면 식별/인증 동시이므로 예를 들어) where id='아이디' and pass='비밀번호 ' 일 확률이 있으므로  
로그인이 되는지 확인하기 위해서 뒤의 pass를 날려야 합니다. 그 방법이 doldol' # 로 #가 뒤에 pass를 주석처리 해줍니다.  
따라서 해본 결과 로그인이 되네요. 

<br>

![6](/images/2024-05-29-SQLinjection9/6.PNG)

직접 normaltic1' # 를 로그인 화면에 적은 결과 / 다음과 같이 flag가 출력됩니다.
