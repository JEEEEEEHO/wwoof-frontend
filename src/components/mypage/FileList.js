import { useState, useEffect } from "react";

const FileList = ({
  fileList,
  setFileList,
  uploadedFiles,
  setdeleteFileList,
  hostFileCnt,
  setHostFileCnt
}) => {
  const [screenImgs, setScreenImgs] = useState([]);
  // (화면 보여주기용)
  // 서버에 저장되어있는 파일들의 이름을 저장한 배열 화면에 보여줌
  // delete 할 시에 삭제 되어 보여주기 위함

  const deleteList = [];
  // 삭제 파일리스트 배열로 전환 

  const onClick = (name) => {
    setFileList(fileList.filter((f) => name !== f.name));
  };

  const onClickDelte = (filename) => {
    setScreenImgs(screenImgs.filter((f) => filename !== f.filename));
    // 화면에서 삭제함
    hostFileCnt--;
    setHostFileCnt(hostFileCnt);
    // 호스트 이미지 파일 개수 하나 빼줌 
    deleteList.push(filename);
    setdeleteFileList(deleteList);
    // delete 배열에 저장함
  };

  useEffect(()=>{
    uploadedFiles && setScreenImgs([...uploadedFiles])
  },[]);

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
          const src = URL.createObjectURL(f);
           // 이미지 미리보기 
          return (
            <div key={f.name}>
              <img src={src} alt="error" width="100" height="100" />
              <button onClick={() => onClick(f.name)}>X</button>
            </div>
          );
        })}
    </div>
  );
};

export default FileList;
