# 등록된 농장 예약가능한 날짜에 사용자 매칭 사이트 (WWOOF KOREA Website)

참고 사이트 
https://wwoof.fr/en/hosts
</br>
개발 정리 페이지 
https://www.notion.so/4e48c0e35b6445a380656449666a25c1?v=95155cce16bb48f2b2735d783d85fb8b&pvs=4

**1. 개발 환경 Tech Stack**
   - React

**2. 모듈별 기능**   
    2-1. 위시리스트 GNB
    - WishList : useContext 활용으로 어떤 페이지에서도 값 가지고 가도록 함 

```javascript
const WishContext = React.createContext({
  hosts: [], // 호스트 번호가 담긴 배열 
  addHost: (hnum) => {},
  removeHost: (hnum) => {},
});
```

2-2. 농장 보기 : Loader
  - 페이지 로딩시에 loader
  ```javascript
const { hosts, wishs } = useLoaderData();
```

3-3. 농장 등록 register : file과 data 서버에 보내기 
```javascript
    formData.append(
      "hostData",
      new Blob([JSON.stringify(HostData)], { type: "application/json" })
    );
```
