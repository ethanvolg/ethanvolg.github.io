---
layout: single
title:  "5주차 SQL injection 인증우회 문제풀이(3)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false

---

<br>

# <span style="background:#000000; color:#ffffff">1. 5주차 SQL injection 인증우회 문제풀이(3)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1  3번 문제</span>

<br>



<img src="/images/2024-05-29-SQLinjection7/1.PNG" alt="1" style="zoom: 80%;" />

<br>

<span style='font-weight:bold; font-size:25px'>▶ 목표 : admin계정으로 로그인하기!!! </span>

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.1 주어진 정보 확인하기</span>

***

<br>

<img src="/images/2024-05-29-SQLinjection7/2.PNG" alt="2" style="zoom:80%;" />

doldol로 로그인이 되는지 확인하였다.

<img src="/images/2024-05-29-SQLinjection7/3.PNG" alt="3" style="zoom:60%;" />



### <br><span style="background:#A9A9A9; color:#ffffff">1.1.2  서버로 보내는 데이터 확인하기</span>

***

<br>

<img src="/images/2024-05-29-SQLinjection7/5-1716921469490-37.PNG" alt="5" style="zoom:60%;" />

<img src="/images/2024-05-29-SQLinjection7/6-1716921473008-39.PNG" alt="6" style="zoom:60%;" />

userid가 doldol 일 때는 result가 ok 이고, userid가 admin일 때는 result 가 fail 이 나왔습니다.

<br>

<img src="/images/2024-05-29-SQLinjection7/7-1716921475786-41.PNG" alt="7" style="zoom:60%;" />

그러나 Userpw를 지운 결과 flag가 나왔지만 이거 거의 운빨로 때려 맞춘 거나 다름없었습니다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.3  JSON 파일의 response 조작하기</span>

***

<br>

<img src="/images/2024-05-29-SQLinjection7/image-20240529034556725.png" alt="image-20240529034556725" style="zoom:80%;" />

자세히 보니 파일이 json입니다. json(JavaScript Object Notation)은 간단한 텍스트 기반 데이터 포맷입니다.

<br>

아까와 같은 방식이 아닌 json 파일의 response  result값의 텍스트를 조작해서 푸는 것이 의도가 맞습니다.

<img src="/images/2024-05-29-SQLinjection7/image-20240529034624922.png" alt="image-20240529034624922" style="zoom:60%;" />

그렇기 때문에 설정에서 response interception rules를 다음과 같이 설정해야 합니다.

<img src="/images/2024-05-29-SQLinjection7/image-20240529034733527.png" alt="image-20240529034733527" style="zoom:60%;" />

<br>



<img src="/images/2024-05-29-SQLinjection7/image-20240529034751178.png" alt="image-20240529034751178" style="zoom:67%;" />

<img src="/images/2024-05-29-SQLinjection7/image-20240529034808943.png" alt="image-20240529034808943" style="zoom: 67%;" />

fail 값을 ok값으로 바꿉니다. 왜냐하면 로그인이 정상적으로 되었을 때가 ok라는 결과를 출력했기 때문입니다.  
그리고 foward 누르고 보냅니다.

<br>

<img src="/images/2024-05-29-SQLinjection7/image-20240529034836762.png" alt="image-20240529034836762" style="zoom:60%;" />

그러면 이어서 index.php를 서버로 요청하면,

<img src="/images/2024-05-29-SQLinjection7/image-20240529034905159.png" alt="image-20240529034905159" style="zoom:67%;" />

바로 flag가 출력 되는 것을 볼 수 있습니다.
