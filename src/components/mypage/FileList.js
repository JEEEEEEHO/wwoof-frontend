import { useState } from "react";

const FileList = ({
  fileList,
  setFileList,
  uploadedFiles,
  deleteFileList,
  setdeleteFileList,
}) => {
  const [uploadFiles, setUploadFiles] = useState([]);
  // (화면 보여주기용)
  // 서버에 저장되어있는 파일들의 이름을 저장한 배열 화면에 보여줌
  // delete 할 시에 삭제 되어 보여주기 위함

  const onClick = (name) => {
    setFileList(fileList.filter((f) => name !== f.name));
  };

  const onClickDelte = (filename) => {
    setUploadFiles(uploadFiles.filter((f) => filename !== f.filename));
    // 화면에서 삭제함
    setdeleteFileList(deleteFileList.push(filename));
    // delete 배열에 저장함
  };

  return (
    <div>
      {uploadedFiles &&
        uploadedFiles.map((f) => {
          const src = f.fileImgPath;
          uploadFiles.push(f.filename);
          return (
            <div key={f.filename}>
              <img src={src} alt="error" width="100" height="100" />
              <button onClick={() => onClickDelte(f.filename)}>X</button>
            </div>
          );
        })}

      {fileList &&
        fileList.map((f) => {
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
};

export default FileList;
