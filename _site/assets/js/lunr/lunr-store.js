var store = [{
        "title": "웹 서버 이해하기",
        "excerpt":"1. 웹 서버(Web server) 1.1 클라이언트 와 서버 (Client and server) 먼저 웹 서버를 이해하기 전에 클라이언트와 서버가 무엇인지 알아야할 필요성이 있습니다. 클라이언트는 파일을 서버에 요청해서 사용하는 장치, 프로그램을 의미하고, 서버는 요청받은 파일을 전달하는 프로그램을 의미합니다. 이해되기 쉽게 예를 들어보면, 클라이언트(장치: 사용자의 컴퓨터, 프로그램: 웹브라우저), 서버(프로그램: 웹서버)로 볼 수 있는데...","categories": ["WEB"],
        "tags": [],
        "url": "/web/WEB1/",
        "teaser": null
      },{
        "title": "1주차 로그인페이지 만들기(1)",
        "excerpt":"1. 로그인 페이지 다음 조건으로 로그인 페이지를 만들어보도록 하겠습니다. html, css, php 만으로 작성하기 아이디: admin, 비밀번호 : admin1234 로 로그인 할수 있게 하기 잘못된 정보로 로그인 했을 시, 경고문 띄우기 로그인 된 화면에서 로그아웃하면 본래 로그인화면으로 돌아가기 밑에 동영상과 같은 시나리오입니다. 1.1 html 문구 작성(파일이름: index.php) 1.1.1 head &lt;!DOCTYPE...","categories": ["project"],
        "tags": [],
        "url": "/project/Project1/",
        "teaser": null
      },{
        "title": "데이터 베이스(DB)",
        "excerpt":"1. 데이터 베이스란? 정렬된 데이터 모음이라고 표현할 수 있습니다. 프로그램을 통해 데이터를 저장, 편집(수정), 불러오기, 삭제를 할 수 있는 것이 특징입니다. 그렇다면 우리가 알고 있는 엑셀과 데이터 베이스는 무엇이 다를까요? ▶공통점 : 표의 형태로 데이터를 저장. ▶차이점 : 엑셀은 직관적으로 데이터 이용, 접근성 쉬움, 느려서 적은양의 데이터만 가능. 데이터베이스는 프로그램...","categories": ["DB"],
        "tags": [],
        "url": "/db/DB1/",
        "teaser": null
      },{
        "title": "2주차 sql과 mysql사용방법",
        "excerpt":"1. SQL 이란? Structured Query Language의 약자입니다. Structured : 관계형 데이터(table형태의 데이터) Query : 질의, 요청(ex. 프로그램 언어를 통해 web에서 클라이언트가 요청 ) Language : 프로그램 언어 정리해보면 관계형 데이터를 목적에 맞게 요청할 수 있는 프로그램 언어라고 볼 수 있습니다. 2. mysql 사용방법 mysql은 sql언어를 사용하는 데이터베이스 관리 서비스입니다. 연결된...","categories": ["sql"],
        "tags": [],
        "url": "/sql/Sql1/",
        "teaser": null
      },{
        "title": "2주차 DB연결해서 웹으로 데이터보기",
        "excerpt":"1. 코딩 작성 및 결과 &lt;?php #DB연결 $db_conn = mysqli_connect('localhost','admin','student1234','test'); #url에 적은 name값 변수에 지정 $name=$_GET['name']; #변수 name에 해당하는 score값 웹 화면에 띄우기 $sql=\"select SCORE from test_table WHERE NAME='$name'\"; $result=mysqli_query($db_conn,$sql); $row=mysqli_fetch_array($result); echo $name.\"학생의 점수는\".$row['SCORE'].\"입니다.\"; ?&gt; URL파라미터는 URL에서 ? 다음부터 나오는 값인데, 저는 DB에 name: LEE 가 저장되어 있으므로 name=LEE값을 지정해줬습니다....","categories": ["project"],
        "tags": [],
        "url": "/project/Project2/",
        "teaser": null
      },{
        "title": "1주차 로그인페이지 만들기(2)",
        "excerpt":"1. 로그인 페이지 다음 조건으로 로그인 페이지를 만들어보도록 하겠습니다. html, css, php 만으로 작성하기 아이디: admin, 비밀번호 : admin1234 로 로그인 할수 있게 하기 잘못된 정보로 로그인 했을 시, 경고문 띄우기 로그인 된 화면에서 로그아웃하면 본래 로그인화면으로 돌아가기 밑에 동영상과 같은 시나리오입니다. 1.1 php 문구작성 1.초기화면(index.php) 2.로그인성공시화면(login_success.php) 3.로그인성공유무로 url이동(login.php) 4.로그아웃...","categories": ["project"],
        "tags": [],
        "url": "/project/Project3/",
        "teaser": null
      },{
        "title": "로그인의 식별과 인증 및 유지",
        "excerpt":"1. 로그인의 식별과 인증 로그인이란? 조건에 맞는 사람을 확인하는 작업입니다. 그러면 조건에 맞는 사람을 어떻게 확인할까요? 바로 식별과 인증의 과정을 거칩니다. 식별 : 수많은 데이터 속에서 특정 데이터를 찾아내는 것. ▶ 식별 정보를 찾아냄. (예 ID : primary key) 식별 정보 특징 &gt; 오로지 하나의 id만 존재한다 , 노출되어도 위험이...","categories": ["WEB"],
        "tags": [],
        "url": "/web/WEB2/",
        "teaser": null
      },{
        "title": "Burp suite 설치 및 사용법, 간단한 ctf 풀기",
        "excerpt":"1. Burp suite 설치 및 기본 세팅 burp suite 홈페이지 들어가서 ▶ Products ▶ community Edition 들어가서 다운로드 받으시면 됩니다. 실행 이후에도 next를 계속 눌러 들어갑니다. 1.1 web proxy tool 개념 burp suite 은 대표적인 web proxy tool 입니다. web proxy tool의 역할은 다음 그림과 같습니다. 서버와 브라우저의 서로 오고...","categories": ["WEB"],
        "tags": [],
        "url": "/web/WEB3/",
        "teaser": null
      },{
        "title": "3주차 로그인의 식별과 인증, 해싱처리하기",
        "excerpt":"1.로그인의 식별과 인증 4가지 만들기 로그인을 하기 위해서 식별과 인증을 해야 한다는 것을 배웠습니다. 이론적인 것은 간단한 로직으로 작성할 수 있고, 쉽게 찾아 볼 수 있기 때문에 제가 만든 로그인 폼의 식별과 인증을 살펴보도록 하겠습니다. 1.1 식별과 인증 동시에 진행 ▶1번 방식 &lt;?php session_start(); # 세션 파트에서 보았듯 로그인을 유지하기...","categories": ["project"],
        "tags": [],
        "url": "/project/Project4/",
        "teaser": null
      },{
        "title": "4주차 키로거 만들기",
        "excerpt":"1.키로거 만들기 키로거란? 사용자가 작성하는 글을 기록하고 전송하는 것을 말합니다. 즉 사용자의 입력의 데이터를 가져오는 것입니다. 키로거를 만든 것을 보여드리면서 코드를 설명하겠습니다. ▶ 글을 작성하니, 작성한 글이 txt파일에 저장되는 모습! 1.1 keylog.html 저는 기본적으로 작성할 텍스트 박스를 만들었고, 텍스트의 내용을 밑에 표시하고 싶었기 때문에 pre를 작성해두었습니다. 필요에 따라 밑에 표시하는...","categories": ["project"],
        "tags": [],
        "url": "/project/Project5/",
        "teaser": null
      },{
        "title": "4주차 쿠키 탈취 만들기",
        "excerpt":"1.쿠키 탈취 만들기 http상태 200 으로 양호하고, user = normaltic 이라는 쿠키를 담고 있습니다. 이 쿠키를 탈취해봅시다. 1.1 Cookie Hijacking.html &lt;!DOCTYPE html&gt; &lt;html lang=\"en\"&gt; &lt;head&gt; &lt;meta charset=\"UTF-8\"&gt; &lt;title&gt;Security Test Page&lt;/title&gt; &lt;/head&gt; &lt;body&gt; &lt;h1&gt;Cookie Hijacking 테스트 하기&lt;/h1&gt; &lt;script src=\"Cookie Hijacking.js\"&gt;&lt;/script&gt; &lt;/body&gt; &lt;/html&gt; 1.2 Cookie Hijacking.js window.onload = function() { # http요청이...","categories": ["project"],
        "tags": [],
        "url": "/project/Project6/",
        "teaser": null
      },{
        "title": "SQL injection이란?",
        "excerpt":"1.SQL injection ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 개념 먼저 용어에 대해서 살펴봅시다. sql은 db에 요청하는 언어 이고, injection은 영어 뜻으로 주입하다,...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection1/",
        "teaser": null
      },{
        "title": "SQL injection 데이터 추출(1)",
        "excerpt":"1.SQL injection 데이터 추출(1) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 개요 ① 인증 우회 - 로그인 하기 ② 데이터 추출 간단하게 두...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection2/",
        "teaser": null
      },{
        "title": "SQL injection 데이터 추출(2)",
        "excerpt":"1.SQL injection 데이터 추출(2) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 문제풀이 ▶ 목표 : 아이디가 doldol인 데이터만 출력하기!!! 1.1.1 sql injection 포인트...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection3/",
        "teaser": null
      },{
        "title": "6주차 SQL injection 데이터 추출(문제풀이)",
        "excerpt":"1. 6주차 SQL injection 데이터 추출(문제풀이) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1  1번 문제 본 글은 문제풀이 과정만 나타냈기에, 과정에서 이해가 안되면...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection4/",
        "teaser": null
      },{
        "title": "5주차 SQL injection 인증우회 문제풀이(6)",
        "excerpt":"1. 5주차 SQL injection 인증우회 문제풀이(6) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1  6번 문제 ▶ 목표 : normaltic2으로 로그인하기!!! 1.1.1 주어진 정보...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection10/",
        "teaser": null
      },{
        "title": "5주차 SQL injection 인증우회 문제풀이(7)",
        "excerpt":"    1. 5주차 SQL injection 인증우회 문제풀이(7)     ※ 주의 사항 :   1. 교육 목적으로만 이용 해주세요.  2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.  3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다.        1.1  7번 문제                        ","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection11/",
        "teaser": null
      },{
        "title": "5주차 SQL injection 인증우회 문제풀이(8)",
        "excerpt":"    1. 5주차 SQL injection 인증우회 문제풀이(8)     ※ 주의 사항 :   1. 교육 목적으로만 이용 해주세요.  2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.  3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다.        1.1  8번 문제                     ","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection12/",
        "teaser": null
      },{
        "title": "5주차 SQL injection 인증우회 문제풀이(9)",
        "excerpt":"    1. 5주차 SQL injection 인증우회 문제풀이(9)     ※ 주의 사항 :   1. 교육 목적으로만 이용 해주세요.  2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.  3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다.        1.1  9번 문제               ","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection13/",
        "teaser": null
      },{
        "title": "5주차 SQL injection 인증우회 문제풀이(10)",
        "excerpt":"    1. 5주차 SQL injection 인증우회 문제풀이(10)     ※ 주의 사항 :   1. 교육 목적으로만 이용 해주세요.  2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.  3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다.        1.1  10번 문제                                             ","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection14/",
        "teaser": null
      },{
        "title": "5주차 SQL injection 인증우회 문제풀이(1)",
        "excerpt":"1. 5주차 SQL injection 인증우회 문제풀이(1) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1  1번 문제 ▶ 목표 : doldol 계정이 아닌 admin 계정으로...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection5/",
        "teaser": null
      },{
        "title": "5주차 SQL injection 인증우회 문제풀이(2)",
        "excerpt":"1. 5주차 SQL injection 인증우회 문제풀이(2) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1  2번 문제 ▶ 목표 : 관리자 인증 우회하기!!! 1.1.1 주어진...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection6/",
        "teaser": null
      },{
        "title": "5주차 SQL injection 인증우회 문제풀이(3)",
        "excerpt":"1. 5주차 SQL injection 인증우회 문제풀이(3) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1  3번 문제 ▶ 목표 : admin계정으로 로그인하기!!! 1.1.1 주어진 정보...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection7/",
        "teaser": null
      },{
        "title": "5주차 SQL injection 인증우회 문제풀이(4)",
        "excerpt":"1. 5주차 SQL injection 인증우회 문제풀이(4) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1  4번 문제 ▶ 목표 : PIN Code 알아내기!!! 1.1.1 주어진...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection8/",
        "teaser": null
      },{
        "title": "5주차 SQL injection 인증우회 문제풀이(5)",
        "excerpt":"1. 5주차 SQL injection 인증우회 문제풀이(5) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1  5번 문제 ▶ 목표 : normaltic1으로 로그인하기!!! 1.1.1 주어진 정보...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection9/",
        "teaser": null
      },{
        "title": "SQL injection 데이터 추출(3)",
        "excerpt":"1. SQL injection 데이터 추출(3) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 개요  저번 SQL injection 데이터 추출(2) 포스팅에서 DB데이터가 화면에 출력 될...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection15/",
        "teaser": null
      },{
        "title": "SQL injection 데이터 추출(4)",
        "excerpt":"1. SQL injection 데이터 추출(4) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 개요  SQL injection 데이터 추출 방식에는 3 가지 방식이 있습니다. 1....","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection16/",
        "teaser": null
      },{
        "title": "SQL injection 데이터 추출 총 정리",
        "excerpt":"1. SQL injection 데이터 추출 총 정리 ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 개요  SQL injection 데이터 추출 방식에는 3 가지 방식이...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection17/",
        "teaser": null
      },{
        "title": "7 주차 SQL injection 데이터 추출 문제 풀이(1)",
        "excerpt":"1. 7 주차 SQL injection 데이터 추출 문제 풀이(1) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 개요  SQL injection 데이터 추출 방식에는 3...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection18/",
        "teaser": null
      },{
        "title": "7 주차 SQL injection 데이터 추출 문제 풀이(2)",
        "excerpt":"1. 7 주차 SQL injection 데이터 추출 문제 풀이(2) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 개요  SQL injection 데이터 추출 방식에는 3...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection19/",
        "teaser": null
      },{
        "title": "7 주차 SQL injection 데이터 추출 문제 풀이(3)",
        "excerpt":"1. 7 주차 SQL injection 데이터 추출 문제 풀이(3) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1   SQL injection normatitc 아이디로 로그인이 되는 지...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection20/",
        "teaser": null
      },{
        "title": "7 주차 SQL injection 데이터 추출 문제 풀이(4)",
        "excerpt":"1. 7 주차 SQL injection 데이터 추출 문제 풀이(4) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1   SQL injection 3번 풀이와 같다 normatitc 아이디로...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection21/",
        "teaser": null
      },{
        "title": "7 주차 SQL injection 데이터 추출 문제 풀이(5)",
        "excerpt":"1. 7 주차 SQL injection 데이터 추출 문제 풀이(5) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1   SQL injection 3번 풀이와 같다 normatitc 아이디로...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection22/",
        "teaser": null
      },{
        "title": "7 주차 SQL injection 데이터 추출 문제 풀이(6)",
        "excerpt":"1. 7 주차 SQL injection 데이터 추출 문제 풀이(6) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1   SQL injection 3번 풀이와 같다 normatitc 아이디로...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection23/",
        "teaser": null
      },{
        "title": "SQL injection 데이터 추출(실전편)",
        "excerpt":"1. SQL injection 데이터 추출 (실전편) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 개요  그동안 주어진 페이지에서 데이터를 추출하는 연습을 하다 보니, 실제...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection24/",
        "teaser": null
      },{
        "title": "8 주차 SQL injection 데이터 추출 문제 풀이(1)",
        "excerpt":"1. 8 주차 SQL injection 데이터 추출 문제 풀이(1) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1  SQLi Point 1 문제  1.1.1 sql injection...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection25/",
        "teaser": null
      },{
        "title": "8 주차 SQL injection 데이터 추출 문제 풀이(2)",
        "excerpt":"1. 8 주차 SQL injection 데이터 추출 문제 풀이(2) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1  SQLi Point 2 문제  1.1.1 sql injection...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection26/",
        "teaser": null
      },{
        "title": "8 주차 SQL injection 데이터 추출 문제 풀이(3)",
        "excerpt":"1. 8 주차 SQL injection 데이터 추출 문제 풀이(3) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1  SQLi Point 3 문제  1.1.1 sql injection...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection27/",
        "teaser": null
      },{
        "title": "8 주차 SQL injection 데이터 추출 문제 풀이(4)",
        "excerpt":"1. 8 주차 SQL injection 데이터 추출 문제 풀이(4) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1  SQLi Point 4 문제  1.1.1 sql injection...","categories": ["SQL-injection"],
        "tags": [],
        "url": "/sql-injection/SQLinjection28/",
        "teaser": null
      },{
        "title": "XSS 이란(1)?",
        "excerpt":"1. XSS(1) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 개념  XSS (Cross-Site scripting)은 공격자가 악성 스크립트를 삽입해서 이용자의 브라우저에서 실행되도록 조작하는 기술입니다. 이번...","categories": ["XSS"],
        "tags": [],
        "url": "/xss/XSS1/",
        "teaser": null
      },{
        "title": "XSS 취약점 찾기(1)",
        "excerpt":"1. XSS 취약점 찾기(1) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 XSS 1 문제 게시판에 먼저 들어가서 글을 작성하여 어떻게 나타나는지 확인 하였다....","categories": ["XSS"],
        "tags": [],
        "url": "/xss/XSS2/",
        "teaser": null
      },{
        "title": "XSS 취약점 찾기(2)",
        "excerpt":"    1. XSS 취약점 찾기(2)     ※ 주의 사항 :   1. 교육 목적으로만 이용 해주세요.  2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.  3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다.        1.1 XSS 2 문제       ","categories": ["XSS"],
        "tags": [],
        "url": "/xss/XSS3/",
        "teaser": null
      },{
        "title": "XSS 취약점 찾기(3)",
        "excerpt":"1. XSS 취약점 찾기(3) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 XSS 3 문제 이번에는 마이페이지에서 확인하려고 한다. GET 메서드로 파라미터가 1234 인데,...","categories": ["XSS"],
        "tags": [],
        "url": "/xss/XSS4/",
        "teaser": null
      },{
        "title": "XSS 취약점 찾기(4)",
        "excerpt":"    1. XSS 취약점 찾기(4)     ※ 주의 사항 :   1. 교육 목적으로만 이용 해주세요.  2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.  3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다.        1.1 XSS 4 문제                             ![(/images/2024-06-18-XSS5/image-20240618022256780.png)               ","categories": ["XSS"],
        "tags": [],
        "url": "/xss/XSS5/",
        "teaser": null
      },{
        "title": "XSS 취약점 찾기(5)",
        "excerpt":"    1. XSS 취약점 찾기(5)     ※ 주의 사항 :   1. 교육 목적으로만 이용 해주세요.  2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.  3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다.        1.1 XSS 5 문제                                              [그림 1-1]                                                 [그림 1-2]                                  ","categories": ["XSS"],
        "tags": [],
        "url": "/xss/XSS6/",
        "teaser": null
      },{
        "title": "XSS 취약점 찾기(6)",
        "excerpt":"    1. XSS 취약점 찾기(6)     ※ 주의 사항 :   1. 교육 목적으로만 이용 해주세요.  2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.  3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다.        1.1 XSS 6 문제          ","categories": ["XSS"],
        "tags": [],
        "url": "/xss/XSS7/",
        "teaser": null
      },{
        "title": "XSS 이란(2)?",
        "excerpt":"1. XSS(2) ※ 주의 사항 : 1. 교육 목적으로만 이용 해주세요. 2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다. 3. 개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. 1.1 개요  ✔XSS 간단 요약 xss : 클라이언트 측 브라우저에 발생하는 코드를 조작 및 변경하여,...","categories": ["XSS"],
        "tags": [],
        "url": "/xss/XSS8/",
        "teaser": null
      },{
        "title": "모의해킹 보고서 작성법",
        "excerpt":"1. 모의 해킹 보고서 작성법 1.1 개요  Microsoft word를 사용하는 이유 보고서는 한글 프로그램 보다 Microsoft word를 이용하는 게 좋다. 한글 프로그램은 한글만 이용, 정부와 같이 문서 보안이 중요할 때는 사용하겠지만, Microsoft word가 파일 간 호환성이 더 뛰어나고, 다양한 기능과 언어를 지원하기 때문에 업무상 더 적합하다. 보고서를 이쁘게 작성해야 하는...","categories": ["Report"],
        "tags": [],
        "url": "/report/report/",
        "teaser": null
      }]
