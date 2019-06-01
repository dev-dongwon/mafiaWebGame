# Mafia Game

[마피아 게임](https://namu.wiki/w/%EB%A7%88%ED%94%BC%EC%95%84(%EA%B2%8C%EC%9E%84))을 채팅으로 진행하는 웹게임으로 구현한다.

## 프로젝트 목표

- 게임에 필요한 객체들을 구성하고 관계를 정의하며 OOP 관점에 익숙해지기
- Node.js의 http, socket 통신 프로토콜을 이해하고 활용해보기

- 무엇보다 **일단 완성하기**. 구체화 시키기 힘든 부분은 라이브러리의 힘을 빌리든, 내용을 축소하든 해서 완결된 형태로 완성해보기.



## 구현해야 할 필수 요구 사항

- DB 개념을 이용할 것
  - sql 데이터베이스 사용 금지
  - CSV or JSON txt file로 구현
- 멀티 유저 프로그램이 되도록 구현
- 로그인 
  - 회원 가입, 사용자 인증(로그인), 패스워드 암호화(옵션)
- 성능
  - TPS(Transaction Per Second) 고려 : 유저 1000명이 100만 개의 오퍼레이션을 수행했을 때 감당할 정도
  - 스트레스 테스트를 수행할 것



## 게임 내 요구 사항

### RULE

- 게임 플레이어는 총 8명이고, 각 플레이어는 고유한 직업을 가진다
  - 일반 시민 : 2명
  - 마피아 : 3명
  - 특수 직업 : 3명
    - 보안관
      - 고유 스킬 : 탐정 - 지목한 플레이어의 직업 판별
    - 의사 
      - 고유 스킬 : 치료 - 지목한 플레이어는 마피아의 공격을 받아도 생존
    - 군인
      - 고유 스킬 : 훈련 - 마피아의 공격을 받으면 마피아도 함께 사망
- 플레이어의 상태는 '생존'과 '사망'으로 구분되며, '사망' 상태일 경우 채팅 참여를 포함한 게임 내 상호작용을 수행할 수 없다.

- 게임 종료 조건

  - 시민의 승리 : 모든 마피아 플레이어의 상태가 '사망' 상태일 때
  - 마피아의 승리 : 마피아 플레이어가 시민 플레이어보다 같거나 많을 때

- 게임은 턴제로 이루어지며, 각 턴은 다음과 같이 구성된다

  - 낮 : 전체 채팅 시간, 4분

    - 각 유저는 자유롭게 채팅을 할 수 있음

  - 저녁 : 사망자 투표 이벤트, 30초

    - 게임 내 '생존' 상태의 모든 플레이어는 마피아로 의심되는 유저를 투표

    - 가장 많은 득표를 한 유저는 '밤' 이벤트에서 '사망' 처리

  - 밤 : 사망자 처형 및 사망자 직업 공개 이벤트, 10초

    - 사망자 투표 이벤트에서 최다 득표를 한 유저를 공개, '사망' 상태로 처리
    - 유저 사망 시 유저의 직업이 공개

  - 새벽1 : 마피아 투표 이벤트, 30초

    - 직업이 '마피아'인 캐릭터만 참여 가능한 채팅창 활성화
    - 마피아 투표를 통해 '사망' 상태로 만들 캐릭터 선택
    - 투표 동수일 경우, 랜덤 확률로 사망할 캐릭터를 선택

  - 새벽2 : 플레이어 스킬 발동 이벤트, 10초
    - '평범한 시민' 직업을 제외한 각 시민은 특수한 직업을 갖고 있고, 각 직업은 고유한 스킬을 가짐
    - 10초 간 특수 스킬을 가진 플레이어는 시전 대상을 정하고 턴 종료
  - 새벽3 : 플레이어 사망 이벤트, 10초
    - 새벽1에서 마피아가 투표한 캐릭터가 사망하는 이벤트
    - 단, 새벽 2에서 보안관이나 의사 등의 캐릭터가 특수 스킬을 발동해 해당 캐릭터를 지킬 경우, 사망 이벤트 대신 고유 이벤트 발생
  - 새벽4 : 결과 정리 이벤트, 5초
    - 위 이벤트를 거치며 진행된 '사망' 이벤트와 '생존' 이벤트를 정리



## 예상되는 기술적 어려움

#### 비동기처리

게임의 턴이 진행될때마다 순차적으로 여러 개의 이벤트가 발생해야 한다. 비동기 개념을 제대로 익히고 사용하지 않는다면 구현에 어려움이 예상된다.

#### 채팅룸 구조

특정 유저가 채팅방을 만들고, 그 채팅방에 속해있는 플레이어 그룹이 있는 구조를 만들어야 한다. 더불어 플레이어 모두가 참여할 수 있는 채팅방과 특정 그룹만 참여할 수 있는 채팅방을 동시에 열어야 한다. 저수준에서 직접 구현하면 좋겠지만 학습 비용이 만만찮다. 기본 개념만 이해한 후 socket.io에서 제공하는 추상화된 기능을 활용해서 구현해보자.

#### 프론트 부분 작업 시간

html과 css를 이용해 ui를 구성해야 하는 작업을 단시간내에 끝내야 한다. ajax 요청을 활용하는 부분도 있기 때문에 한 번 막히면 시간을 잡아먹을 확률이 존재한다. 최대한 단순하게 디자인하고, 필요하다면 부트스트랩을 활용해 그리드를 나누는 작업 등의 자투리 시간을 최대한 줄여보자.

#### 정적 파일 읽기

Express를 사용하지 않으므로 직접 정적 파일을 읽는 부분을 구현해야 한다. 익스프레스 구조를 살피며 미들웨어, 라우트를 하나씩 구현해보자.

#### OOP

게임 내 캐릭터 간 공통된 부분을 추출하고, 다른 부분은 따로 떼어 객체를 구성해야 하고, 이벤트 내 캐릭터 간 상호작용을 객체 지향적으로 구성하기가 어려울 것 같다.

한번에 모든 것을 완벽하게 하려 하지 말자. 기본적인 OOP 원칙인 SOLID를 계속 되새기되, 계속 리팩토링하는 방식으로 OOP 구현을 위해 노력하자. 최소한 단일 책임 원칙을 지키기 위해 신경써보자.

#### 시간에 쫓겨 완성하지 못할 경우

이거 망한다고 프로그래머가 될 자격이 없어지는 것은 아니다. 어렵다고 피하지말고 일주일 간 즐겁게 내가 시도하고 싶은 것, 만들고 싶은 것을 마음껏 구현해보자. 

구현해야 할 내용을 정리하고 와이어프레임을 그려보니 생각보다 만만찮다. 진행하면서 타협해야 할 부분은 타협해가면서 어떻게든 완성하는 데 초점을 맞추자.



## Wireframe

### 로그인 페이지

![login](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/login.png?raw=true)



1. ID 입력
2. 비밀번호 입력
3. 로그인 버튼
   1. 로그인 성공 시 Lobby로 이동
   2. 로그인 실패 시 'id 혹은 비밀번호가 올바르지 않습니다' alert 창과 함께 로그인 form 초기화
4. 회원가입 페이지로 이동



### 회원가입 페이지

![join](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/join.png?raw=true)



1. 이름 입력
2. ID 입력
   1. ID 중복 여부는 ID박스 하단에 ajax로 메시지 출력
      1. ID 중복될 경우 red color로 '이미 존재하는 ID입니다' 출력
      2. 중복되지 않는 ID일 경우 green color로 '사용 가능한 ID입니다' 출력
   2. 구현 중 ajax 어려울 경우, '아이디 중복 체크' 버튼으로 대체

3. 비밀번호 입력
   1. 비밀번호는 최소 8자, 최대 12자
   2. (todo : 비밀번호 상세 규칙 확립 필요)

4. 비밀번호 확인 

   1. 3에서 입력한 비밀번호와 매칭

5. 로그인 페이지로 돌아가기 버튼

6. 회원가입 버튼

   1. 2에서 입력한 ID가 유효하지 않은 ID거나 

      4에서 입력한 비밀번호와 3에서 입력한 비밀번호가 일치하지 않을 시

      '입력한 정보가 올바르지 않습니다' 출력 후 회원가입 form 초기화

   2. 이외의 경우, 정상 회원가입 되어 db에 저장된 후 로비 페이지 이동



### 로비 페이지

![lobby](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/lobby.png?raw=true)

1. welcome message. ID와 함께 노출.
2. 게임 만들기 페이지로 이동
3. 현재 개설한 방 정보.
   1. No : 방 번호. 새로운 방을 개설할 때마다 +1씩 숫자가 증가
   2. Title : 방제. 최대 25자로 제한.
   3. Players : 현재 개설된 방에 입장한 플레이어 숫자 표시.
   4. Status : 현재 개설된 방 상태
      1. playing : 현재 게임 중
      2. waiting : 게임 시작 대기 중
4. 로그아웃 버튼. 버튼을 누르면 로그인 페이지로 돌아감.
5. 개설된 방에 입장할 버튼. 상태는 JOIN, FULL, PLAYING으로 나뉜다
   1. JOIN : Status가 wating이고, Players가 8 미만일 때 버튼을 클릭해 개설된 방에 들어갈 수 있다
   2. FULL : Status가 waiting이고, Players가 8일 때 full 상태가 되며, 버튼이 비활성되어 클릭할 수 없다
   3. INGAME : 해당하는 방 상태가 이미 게임 진행 중일때 Status가 playing으로 간주되며, 버튼이 비활성되어 클릭할 수 없다



### 새로운 게임 만들기 페이지

![create_room](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/create.png?raw=true)

1. 방제 입력창
   1. 방제 입력 조건은 1자 이상, 25자 이하로 제한한다
2. 이전 버튼 : 로비 페이지로 돌아간다
3. 방 만들기
   1. 버튼을 누르면 게임에 필요한 chat room을 만들고 인게임 화면으로 이동한다
   2. 방제 입력 조건을 위반할 경우 '올바르지 않은 방제입니다'로 메시지를 출력한 후, 입력 form이 초기화된다



### 게임 대기 화면

![waitingGame](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/waitingGame.png?raw=true)

1. 게임 대기 화면 메시지
2. 채팅 화면. 굵은 폰트로 id가 표시되고, 밑에 해당 id가 입력한 메시지가 표시된다
3. 메시지 입력창. enter를 누르면 메시지가 입력된다

4. 현재 참여 인원을 입장 인원/8 로 표시한다
5. 방을 개설한 사람만 게임 시작하기 버튼이 보인다. 게임 시작 인원인 8명이 모이지 않으면 회색으로 비활성화되어 표시되며, 참여 인원이 8명이 되었을 때 빨간색 버튼으로 활성화된다. 버튼을 누르면 게임이 시작되고, ''직업 분배'' 상태로 전환되며 게임이 시작된다.
6. 방에서 나와 로비로 돌아간다. 방을 만든 방장이 나가기 버튼을 누를 경우 개설한 방은 사라진다.



### 게임 로딩 페이지

![loading](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/loading1.png?raw=true)

![loading2](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/loading2.png?raw=true)

- 게임 시작하기 버튼을 누른 후 처음 5초 간 게임 참여자의 직업을 설정하는 동안 로딩 페이지가 노출

- 그 다음 10초 간 각 사용자의 직업 이름과 역할을 출력한다. 10초가 지난 후, 인게임 채팅창으로 이동



### inGame 페이지 1 - 낮 : #마을 회의실

![inGame 낮](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/inGame1.png?raw=true)



1. 현재 게임의 턴 횟수와 남은 시간 표시

2. 시민 역할을 하는 생존자와 사망자 숫자의 상태를 icon으로 표시

3. 마피아 역할을 하는 생존자와 사망사 숫자의 상태를 icon으로 표시

4. 채팅 출력창

5. 채팅 입력창

6. ID와 함께 직업 이름 출력

7. 해당 ID의 직업의 역할과 능력을 요약

8. 직업이 마피아일 경우, 동료 마피아의 아이디 노출

   이외의 경우는 공란



### inGame 페이지 2 - 저녁 : #마을 투표함

![vote](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/inGame2Vote.png?raw=true)



### inGame 페이지 3 - 밤 : # 교수대 앞

![inGame3Night](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/inGame3Night.png?raw=true)



### inGame 페이지4 - 새벽 : 마피아 은신처

![inGame4Midnight](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/inGame4MIdnight.png?raw=true)

- 직업이 '마피아'인 캐릭터만 참여 가능한 채팅창 활성화
- 마피아 투표를 통해 '사망' 상태로 만들 캐릭터 선택
- 투표 동수일 경우, 랜덤 확률로 사망할 캐릭터를 선택한다



### inGame 페이지5 - 새벽 : 캐릭터 스킬 발동

![inGame5Skill](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/inGame5Skill.png?raw=true)



### inGame 페이지6 - 새벽 : 사망 이벤트

![사망이벤트](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/inGame6DieEvent.png?raw=true)



### inGame 페이지7 - 결과 정리

![result](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/inGame7Result.png?raw=true)



### inGame 페이지8 - 엔딩 페이지

![ending](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/inGame8Ending.png?raw=true)





# 설계

## 게임 내 클래스 구조

![uml](https://github.com/dev-dongwon/nodejs-todo/blob/dev-dongwon/img/uml.png?raw=true)



