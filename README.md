# 등록된 농장 예약가능한 날짜에 사용자 매칭 사이트 (WWOOF KOREA Website)

참고 사이트 
https://wwoof.fr/en/hosts
</br>
개발 정리 페이지 
https://www.notion.so/4e48c0e35b6445a380656449666a25c1?v=95155cce16bb48f2b2735d783d85fb8b&pvs=4

#### 1. 개발 환경 Tech Stack
   - React

#### 2. 모듈별 기능
![20240716_164020](https://github.com/user-attachments/assets/f51a1171-2cfc-4113-b901-c906b141568d)

**2-1. Router - Paging Click**

- MainNavigation : NavLink (main url)
- App : Create BrowserRouter
  ```javascript
  <NavLink to="/">
     <div className={classes.logo}>WWOOF KOREA</div>
   </NavLink>
   
   const router = createBrowserRouter([
     {
       //Header
       path: "/",
       element: <RoutLayout />,
       //errorElement: <ErrorPage />,
       id: "root",
       loader: tokenLoader,
       children: [
         { index: true, element: <Homepage /> },
   
         {
           path: "login",
           element: <LoginPage />,
           action: signinAction,
         },
     ```

- Layout (sidebar and outlet)
  - Making the sidebar component
  - SidebarLayout component - Planting the sidebar component outside of outlet componet
  - Assigning the layout component as a Root element at the APP component
    ```javascript
    function SidebarLayout() {
     return (
       <>
         <Sidebar />
         <div>
           <Outlet />
         </div>
       </>
     );
      }
      
    path: "mypage",
      element: <SidebarLayout />,
      children: [
        {
         index: true,
         element: <MyinfoPage />,
        },
    ```

 **2-2. Token**

- Saving Token at Local Storage
- Request to server with the token info
  ```javascript
     localStorage.setItem(ACCESS_TOKEN, resData.token);
   
      <헤더에 토큰 정보 저장>
      // Save token
      localStorage.setItem(ACCESS_TOKEN, resData.token);
      
      
      // Initial Page Loading App
      path: "/",
      element: <RoutLayout />,
      id: 'root',
      loader : tokenLoader,
      
      // extracting Token
      export function tokenLoader(){
          return getAuthToken();
      }
      
      export function getAuthToken(){
          const token = localStorage.getItem("ACCESS_TOKEN");
          if(token===null || !token){
              return undefined;
          }
          return token;
      }
      
      // Requesting to the server
      let headers = new Headers({
        "Content-Type": "application/json",
      });
      
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
      }
  ```

**2-3. Oauth Login**

- Login form : connecting the link to API AUTH url
  ```javascript
     <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
       <img src={googleLogo} alt="Google" /> Log in with Google
     </a>
     <a className="btn btn-block social-btn kakao" href={KAKAO_AUTH_URL}>
       <img src={kakaoLogo} alt="Kakao" /> Log in with Kakao
     </a>
   ```
  ```javascript
     export const API_BASE_URL = 'http://localhost:8080';

     export const GOOGLE_AUTH_URL = API_BASE_URL + '/auth/authorize/google';
     export const KAKAO_AUTH_URL = API_BASE_URL + '/auth/authorize/kakao';
     ```
- Token parsing and saving
  - Backend : transfer the token in the query string
    ```java
     response.sendRedirect("http://localhost:3000/socialLogin?token="+token);
    ```
   - Finding a path and save
     ```javascript
     {
        path: "socialLogin",
        element: <SocialLogin />,
      },
      const getUrlParameter = (name) => {
          // 쿼리 파라미터에서 값 추출
          let search = window.location.search;
          let params = new URLSearchParams(search);
          return params.get(name);
        };
      
        const token = getUrlParameter("token");
        // 토큰이라는 파라미터의 값을 추출함
      
        console.log("토큰 파싱 " + token);
      
        if (token) {
          // local Storage에 저장
          localStorage.setItem("ACCESS_TOKEN", token);
          return <Navigate to={{ pathname: "/", state: { from: props.location } }} />;
        } else{
          return <Navigate to={{ pathname: "/login", state: { from: props.location } }} />;
        }
      };
      ```


 **2-4. Host Register CRUD**

- Saving
  - Data + File => Blob
    ```javascript
     const HostData = {
        shortintro: getData.get("shortintro"),
        region: getData.get("region"),
        age: getData.get("age"),
        gender: getData.get("gender"),
        farmsts: getData.get("farmsts"),
        maxPpl: getData.get("maxPpl"),
        intro: getData.get("intro"),
        address: getData.get("address"),
        lat: getData.get("lat"),
        lng: getData.get("lng"),
        deleteMainImg: deleteMainImg,
        hostNum: hostNum,
      };
      
      formData.append("file", getData.get("mainImg"));
      formData.append(
        "hostData",
        new Blob([JSON.stringify(HostData)], { type: "application/json" })
      );
     ```
   - transfer the multiple images
     - using FormData Entity
       ```javascript
         const formData = new FormData();
         
         // 배열로 보내야함, FileList로 보내면 객체로 보내짐
         [...fileList].forEach((f) => {
           formData.append("files", f);
         });
         
         // delete 된 파일들의 이름이 저장되어있는 베열
         if (method === "PUT" && deleteFileList) {
           deleteFileList.forEach((f) => {
         	formData.append(
         	  "deleteFiles", f
         	); // 배열로 받아옴 [a, b, ...]
           });
         }
         // 서버에서 받은 호스트 번호
         formData.append("hnum", id);
       ```

   - Updating
       1) the Array only for showing (activating with the delete click)
       2) the Array for the deleting files
       3) the Array for the adding files
       ##### -> Backend : if there is deleting files -> delete data / and add the files
      ```javascript
         const formData = new FormData();
         
         // 배열로 보내야함, FileList로 보내면 객체로 보내짐
         [...fileList].forEach((f) => {
           formData.append("files", f);
         });
         
         // delete 된 파일들의 이름이 저장되어있는 베열
         if (method === "PUT" && deleteFileList) {
           deleteFileList.forEach((f) => {
         	formData.append(
         	  "deleteFiles", f
         	); // 배열로 받아옴 [a, b, ...]
           });
         }
         // 서버에서 받은 호스트 번호
         formData.append("hnum", id);
      ```
      ```javascript
         const [screenImgs, setScreenImgs] = useState([]);

         // 이미 서버에 저장된 파일들을 담아줌 
         useEffect(()=>{
         	uploadedFiles && setScreenImgs([...uploadedFiles])
         },[]);
         
         const onClick = (name) => {
         	setFileList(fileList.filter((f) => name !== f.name));
         };
         
         const onClickDelte = (filename) => {
         	// 화면에서 삭제함
         	setScreenImgs(screenImgs.filter((f) => filename !== f.filename));
         	// 호스트 이미지 파일 개수 하나 빼줌 
         	hostFileCnt--;
         	setHostFileCnt(hostFileCnt);
         	// delete 배열에 저장함
         	setdeleteFileList(deleteFileList =>{
         	  return [...deleteFileList, filename]
         	});
         };
         
         
         return (
         	<div>
         	  {screenImgs &&
         		screenImgs.map((f) => {
         		  return (
         			<div key={f.filename}>
         			  <img src={f.fileUri} alt={f.filename} width="100" height="100" />
         			  <button onClick={() => onClickDelte(f.filename)}>X</button>
         			</div>
         		  );
         		})}
         
         	  {fileList &&
         		fileList.map((f) => {
         		  // 이미지 미리보기 
         		  const src = URL.createObjectURL(f);
         		  return (
         			<div key={f.name}>
         			  <img src={src} alt="error" width="100" height="100" />
         			  <button onClick={() => onClick(f.name)}>X</button>
         			</div>
         		  );
         		})}
         	</div>
         );
      ```
 **2-5. WishList GNB**

