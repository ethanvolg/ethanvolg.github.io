---
layout: single
title:  "5주차 SQL injection 인증우회 문제풀이(2)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false

---

<br>

# <span style="background:#000000; color:#ffffff">1. 5주차 SQL injection 인증우회 문제풀이(2)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1  2번 문제</span>

<br>

<img src="/images/2024-05-29-SQLinjection6/1.PNG" alt="1" style="zoom:80%;" />

<br>

<span style='font-weight:bold; font-size:25px'>▶ 목표 : 관리자 인증 우회하기!!! </span>

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.1 주어진 정보 확인하기</span>

***

<br>



<img src="/images/2024-05-29-SQLinjection6/2.PNG" alt="2" style="zoom:67%;" />

<img src="/images/2024-05-29-SQLinjection6/3.PNG" alt="3" style="zoom: 80%;" />

burp suite에서 확인한 결과 처음 화면에서 확인을 누르고 들어가다 보면 이렇게 진행됩니다.

/3/ ▶ /3/step1.php ▶ /3/step2.php ▶ /3/step2.php?admin_pass=[비밀번호 자리]

전부 GET 방식으로 서버에 보내는 형식이네요.

별다른 단서는 없는 것 같습니다.  

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.2  서버로 보내는 데이터 확인하기</span>

***

<br>

<img src="/images/2024-05-29-SQLinjection6/4-1716918068510-26.PNG" alt="4" style="zoom:60%;" />

정보가 제한적 이므로 비밀번호를 직접 알지 못하는 이상 우회하기는 힘들 것 같습니다.   
하지만 파일이름이  step1 ▶ step2 이런 식으로 진입하는 것을 보니  step3도 확인해보는 것이 좋을 것 같습니다.  
그래서 GET방식이라서 /3/step3.php로 파일을 요청했습니다. 그랬더니 gogoHack.php로 리다이렉트되는 것이 확인됩니다.

<br>

<img src="/images/2024-05-29-SQLinjection6/5-1716918144412-28.PNG" alt="5" style="zoom:60%;" />

따라서 /3/gogoHack.php로 파일을 요청했습니다. 반응 값으로 경고문에 flag가 담겨서 있는 것을 확인할 수 있었습니다.
