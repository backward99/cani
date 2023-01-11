# 프로젝트 취약점 스캐너

링크 :  https://backward99.github.io/cani/#/

## 제작 기간, 참여 인원

2022/09/15 ~ 2022/10/31
웹: 2명

### 사용기술

- Front-End
    - React.js
    - CSS
- Back-End
    - Firebase Api
- Server
    - github pages

### 주요 기능

- 원하는 내용을 스캔하면 검색결과로 파일이 제공됩니다. 파일로 나온 결과가 어떤지 사용자가 보기 쉽게 하기 위한 웹입니다.  스캔된 검사 결과를 카테고리 별로 나누었습니다. 원하는 내용을 클릭해 확인할 수 있습니다.
- 로그인 기능
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/57629d61-b773-4d9f-8f2e-d36d398a0261/Untitled.png)
    

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dc67e792-b154-420c-9c62-921f5cd6c70d/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/90a84385-e370-4bef-afc6-ef77bf26a288/Untitled.png)

- 데이터 불러오기
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7976928b-3780-4d80-897d-3979524eee71/Untitled.png)
    
- 데이터 자료형 구분
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cd232f03-b53d-4240-9739-348d8c80d8f7/Untitled.png)
    
- 화면 구성

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/16f15a1c-7861-4761-9939-7fb6efac8c53/Untitled.png)

### 문제 해결

- 악의적인 목적으로 사이트를 이용할 수 있다는 문제점 제기
    - 특정 사용자만 이용할 수 있도록 로그인 기능 사용
- 어떤 결과가 악성코드가 탐지된 것인지 사용자가 알아보기 힘들 수 있다는 문제점 제기
    - ?를 클릭하여 해당 카테고리 별로 이미지 설명을 추가
- 검사결과가 일정한 데이터 형식으로 나오지 않는다는 문제점 발견
    - 자료형 검사 후 다른 방식으로 처리
- 검사된 결과를 바로 보여주는 것보다 클릭하면 결과를 상세히 보여주자는 의견
    
    ![스크린샷(248).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/552fb5b3-b4be-4854-8433-fa149ccff4eb/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(248).png)
    
- json 데이터를 받아서 처리할 때 오류 발견
    - Object로 json데이터 가공
- ustState - 기본 값을 배열로 설정할 때 존재 여부
    - 빈 배열 자체도 자료가 존재하는 것으로 판정됨
    - 배열의 길이로 자료가 존재하는지 검사하는 것으로 변경
- 불러온 데이터를 버튼으로 컨트롤 하려고 할 때 각 버튼마다 구분
    - dataset을 이용하여 버튼마다 번호를 지정

### 느낀 점

- 아쉬웠던 점
    - 처음 계획은 React, CSS, mongoDB, AWS로 웹을 제작하는 것이었습니다. 하지만 배포를 하는 과정 중에 문제를 쉽게 해결하지 못한것이 아쉽습니다.
    - 툴을 사용하지 않고 직접 CSS를 이용하여 디자인 하면서 좀 더 좋은 아이디어가 떠오르지 않았던 점이 아쉽습니다.
- 좋았던 점
    - 프로젝트를 개인이 아니라 팀으로 진행하여 웹을 제작할 때 피드백을 바로 받을 수 있다는 점이 좋았습니다.
    - json데이터를 다루어 보면서 api를 직접 제작해보는 것은 어떨지 생각하며 다음 학습의 방향을 잡게 되어 좋았습니다.
    - github pages와 firebase를 이용하여 동적인 페이지 처럼 작동할 수 있는 웹을 배포할 수 있다는 것을 알아 좋았습니다.
    - 다양한 오류를 만나면서 놓치고 있던 언어의 기본기들을 조금씩 더 알아갈 수 있어 좋았습니다.
