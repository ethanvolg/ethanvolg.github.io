---
layout: single
title:  "SQL injection 데이터 추출(1)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1.SQL injection 데이터 추출(1)</span>

<br>

<span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

## <span style="background:#696969; color:#ffffff">1.1 개요</span>

<br>

① 인증 우회 - 로그인 하기  
② 데이터 추출 

간단하게 두 가지로 나눠 볼 수 있습니다. 

저번에 인증 우회에 대해 다뤘다면   
이번에는 데이터 추출을 어떻게 하는지에 대해 알아보겠습니다.

데이터 추출은 어떤 게 있을까요?  일단 DB를 통해 데이터를 불러오는 쿼리 문을 쓰는 곳에서 사용할 수 있습니다.  
예를 들면 로그인 폼이나 게시판 등이 있겠네요. 

로그인 폼 같은 경우는 작성하면 어떤 데이터가 불러오는 것인지 눈으로 확인할 수 없고,  맞고 틀렸는지만 확인이 가능합니다.  
<span style='font-weight:bold; font-size:15px'>그러나 게시판의 검색 기능 같은 경우를 생각해보면 작성을 할 시에 어떤 데이터를 불러오는 지 눈으로 확인이 가능합니다.   </span>

이번에는 비교적 난이도가 쉬운,  후자에 대해서 살펴보도록 하겠습니다. 

<br>

## <span style="background:#696969; color:#ffffff">1.2 데이터 추출에 필요한 개념 알아보기</span>

<br>

일단 게시판에 관한 db의 sql 쿼리는 게시판의 관한 내용만 포함되어 있기 때문에,   
개인정보를 빼내려는 목적에 부합하지 않습니다. 

따라서 sql문을 조작하여 개인정보를 추출해야 한다는 것인데,  
db의 이름, table의 이름, column의 이름을 알지 않는 한 불가능합니다.

그래서 알아야 할 두 가지의  sql 쿼리 문이 있습니다. ① union 과 ②order by 입니다.



<span style='font-weight:bold; font-size:25px'>①UNION</span>

<span style='font-size:20px'>1) 일반적인 select</span>

보통 데이터를 불러올 때 select를 사용하죠.   
로그인이라고 한다면 ,예) select username, password from table;   table에 모든 username, password를 불러옵니다.

예) ![image-20240524064155575](/images/2024-05-24-SQLinjection2/image-20240524064155575.png)

<br>



<span style='font-size:20px'>2) union을 사용한 select</span>

union은 select 문을 2 개 이상 결합시켜서 나타낼 때 사용합니다.   
예) <span style='font-weight:bold; font-size:15px'>select</span> username, password from table union<span style='font-weight:bold; font-size:15px'> select</span> 1, 2 union <span style='font-weight:bold; font-size:15px'>select</span> 3,4; (테이블 없이 작성하면, 칼럼 위치에 값을 배치합니다.)

예)![image-20240524070844964](/images/2024-05-24-SQLinjection2/image-20240524070844964.png)

여기서 select로 1,2 와 3,4를 나타낸 것은 테이블의 데이터를 불러온 것이 아니라 값만 출력한 것임을  
유념해야 합니다.



▶ union all  vs  union  

union all : 겹치는 값이 존재 하더라도 전부 출력합니다.

union : 겹치는 값이 존재하면 그 중 하나만 출력합니다.

예)  위의 마지막 데이터 값을  3,4가 아닌 1,2를 작성하여 같은 값으로 표현해보겠습니다.

(union all)![image-20240525001254806](/images/2024-05-24-SQLinjection2/image-20240525001254806.png)(union)![image-20240525001138029](/images/2024-05-24-SQLinjection2/image-20240525001138029.png)



<span style='font-weight:bold; font-size:25px'>②OREDER BY</span>

order by : 데이터를 정렬하는 역할을 합니다.

SELECT * FROM Products ORDER BY Price(정리할 컬럼명)  ASC(오름차순)/DESC(내림차순);

이렇게 원래는 정리할 컬럼명에 컬럼명을 작성해야합니다.  
다만 컬럼 index 번호(위치)에 따라 숫자를 대신해서 작성하여도, 같은 역할을 수행합니다.

SELECT username, password FROM users ORDER BY 1; ▶ 1이므로 username으로 정렬합니다. (defalt로 오름차순)

SELECT username, password FROM users ORDER BY 2; ▶ 2 이므로 password으로 정렬합니다.



## <span style="background:#696969; color:#ffffff">1.3 데이터 추출의 필수 과정<span style="font-size:50%">(DB데이터를 화면에서 볼 수 있을때)</span></span>



<span style='font-weight:bold; font-size:20px'><*union 과 order by를 이용한 sql injection pocess></span>



<span style='font-weight:bold; font-size:15px'>1. sql injection 포인트 찾기 (sql injection이 가능한지 확인하고, 어떤 로직으로 구성했을까? 예측하기)</span>

<span style='font-weight:bold; font-size:15px'>2. column 개수 찾기</span>

<span style='font-weight:bold; font-size:15px'>3.  출력되는 column 위치 찾기</span>

<span style='font-weight:bold; font-size:15px'>4. DB이름 확인하기</span>

