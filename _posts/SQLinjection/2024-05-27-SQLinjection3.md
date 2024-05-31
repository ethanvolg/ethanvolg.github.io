---
layout: single
title:  "SQL injection 데이터 추출(2)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1.SQL injection 데이터 추출(2)</span>

<br>

<span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1 문제풀이</span>

<br>

<span style='font-weight:bold; font-size:25px'>▶ 목표 : 아이디가 doldol인 데이터만 출력하기!!! </span>

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.1 sql injection 포인트 찾기</span>

***

<br>

<img src="/images/2024-05-27-SQLinjection3/image-20240528002406036.png" alt="image-20240528002406036" style="zoom:50%;" />

패스워드가 1234 인 데이터를 검색하면 normaltic에 대한 데이터가 나오네요.

<img src="/images/2024-05-27-SQLinjection3/image-20240528002507967.png" alt="image-20240528002507967" style="zoom:50%;" />

이 검색 값이 sql injection이 가능한지 확인합니다. pass 의 값 만으로 다른 컬럼도 출력되는 것으로 보아 어떤 구조인지 예측이 갑니다.   

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.2 column 개수 찾기</span>

***

<br>

<img src="/images/2024-05-27-SQLinjection3/image-20240528002608611.png" alt="image-20240528002608611" style="zoom:50%;" />

order by 값을 1씩 증가하여 칼럼의 개수가 몇 개인지 셀 수 있습니다.  
5에서 에러가 나는 것으로 보아 4개의 컬럼이 존재하는 것을 확인했습니다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.3 출력되는 column 위치 찾기</span>

***

<br>

<img src="/images/2024-05-27-SQLinjection3/image-20240528003718074.png" alt="image-20240528003718074" style="zoom:50%;" />

union select 를 이용하여 출력되는 자리에 어떤 값이 나오는 가를 확인한 결과,    
1,2,3,4 차례대로 나오네요.

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.4 DB이름 확인하기</span>

***

<br>



<img src="/images/2024-05-27-SQLinjection3/image-20240528003751388.png" alt="image-20240528003751388" style="zoom:50%;" />

1,2,3,4 위치에도 데이터가 출력되어 나오기 때문에 그 중 하나에 database()를 넣어 데이터베이스 이름을 확인했습니다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.5 table이름 확인하기</span>

***

<br>

<img src="/images/2024-05-27-SQLinjection3/image-20240528003852958.png" alt="image-20240528003852958" style="zoom:50%;" />

<img src="/images/2024-05-27-SQLinjection3/image-20240528003922888.png" alt="image-20240528003922888" style="zoom: 67%;" />

table 이름 중 memeber 에 doldol의 데이터가 있기 때문에 member를 사용합니다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.6 column 이름 확인하기</span>

***

<br>

<img src="/images/2024-05-27-SQLinjection3/image-20240528005434953.png" alt="image-20240528005434953" style="zoom:50%;" />

![image-20240528005457625](/images/2024-05-27-SQLinjection3/image-20240528005457625.png)

맨 위의 데이터를 보아 필요한 칼럼은 순서대로 id, pass, email, info 인 것이 확인됩니다.

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.7 data 추출하기</span>

***



<br>

<img src="/images/2024-05-27-SQLinjection3/image-20240528004203347.png" alt="image-20240528004203347" style="zoom:50%;" />

<img src="/images/2024-05-27-SQLinjection3/image-20240528004248335.png" alt="image-20240528004248335" style="zoom: 60%;" />

<img src="/images/2024-05-27-SQLinjection3/image-20240528004328568.png" alt="image-20240528004328568" style="zoom:50%;" />

<img src="/images/2024-05-27-SQLinjection3/image-20240528004350815.png" alt="image-20240528004350815" style="zoom: 60%;" />

doldol의 데이터 하나만 나오도록 출력했습니다.
