---
layout: single
title:  "SQL injection 데이터 추출(실전편)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1. SQL injection 데이터 추출 (실전편)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1 개요 </span>

<br>

그동안 주어진 페이지에서 데이터를 추출하는 연습을 하다 보니, 실제 환경에서는 어떤 식으로 대응하고 적용해야 하는 지  
막막할 수 있습니다.

실전에서 어떤 식의 양상으로 나타나는 지 알아보도록 하겠습니다.

<br>

## <span style="background:#696969; color:#ffffff">1.2  SQLi 데이터 추출 (실전) </span>

<br>

먼저 SQLi 데이터 추출을 하기 위해서   
sql구문이 사용될 거라 생각 되는 페이지를 찾고,  해당 페이지에서 burp suite 을 통해 다음과 같은 부분을 살펴보아야 합니다.

1. <span style="font-size:70%">(http 요청헤더에서) </span>cookie 등

2. 파라미터<span style="font-size:70%">(매개변수)</span>

   <br>

   sql구문이 사용되었다고 생각되는 곳에서 어떤 데이터 구조로 이루어져 있을 지  생각해 보고,   
   그에 따라 sql문을 집어넣어서 SQLi를 시도 할 수 있는 지 없는 판단하는 과정을 거쳐야 합니다.

<br>

### <span style="background:#909090; color:#ffffff">1.2.1 <span style="font-size:70%">(http 요청헤더에서) </span>cookie 등</span>

***

<br>

예시를 통해 알아보겠습니다.

해당 자료는 normatlic님 자료입니다.  
qwer라는 아이디로 로그인하여, 마이페이지를 들어갔습니다.  
로그인 정보가 나온 것으로 보아 sql구문을 사용할 것이라는 판단을 했습니다.

<img src="/images/2024-06-09-SQLinjection24/image-20240611235454618.png" alt="image-20240611235454618" style="zoom:67%;" />

burp suite을 보면

<img src="/images/2024-06-09-SQLinjection24/image-20240612001708895.png" alt="image-20240612001708895" style="zoom:67%;" />

GET방식이어서 밑에 파라미터는 존재하지 않고, 쿠키로 데이터를 전송하고 있습니다.  
sql 구문은 select ~~ where user='__' 와 같은 방식으로 했을 거라 생각이 듭니다.  

<img src="/images/2024-06-09-SQLinjection24/image-20240612002331193.png" alt="image-20240612002331193" style="zoom:60%;" />

1차적으로 cookie 에  qwer' and '1'='1 를 넣어 확인해보면 그냥 qwer만 입력했을 때와 같은 응답을 보내므로,  
sql injection 가능하다 라고 생각해볼 수 있습니다.   
하지만 이것 만으로 확신하기 어렵습니다. 왜냐하면 아무 값을 넣더라도 같은 응답으로 보낼 수 도 있기 때문입니다.

<img src="/images/2024-06-09-SQLinjection24/image-20240612002418509.png" alt="image-20240612002418509" style="zoom:60%;" />

2차적으로 확인해보면 이와 같이 qwer' and '1'='2 를 넣으면 sql 구문으로는 아무런 데이터가 출력이 될 수 없습니다.   
1=2는 될 수 없기 때문이죠.   
따라서 sql 구문이라면 1차 와 달리 변화가 생길 것입니다.  그래서 마이페이지에 2번 째 부분이 다르게 나오네요. 

만약 다르지 않다면, 데이터 추출하기에는 적절한 곳이 아니라고 판단하면 되겠습니다.

<br>

### <span style="background:#909090; color:#ffffff">1.2.2 파라미터<span style="font-size:70%">(매개변수)</span></span>

***

<br>

이 방식은 앞선 자료에서 수차례 했지만, 이번에는 기존 방법과 다른 상황에서 어떻게 접근할 지에 대해  
서술하였습니다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.1 column 이름에 SQLi </span> 

***

<br>

이번에는 마이페이지가 아닌 게시판입니다.

<img src="/images/2024-06-09-SQLinjection24/image-20240612005032344.png" alt="image-20240612005032344" style="zoom:67%;" />

<img src="/images/2024-06-09-SQLinjection24/image-20240612010846870.png" alt="image-20240612010846870" style="zoom:60%;" />

post 방식으로 밑에 파라미터가 있습니다. 파라미터로 데이터를 전송하고 있네요.  
사용자가 값의 변화를 줄 수 있는 건, option_val 와 board_result 값 입니다.

먼저 접근하기 쉬운 board_result의 구조는 q만 입력했는데 qwer의 자료가 모두 나온 것으로 보아.   
select ~~ where username like '%__%'    
와 같은 방식으로 될 수 있습니다. 

<img src="/images/2024-06-09-SQLinjection24/image-20240612012115671.png" alt="image-20240612012115671" style="zoom:60%;"/>

1.2.1과 마찬가지로 q%' and '1%'='1 와 q만 입력했을 때 같은 응답을 보내야 sql injection이 가능합니다.  
하지만 여기는 같지 않습니다. 이유는 제가 생각한 sql문이 틀렸거나 sql구문을 사용하지 않는 곳이겠네요. 