<span style='font-weight:bold; font-size:15px'>5. table이름 확인하기</span>

<span style='font-weight:bold; font-size:15px'>6. column 이름 확인하기</span>

<span style='font-weight:bold; font-size:15px'>7. data 추출하기</span>

   예제에 따라 해당 절차를 시행해보면서 설명해보겠습니다.



### <span style="background:#A9A9A9; color:#ffffff">1.3.1 sql injection 포인트 찾기</span>

<img src="/images/2024-05-24-SQLinjection2/image-20240525013022486.png" alt="1" style="zoom:50%;" />

게임 이름을 검색하면 그 이름과 스코어 제작사 이름이 나오는 구조인 것 같습니다.

<img src="/images/2024-05-24-SQLinjection2/image-20240525013104123.png" alt="image-20240525013104123" style="zoom: 50%;" />

하지만 over만 쳐도 나오는 것으로 보아 like '%글자%' 구문으로 한 글자만 일치하더라도 출력하는 구조 입니다.

<img src="/images/2024-05-24-SQLinjection2/image-20240525013221239.png" alt="image-20240525013221239" style="zoom:50%;" />

<img src="/images/2024-05-24-SQLinjection2/image-20240525020302308.png" alt="image-20240525020302308" style="zoom:50%;" />

over%' and '1%'='1는 sql 인젝션이 가능한가를 살펴보기 위해서 사용했습니다.  
sql 문을 사용했다면, and 에 양변이 같은 형식을 취한 구조는 항상 같은 결과가 나오기 때문에   
sql 인젝션이 가능하다는 것을 확인할 수 있죠.

밑에 구문은 실제 구문인데, 왜 over%' and '1%'='1 를 썼는가에 대해 이해가 가지 않으시면 보시기 바랍니다.



### <br><span style="background:#A9A9A9; color:#ffffff">1.3.2 column 개수 찾기</span>

<img src="/images/2024-05-24-SQLinjection2/image-20240525013448020.png" style="zoom:50%;" />

위에서 살펴본 order by 특성에 따라 order by 1은 첫 번째 칼럼으로 정렬한 것입니다.

order by 1/ order by 2 / order by 3 ..... 순차적으로 늘려가면 에러가 발생합니다.

<img src="/images/2024-05-24-SQLinjection2/image-20240525013407465.png" alt="image-20240525013407465" style="zoom: 33%;" />

여기에서는 order by 5에서 에러가 발생했습니다. 왜냐하면 불러온 데이터의 칼럼의 수가 5 개 이상은 없기 때문입니다.

그래서 칼럼의 개수는 4 개라는 사실을 알 수 있습니다.



### <br><span style="background:#A9A9A9; color:#ffffff">1.3.3 출력되는 column 위치 찾기</span>

<img src="/images/2024-05-24-SQLinjection2/image-20240525014303487.png" alt="image-20240525014303487" style="zoom:50%;" />

union select를 이용해서 표현하면, db에서 불러온 데이터와 1,2,3,4의 값이 같이 보여지게 됩니다.

그런데 보시는 바와 같이 2,3,4만 나왔습니다. 불러온 데이터는 4 개의 칼럼이지만 3 개의 칼럼만 보이는 형태이네요.

따라서 1에는 데이터 값을 작성해도 보이지 않으니 2,3,4 위치에 값을 작성하여 활용하는 것이 좋겠습니다.

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.3.4 DB이름 확인하기</span>

<img src="/images/2024-05-24-SQLinjection2/image-20240525014348702.png" alt="image-20240525014348702" style="zoom:50%;" />

DB이름 ▶ database()로 확인할 수 있습니다. 그래서 출력이 가능한 2,3,4 위치에 값을 넣어 확인해 볼 수 있겠습니다.



### <br><span style="background:#A9A9A9; color:#ffffff">1.3.5 table이름 확인하기</span>

<img src="/images/2024-05-24-SQLinjection2/image-20240525015343016.png" alt="image-20240525015343016" style="zoom:50%;" />

![image-20240525022345330](/images/2024-05-24-SQLinjection2/image-20240525022345330.png)

table 이름 ▶ select table_name from information_schema.tables where table_schema='DB이름' 로 확인 가능합니다.

table_shema 로 DB이름을 지정하지 않으면 모든 table이름이 나와서 불필요한 것 까지 확인하시게 됩니다.



### <br><span style="background:#A9A9A9; color:#ffffff">1.3.6 column 이름 확인하기</span>

<img src="/images/2024-05-24-SQLinjection2/image-20240525015555601.png" alt="image-20240525015555601" style="zoom:50%;" />

![image-20240525022920840](/images/2024-05-24-SQLinjection2/image-20240525022920840.png)

column 이름 ▶  select column_name from information_schema.columns where table_name='table이름'

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.3.7 data 추출하기</span>

<img src="/images/2024-05-24-SQLinjection2/image-20240525015730186.png" alt="image-20240525015730186" style="zoom:50%;" />

<img src="/images/2024-05-24-SQLinjection2/image-20240525023059257.png" alt="image-20240525023059257" style="zoom:67%;" />

결국 개인정보 데이터 추출에 성공했네요. ~~~