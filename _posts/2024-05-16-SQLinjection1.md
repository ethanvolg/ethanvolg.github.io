---
layout: single
title:  "SQL injection이란?"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1.SQL injection</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1 개념</span>

<br>

먼저 용어에 대해서 살펴봅시다. sql은 db에 요청하는 언어 이고, injection은 영어 뜻으로   
주입하다, 투입하다 라는 뜻이 있습니다. 그러면 SQL injection의 말은 "sql이라는 db언어로 투입하다" 가 되겠네요.

즉, 사용자가 db와 관련된 프로그램의 허점을 이용하는 것으로 특정 sql 쿼리를 작성하여, 데이터 베이스를 공격하는 것이라고  
보면 됩니다.

<br>

예를 들어, 로그인 페이지가 있다고 가정해봅시다. 그러면 회원 가입을 한 이용자의 데이터를 불러와서 이용자의 id, password가  
맞는지 대조해보는 작업을 하는데 이때 데이터를 불러오는 과정에서 sql쿼리를 사용하게 됩니다.

사용자가 id, password 입력  
▶ post 방식으로 서버로 데이터 전송   
▶ 준비된 select * from table where id = '________'  와 같은 sql문에 빈칸에 id 나 password를 넣어 찾게 되는 과정

sql injection은 빈칸에 적게 되는 id 나 password에 sql문의 취약한 부분을 공략해서 로그인이 가능하기도 합니다.  
다음은 방법을 통해 더 이해해 보도록 합시다.

<br>

<br>

## <span style="background:#696969; color:#ffffff">1.2 인증 우회 방법</span>

<br>

 select * from login where id = '________'   빈칸에 '를 넣어본다고 하면, 어떻게 될까요? 오류가 날 것입니다.   
문법이 틀렸기 때문이죠. 

그렇습니다. 안에 알맞은 문법과 값을 넣는다면 아무 문제없이 작동될 것이고, 비틀어서 원하는 정보를 얻기도 합니다.

<br>

<img src="/images/2024-05-16-SQLinjection1/image-20240516032610710.png" alt="image-20240516032610710"  />

실제 제 로그인 페이지와 연결한 db입니다. 2개의 행 데이터가 존재합니다.   
문제를 통해 방법을 알아봅시다.

<br>

<span style='font-weight:bold; font-size:20px'>1. select * from table where id = '________' </span>  
<span style='font-weight:bold; font-size:20px'>빈칸에 kim' and '1'='1 을 넣으면 어떻게 될까요?</span>

<span style='font-weight:bold; font-size:20px'>답은</span>

![image-20240516033046974](/images/2024-05-16-SQLinjection1/image-20240516033046974.png)

and 는 왼쪽 구문과 오른쪽 구문이 서로 존재해야 나타납니다. 그런데 '1'='1' 은 참이면서 kim인 데이터가 존재하므로  
이와 같은 데이터가 나오게 됩니다. 

<br>

<span style='font-weight:bold; font-size:20px'>2. select * from table where id = '________' </span>  
<span style='font-weight:bold; font-size:20px'>빈칸에 kim' or '1'='1 을 넣으면 어떻게 될까요?</span>

<span style='font-weight:bold; font-size:20px'>답은</span>

![image-20240516033718568](/images/2024-05-16-SQLinjection1/image-20240516033718568.png)

or 은 왼쪽 구문과 오른쪽 구문이 하나라도 존재하면 나타납니다. 그런데 '1'='1' 이 참이므로 참인 모든 데이터가 나오게  
됩니다.

<br>

<span style='font-weight:bold; font-size:20px'>3. select * from table where id = '________' and passoword = '5678'</span>   
<span style='font-weight:bold; font-size:20px'>빈칸에 kim' # 을 넣으면 어떻게 될까요?</span>

<span style='font-weight:bold; font-size:20px'>답은</span>

![image-20240516034314892](/images/2024-05-16-SQLinjection1/image-20240516034314892.png)

어째서 이런 답이 나왔는지 궁금하실 겁니다.  mysql에서 #은 주석입니다. 그렇기 때문에 # 로 뒤로 오는 구문은  
사실상 의미가 없고, kim만 선택해서 출력하라는 명령만 됩니다.

<br>

<span style='font-weight:bold; font-size:20px'>4. select * from table where id = '________' and passoword = '5678'</span>   
<span style='font-weight:bold; font-size:20px'>빈칸에 kim' or '1' ='1 을 넣으면 어떻게 될까요?</span>

<span style='font-weight:bold; font-size:20px'>답은</span>

![image-20240516035152070](/images/2024-05-16-SQLinjection1/image-20240516035152070.png)

1+3*2는 뭐가 답일 까요? 답은 7입니다. 곱하기를 먼저 계산하고, 1을 나중에 더하죠.  
이와 마찬가지로 and를 * 로 생각하고 or 덧셈으로 생각해야 합니다.

select * from table where id = 'kim' or ('1' ='1' and passoword = '5678') 이렇게 보면  
id가 kim이거나 password가 5678인 데이터가 출력하게 됩니다.

다음엔 sql injection에 관련된 문제를 풀어보도록 하겠습니다.

