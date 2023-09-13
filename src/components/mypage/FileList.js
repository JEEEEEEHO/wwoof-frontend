const FileList = ({ fileList, setFileList, uploadFiles }) => {
  const onClick = (name) => {
    setFileList(fileList.filter((f) => name !== f.name));
  };

  return (
    <div>
      {fileList && 
        uploadFiles.
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