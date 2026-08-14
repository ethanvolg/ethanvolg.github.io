---
title: "Time-based SQL Injection pcap 분석 — Wireshark와 tshark"
date: 2026-08-15T00:30:00+09:00
categories: ["web"]
url: /categories/web/time-based-sqli-pcap/
---

<br>

# Time-based SQL Injection pcap 분석 — Wireshark와 tshark

<br>

## 1. Time-based SQL Injection이란

SLEEP(3) 같은 함수를 실행해서 서버 응답을 일부러 늦추는 공격 기법이다. 일반적인 SQL Injection은 화면에 데이터가 직접 나오지만, Time-based는 다르다. 화면에 아무것도 뜨지 않아도 된다. 서버가 응답을 보내기까지 걸린 시간 자체가 정보다. 조건이 참이면 3초 뒤에 응답이 오고, 거짓이면 바로 온다. 이 차이로 데이터를 한 글자씩 뽑아낸다.

<br>

## 2. Wireshark에서 지연 시간 확인하기

pcap 파일을 Wireshark로 열면 Time 열에 절대 시각이 나온다. `14:03:22.451` 같은 형태다. 이 상태로는 직전 요청부터 응답까지 몇 초가 걸렸는지 직접 계산해야 한다.

View → Time Display Format → Seconds since previous captured packet으로 바꾸면 Time 열이 직전 패킷과의 시간 간격으로 바뀐다. 정상 응답은 0.00x초, SLEEP(3)이 발동한 응답은 3.00x초로 찍힌다. 이 상태에서 Time 기준으로 정렬하면 3초 이상 튀는 패킷이 바로 위로 올라온다.

3초 이상 걸린 응답 패킷을 찾았으면 우클릭 → Follow → HTTP Stream으로 들어간다. 패킷 하나를 그냥 클릭하면 그 패킷 하나의 raw 데이터만 보인다. HTTP Stream은 다르다. 같은 TCP 연결에 속한 패킷을 전부 모아서 재조립하기 때문에 요청과 응답이 한 화면에 나온다. 어떤 페이로드를 보냈고 서버가 뭘 응답했는지 짝으로 확인할 수 있다.

<br>

## 3. GUI 방식의 한계

여기서 문제가 생긴다. 3초 이상 걸린 패킷이 39개라면 스트림을 39번 따라가야 한다. 한 번에 뽑아내고 싶어서 Export Specified Packets을 시도하면 막힌다.

응답 패킷 기준으로 3초 이상인 것만 골라서 내보내면, 파일 안에는 `HTTP/1.1 200 OK`와 응답 바디만 있다. 어떤 페이로드를 보냈는지는 전혀 나오지 않는다. Time-based SQLi 분석에서 필요한 건 어떤 조건이 참이었는지인데, 그걸 알려주는 건 요청 URI다. 응답만 내보내면 의미가 없다.

그렇다고 필터창에 `http.request`를 입력해서 요청 패킷만 보이게 하면 또 다른 문제가 생긴다. 이 상태에서 Time 열은 직전 응답 패킷이 아니라 직전 요청 패킷과의 간격을 나타낸다. 요청 패킷에는 3초가 찍히지 않는다. 결국 GUI 안에서는 3초 이상 걸린 요청 패킷만 골라서 내보내는 방법이 없다.

여기에 한 가지 더 있다. Seconds since previous captured packet 방식 자체도 완전하지 않다. 요청과 응답 사이에 TCP ACK 같은 패킷이 하나라도 끼면 3초가 응답 패킷이 아니라 ACK 패킷에 찍힌다. 응답 패킷은 0초처럼 보이게 된다. 이 pcap에서 우연히 맞아떨어졌을 수 있어도 원리적으로는 정확한 방법이 아니다.

<br>

## 4. tshark + Python으로 한 번에 해결하기

tshark는 Wireshark의 CLI 버전이다. Wireshark를 설치하면 같이 따라온다.

먼저 tshark로 pcap에서 필요한 필드만 뽑아 CSV로 저장한다.

```bash
tshark -r dump.pcap \
  -T fields \
  -e tcp.stream \
  -e frame.time_epoch \
  -e http.request.uri \
  -e http.response.code \
  -E separator=, \
  -Y "http" > http_data.csv
```

`tcp.stream`은 같은 TCP 연결에 속한 패킷에 붙는 번호다. 요청과 응답이 같은 번호를 공유한다. `frame.time_epoch`는 절대 시각(유닉스 타임스탬프)이다. 이 두 가지를 조합하면 "같은 연결의 요청 시각과 응답 시각을 직접 빼서 정확한 지연 시간을 계산"할 수 있다. 중간에 ACK가 끼어도 값이 틀어지지 않는다.

```python
import re
from urllib.parse import unquote

stream_req = {}
pairs = []

with open('http_data.csv') as f:
    for line in f:
        parts = line.rstrip('\n').split(',')
        if len(parts) < 4:
            continue
        stream, epoch_str, uri, code = parts[0], parts[1], parts[2], parts[3]

        try:
            epoch = float(epoch_str)
        except:
            continue

        if uri and not code:  # 요청
            stream_req[stream] = (epoch, uri)
        elif code == '200' and stream in stream_req:  # 응답
            req_epoch, req_uri = stream_req[stream]
            delta = epoch - req_epoch
            pairs.append((stream, delta, req_uri))

hits = [(s, d, u) for s, d, u in pairs if d >= 3.0]
print(f"3초 이상 응답: {len(hits)}개\n")

flag_chars = {}
for s, d, u in hits:
    decoded = unquote(u)
    m = re.search(r'SUBSTRING\(.*?,(\d+),1\)\)\s*=\s*(\d+)', decoded)
    if m:
        idx, av = int(m.group(1)), int(m.group(2))
        ch = chr(av) if 32 <= av <= 126 else f'[{av}]'
        print(f"pos={idx:3d} | ascii={av:3d} | char='{ch}' | delta={d:.3f}s")
        flag_chars[idx] = ch

if flag_chars:
    max_idx = max(flag_chars.keys())
    flag = ''.join(flag_chars.get(i, '_') for i in range(1, max_idx + 1))
    print(f"\nFLAG: {flag}")
```

스크립트 동작 흐름은 이렇다. CSV를 한 줄씩 읽으면서 URI가 있고 응답 코드가 없으면 요청으로, 응답 코드가 200이면 응답으로 구분한다. 같은 tcp.stream 번호를 키로 요청 epoch와 응답 epoch를 빼서 시간차를 구한다. 3초 이상인 것만 걸러낸 뒤 URI를 URL 디코딩하면 `SUBSTRING(...,1,1))=71` 같은 형태가 나온다. 여기서 위치(pos)와 아스키 코드(ascii)를 추출해서 문자로 변환하고 위치 순서대로 조합하면 플래그가 완성된다.

Wireshark GUI는 구조를 눈으로 파악하는 용도로 쓰고, 실제로 데이터를 뽑을 때는 tshark와 스크립트로 처리하는 게 맞다.
