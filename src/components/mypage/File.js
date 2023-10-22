import { useState, useEffect } from "react";

const File = ({ file, setFile, uploadedFile, setdeleteFile }) => {

  const [screenImg, setScreenImg] = useState("");
  
  // (화면 보여주기용) 가져온 이미지 객체를 담음 
  useEffect(()=>{
    uploadedFile && setScreenImg(uploadedFile)
  },[]);


  // 새로 등록하는 파일을 업로드 하는 경우
  const onClick = (name) => {
    setFile("");
  };

  if (file) {
    const src = URL.createObjectURL(file[0]);
    // 이미지 미리보기 
    return (
      <div key={file[0].name}>
        <img src={src} alt="error" width="100" height="100" />
        <button onClick={() => onClick(file[0].name)}>X</button>
      </div>
    );
  }

  // 기존에 업로드 되었던 파일을 삭제하는 경우
  const onClickDelte = (name) => {
    console.log("삭제 메인 이미지 "+name);
    setScreenImg("");
    setdeleteFile(name);
  };

  if (screenImg) {
    return (
      <div key={screenImg.pid}>
        <img
          src={screenImg.fileUri}
          alt={screenImg.filename}
          style={{ width: "200px", height: "150px" }}
         
        />
        <button onClick={() => onClickDelte(screenImg.filename)}>X</button>
      </div>
    );
  }
};
export default File;
