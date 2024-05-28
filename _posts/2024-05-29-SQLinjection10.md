---
layout: single
title:  "5주차 SQL injection 인증우회 문제풀이(6)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false

---

<br>

# <span style="background:#000000; color:#ffffff">1. 5주차 SQL injection 인증우회 문제풀이(6)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1  6번 문제</span>

<br>

<img src="/images/2024-05-29-SQLinjection10/1.PNG" alt="1" style="zoom:80%;" />

<br>

<span style='font-weight:bold; font-size:25px'>▶ 목표 : normaltic2으로 로그인하기!!! </span>

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.1 주어진 정보 확인하기</span>

***

<br>

<img src="/images/2024-05-29-SQLinjection10/2.PNG" alt="2" style="zoom:67%;" />

<img src="/images/2024-05-29-SQLinjection10/3.PNG" alt="3" style="zoom:60%;" />

5번 문제와 마찬가지로 sql injection이 가능합니다.

<img src="/images/2024-05-29-SQLinjection10/5.PNG" alt="5" style="zoom:60%;" />

or 했을 때, 만약 로그인이 되었다면 식별/인증이 분리겠지만 여기서는 로그인 실패했으므로   
식별/인증이 동시일 수도 있고, 분리일 가능성이 있습니다.  

<img src="/images/2024-05-29-SQLinjection10/4.PNG" alt="4" style="zoom:60%;" /> 

#주석을 처리한 결과는 또한 로그인이 되네요. 이걸로 아직 알기엔 정보가 부족합니다.

<br>

<img src="/images/2024-05-29-SQLinjection10/6.PNG" alt="6" style="zoom:60%;" />

만약 비밀번호에 and 구문을 넣어서 로그인이 된다면, 그건 식별/ 인증 이 동시입니다.  
왜냐하면 만약 분리라고 한다면 아이디 나 비밀번호 둘 중 하나는 sql구문이 아니라 그 문자가 맞는지 확인하는   
인증 절차만 거치기 때문에 sql injection을 사용할 수 없기 때문입니다.   
그렇기에 여기서 둘 다 가능하므로 동시입니다.

<img src="/images/2024-05-29-SQLinjection10/7.PNG" alt="7" style="zoom:60%;" />

하지만  비밀 번호에 or문을 넣으니 로그인이 안되는 걸로 보아 비밀번호가 오직 한 개만 가능한 식별/인증 동시 인 것 같습니다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.2  로그인하기</span>

***

<br>

<img src="/images/2024-05-29-SQLinjection10/8.PNG" alt="8" style="zoom:60%;" />

그래서 뒤의 비밀번호를 무력화 시키는 주석을 달아서 로그인을 하면 됩니다!!!

<img src="/images/2024-05-29-SQLinjection10/9.PNG" alt="9" style="zoom: 67%;" />