그렇다면  board_result는 지금 상황에선 할 수 없다는 것을 알았고, option_val도 체크해봐야겠네요.   
select ~~ where username like '%__%'  가능한 것은 column 앞에 '1'='1' 를 넣어 확인해보는 방법입니다.

<img src="/images/2024-06-09-SQLinjection24/image-20240612013948457.png" alt="image-20240612013948457" style="zoom:60%;" />

<img src="/images/2024-06-09-SQLinjection24/image-20240612014202947.png" alt="image-20240612014202947" style="zoom:60%;" />

마찬가지로 '1'='1' , '1'='2' 를 확인해본 결과, SQLi를 할 수 있습니다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.2.2.2 order by 절에 SQLi </span>

***

<br>

이번에는 order by 가 있는 형태의 파라미터입니다. 

<img src="/images/2024-06-09-SQLinjection24/image-20240612015658428.png" alt="image-20240612015658428" style="zoom:60%;" />

select ~~ where username like '%q%' order by title 의 방식이겠네요.  
그렇다면 title 위치에 1이나 2가 위치해도 정렬이 가능하겠네요. 그리고 99999999를 넣으면, 컬럼 개수를 초과해서 아무것도 안 뜨겠죠.

<img src="/images/2024-06-09-SQLinjection24/image-20240612020308951.png" alt="image-20240612020308951" style="zoom:60%;" />

<img src="/images/2024-06-09-SQLinjection24/image-20240612020330969.png" alt="image-20240612020330969" style="zoom:60%;" />

<img src="/images/2024-06-09-SQLinjection24/image-20240612020358990.png" alt="image-20240612020358990" style="zoom:60%;" />

order by 의 특성을 모두 사용할 수 있으므로, 저 위치는 order by 라는 것을 확신할 수 있습니다! 

<br>

<span style='font-weight:bold; font-size:20px'>😊order by 참 / 거짓 <span style='text-decoration: red wavy underline'>확인하는 방법</span>😊</span>

<sql문에서 if>

​	`case when (조건) then (참일 때) else (거짓일 때) end`

<span style='font-weight:bold; font-size:15px'>1. 칼럼 이름 알 때</span>

​	`case when (1=1) then username else title end`

​	`case when (1=2) then username else title end`

<span style='font-weight:bold; font-size:15px'>2. 칼럼 이름 모를 때</span>

​	■ 

​	`case when (1=1) then 1 else (select 1 union select 2) end`

​	`case when (1=2) then 1 else (select 1 union select 2) end`

​	👉(select 1 union select 2) 는 특정 값이 아닌 행렬이라서 정렬이 되지 않고 오류가 발생한다.

​	👉오류 발생을 위해 (999999999)를 하지 않는 이유는 case when ~~ 에 넣으면 문자열로 나타날 수 있기 때문이다.

​	<br>

​	■

​	`(select 1 union select 2 where (1=1))`

​	`(select 1 union select 2 where (1=2))`

​	<img src="/images/2024-06-09-SQLinjection24/image-20240612023630721.png" alt="image-20240612023630721" style="zoom:60%;" />

<img src="/images/2024-06-09-SQLinjection24/image-20240612023704445.png" alt="image-20240612023704445" style="zoom:60%;" />

<img src="/images/2024-06-09-SQLinjection24/image-20240612023808159.png" alt="image-20240612023808159" style="zoom:60%;" />

<img src="/images/2024-06-09-SQLinjection24/image-20240612023848692.png" alt="image-20240612023848692" style="zoom:60%;" />

<br>

### <span style="background:#909090; color:#ffffff">(+) Error 유발해서 SQLi</span>

<br>

<img src="/images/2024-06-09-SQLinjection24/image-20240612024623821.png" alt="image-20240612024623821" style="zoom:67%;" />

<img src="/images/2024-06-09-SQLinjection24/image-20240612024550344.png" alt="image-20240612024550344" style="zoom:60%;" />

<img src="/images/2024-06-09-SQLinjection24/image-20240612024658306.png" alt="image-20240612024658306" style="zoom:60%;" />

1.2.1 와 똑같이 접근했지만, 화면에 보이는 변화는 전혀 없었습니다. 

<br>

<img src="/images/2024-06-09-SQLinjection24/image-20240612024902041.png" alt="image-20240612024902041" style="zoom:67%;" />

하지만 sql 문법을 틀리게 입력하자 DB Error가 뜨는 것을 볼 수 있습니다.

그렇다면 참/ 거짓을 어떻게 표현할까요? 다음과 같이 쓰면 됩니다.

<img src="/images/2024-06-09-SQLinjection24/image-20240612025723164.png" alt="image-20240612025723164" style="zoom:60%;" />

<img src="/images/2024-06-09-SQLinjection24/image-20240612025746454.png" alt="image-20240612025746454" style="zoom:67%;" />
