---
layout: single
title:  "5주차 SQL injection 인증우회 문제풀이(1)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1. 5주차 SQL injection 인증우회 문제풀이(1)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1  1번 문제</span>

<br>

<img src="/images/2024-05-29-SQLinjection5/1.PNG" alt="1" style="zoom:80%;" />

<br>

<span style='font-weight:bold; font-size:25px'>▶ 목표 : doldol 계정이 아닌 admin 계정으로 접속하기!!! </span>

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.1 주어진 정보 dodol 로 로그인 직접 해보기</span>

***

<br>

![2](/images/2024-05-29-SQLinjection5/2.PNG)

<img src="/images/2024-05-29-SQLinjection5/3.PNG" alt="3" style="zoom:67%;" />

직접 해보니 doldol로 로그인이 가능하다는 사실을 알 수 있었고, burp suite 으로 확인한 결과 로그인 할 때 POST 방식으로 데이터를   
서버로 전송하고 있네요.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.2  서버로 보내는 데이터 확인하기</span>

***

<br>

<span style='font-weight:bold; font-size:20px'><login.php></span>

<img src="/images/2024-05-29-SQLinjection5/4-1716914699805-15.PNG" alt="4" style="zoom: 60%;" />

doldol로 로그인 할 때 쿠키 형식으로 보내서 set-cookie 가 나타났습니다.

<br>

<span style='font-weight:bold; font-size:20px'><index.php></span>

<img src="/images/2024-05-29-SQLinjection5/5-1716914786884-17.PNG" alt="5" style="zoom: 60%;" />

그래서 로그인 된 화면은 쿠키가 있는 것으로 확인 되네요. 쿠키는 로그인이 될 수 있게 도움을 줍니다  
하지만 클라이언트 측에서 정보를 조작할 수 있다는 치명적인 단점이 있습니다.   
이것을 이용해서 저희가 접속해야 할 admin 계정으로 조작해봅시다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.3  Cookie 정보 조작하기</span>

***

<br>



<img src="/images/2024-05-29-SQLinjection5/6-1716914942595-19.PNG" alt="6" style="zoom:60%;" />

cookie의 doldol를 admin으로 조작하고, 서버의 반응 값을 보니 flag가 나타나네요.