---
layout: single
title:  "SQL injection 데이터 추출 총 정리"
categories: SQL-injection
typora-root-url: ..\
author_profile: false
---

<br>

# <span style="background:#000000; color:#ffffff">1. SQL injection 데이터 추출 총 정리</span>

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

## <span style="background:#696969; color:#ffffff">1.2  SQli데이터 추출 총 정리 </span>

<br>

<img src="/images/2024-06-01-SQLinjection17/image-20240602030914167.png" alt="image-20240602030914167" style="zoom: 80%;" />
