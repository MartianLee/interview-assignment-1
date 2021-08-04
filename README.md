# 인터뷰 과제 프로젝트

## 환경

- MacOS Big Sur 11.4
- node v14.16.0
- npm 7.20.3

## 설치

nvm 설치는 [이곳](https://github.com/nvm-sh/nvm)을 참조

```
nvm install 14.16.0
nvm use 14.16.0
npm install
```

## 실행

```
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 페이지를 엽니다.

## 사용한 도구 및 선정 이유

- React

  - 프론트엔드 라이브러리리 react를 사용하였습니다. 요구사항에 맞추어 따로 css library를 포함시키지는 않았습니다.
  - Valnila를 배제한 이유는 개발 생산성에서 React보다 부족하기 때문입니다. 일주일이라는 기한을 맞추는 것을 우선순위로 하다 보니 친숙하지 않은 프레임워크인 Vue도 제외하게 되었습니다.

- Recoil

  - 상태관리를 위해 recoil을 사용하였습니다.
  - 상태관리를 위한 라이브러리로는 Redux, mobX 등이 유명합니다. 이런 라이브러리 대신 Recoil을 사용한 것은 역시 시간 제한이 있는 프로젝트이기 때문입니다. recoil같은 경우는 상대적으로 redux에 비해 boilerplate 코드가 적습니다. 그리고 이번 프로젝트의 경우 빠르게 prototyping해서 기능을 구현할 수 있는 지 검증하는 것이 우선이었기 때문에 상대적으로 규칙이 적은 recoil을 택하였습니다. 최근에는 redux-toolkit이라는 best practice가 있긴 하나 문서를 검토해본 결과 recoil이 상대적으로 러닝커브가 낮다고 판단되어 선정하게 되었습니다.

- styled-component
  - 리엑트에서 컴포넌트를 스타일링하는 라이브러리 또한 아주 많습니다. styled component는 제가 다른 프로젝트에서 사용한 경험이 있어 러닝커브가 낮다고 판단하였습니다. 또한 출시된 지 오래된 라이브러리다보니 중간에 제가 막히는 상황이 발생하여도 커뮤니티에서 에러를 해결하기에 좀 더 수월할 것이라 판단하여 선택하였습니다.