- useContext Setting 
   - WishContext - React Create Context
   - WishProvider - Server connect with fetch 
   - RoutLayout - top layer of all
     ```javascript
        return (
           <>
             <WishProvider>
               <MainNavigation />
               <main>
                 {navigation.state === "loading..." && <p>Loading...</p>}
                 <Outlet></Outlet>
               </main>
               <FooterNavigation />
             </WishProvider>
           </>
         );
         }
     ```

- Clicking and changing the data
  - Receiving the data from server : using multile Promise
    ```javascript
     const [responseHost, responseWish] = await Promise.all([
        fetch("http://localhost:8080/api/host/list", {
          method: "GET",
          headers: headers,
        }),
        fetch("http://localhost:8080/api/wishList/list", {
          method: "GET",
          headers: headers,
        }),
      ]);
       ...
       let hosts = await responseHost.json();
       let wishs = await responseWish.json();
      ```

   - Clicking and calling the handler to change the data
     ```javascript
        <button
         	type="button"
         	aria-label="위시리스트에 저장"
         	onClick={() => wishItemContextCheckHandler(host.hnum)}
         >
         
         const wishItemContextCheckHandler = (hnum) => {
           let flag = wishList.findIndex(wish => wish.hostNum === hnum);
           if(flag !== -1){
             wishItemRemoveHandler(hnum);
           } else{
             wishItemAddHandler(hnum);
           }
         };
        ```
   - Re-rendering JSX
     ```javascript
     {wishList.findIndex(wish => wish.hostNum === hnum) !== -1? (
       <img
         src={fullWishList}
         alt="wishlist"
         style={{ width: "10px", height: "10px" }}
       />
     ) : (
       <img
         src={emptyWishList}
         alt="wishlist"
         style={{ width: "10px", height: "10px" }}
       />
     )}
     ```
