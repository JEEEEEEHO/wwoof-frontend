const File = ({ file, setFile, uploadedFile, setdeleteFile }) => {
  
  // 새로 등록하는 파일을 업로드 하는 경우 
  const onClick = (name) => {
    setFile("");
  };

  if (file) {
    const src = URL.createObjectURL(file[0]);
    return (
      <div key={file[0].name}>
        <img src={src} alt="error" width="100" height="100" />
        <button onClick={() => onClick(file[0].name)}>X</button>
      </div>
    );
  }

  // 기존에 업로드 되었던 파일을 삭제하는 경우 
  const onClickDelte = (name) =>{
    setdeleteFile(name)
  }

  if (uploadedFile) {
    <div key={uploadedFile.filename}>
      <img
        src={"http://localhost:8080/images/" + uploadedFile.filename}
        alt={"img" + uploadedFile.filename}
        style={{ width: "200px", height: "150px" }}
      />
      <button onClick={() => onClickDelte(uploadedFile.filename)}>X</button>
    </div>;
  }
};
export default File;
