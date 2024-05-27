---
layout: single
title:  "SQL injection 데이터 추출(문제풀이)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false

---

<br>

# <span style="background:#000000; color:#ffffff">1.SQL injection 데이터 추출<span style="font-size:50%">(문제풀이)</span></span>

<br>

<span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1  1번 문제</span>

<br>

본 글은 문제풀이 과정만 나타냈기에, 과정에서 이해가 안되면 이전 글을 보고 오시면 좋습니다.

### <span style="background:#A9A9A9; color:#ffffff">1.1.1 sql injection 포인트 찾기</span>

***

<br><img src="/images/2024-05-28-SQLinjection4/image-20240528020605181.png" alt="image-20240528020605181" style="zoom:50%;" />

<img src="/images/2024-05-28-SQLinjection4/image-20240528021016000.png" alt="image-20240528021016000" style="zoom:50%;" />

<img src="/images/2024-05-28-SQLinjection4/image-20240528021131341.png" alt="image-20240528021131341" style="zoom:50%;" />

nor 만 검색해도 normaltic이 출력되는 것으로 보아 like id  '%아이디%' 로 구성되어 있다고 유추할 수 있습니다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.2 column 개수 찾기</span>

***

<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528021327522.png" alt="image-20240528021327522" style="zoom:50%;" />

order by 1부터 순차적으로 숫자를 증가해서 넣었을 때 5 이상 부터는 출력되지 않으므로 컬럼 수는 4개입니다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.3 출력되는 column 위치 찾기</span>

***

<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528021423237.png" alt="image-20240528021423237" style="zoom:50%;" />

1,2,3,4 값을 출력했을 때 위치는 순서대로 컬럼이 배치되어 있음을 알 수 있습니다.

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.4 DB이름 확인하기</span>

***

<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528021502384.png" alt="image-20240528021502384" style="zoom:50%;" />

1,2,3,4 모두 출력되므로 그 중 하나에 database()를 넣어주며 이름을 확인한다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.5 table이름 확인하기</span>

***

<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528021648760.png" alt="image-20240528021648760" style="zoom:50%;" />

flag_table 부터 확인합니다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.6 column 이름 확인하기</span>

***

<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528021835356.png" alt="image-20240528021835356" style="zoom:50%;" />

flag_table 의 컬럼은 flag네요.

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.7 data 추출하기</span>

***



<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528022006574.png" alt="image-20240528022006574" style="zoom:50%;" />



<br>

## <span style="background:#696969; color:#ffffff">1.2  2번 문제</span>

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.1 sql injection 포인트 찾기</span>

***

<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528022255869.png" alt="image-20240528022255869" style="zoom:50%;" />

<img src="/images/2024-05-28-SQLinjection4/image-20240528022322458.png" alt="image-20240528022322458" style="zoom:50%;" />

normaltic이라고 검색할 때는 정보가 나오는데, n 만 검색했을 때는 나오지 않고 검색한 단어 전체를 검색해야 정보가 뜹니다.

<img src="/images/2024-05-28-SQLinjection4/image-20240528022358841.png" alt="image-20240528022358841" style="zoom:50%;" />

sql injection이 가능하네요.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.2 column 개수 찾기</span>

***

<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528022454579.png" alt="image-20240528022454579" style="zoom:50%;" />

7 이상부터 정보가 안 나오니 칼럼 수는 6 개 입니다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.3 출력되는 column 위치 찾기</span>

***

<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528022613341.png" alt="image-20240528022613341" style="zoom:50%;" />

6 값 만 정보에 뜨므로 이후에 필요한 정보는 6 위치에 작성하면 됩니다.

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.4 DB이름 확인하기</span>

***

<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528022640388.png" alt="image-20240528022640388" style="zoom:50%;" />



### <br><span style="background:#A9A9A9; color:#ffffff">1.1.5 table이름 확인하기</span>

***

<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528022745304.png" alt="image-20240528022745304" style="zoom:50%;" />

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.6 column 이름 확인하기</span>

***

<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528022855395.png" alt="image-20240528022855395" style="zoom:50%;" />

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.7 data 추출하기</span>

***



<br>

<img src="/images/2024-05-28-SQLinjection4/image-20240528022951224.png" alt="image-20240528022951224" style="zoom:50%;" />

데이터를 출력했는데 'not here' 이라고 뜨네요 ㅠㅠ 다른 곳을 찾아야 할 것 같습니다.

<img src="/images/2024-05-28-SQLinjection4/image-20240528023040440.png" alt="image-20240528023040440" style="zoom:50%;" />

우선 이 데이터에서 여러 개인데 맨 위에 것 만 표시되어 밑에 있는 데이터가 안보일 수 도 있다는 가정 하에 order by 를 봤는데 없네요.

<img src="/images/2024-05-28-SQLinjection4/image-20240528023245129.png" alt="image-20240528023245129" style="zoom:50%;" />

다른 컬럼 이름 도 찾아봤는데 없었습니다.

<img src="/images/2024-05-28-SQLinjection4/image-20240528023431897.png" alt="image-20240528023431897" style="zoom:50%;" />

다른 테이블 이름이 존재했네요. 

<img src="/images/2024-05-28-SQLinjection4/image-20240528023533026.png" alt="image-20240528023533026" style="zoom:50%;" />



<img src="/images/2024-05-28-SQLinjection4/image-20240528023659672.png" alt="image-20240528023659672" style="zoom:50%;" />

다른 테이블로 들어가서 데이터를 보니 플래그 값이 있었습니다!