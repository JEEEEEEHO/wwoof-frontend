const File = ({ file, setFile, uploadedFile}) => {
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

  if(uploadedFile){
    <div key={uploadedFile.pid}>
    <img
        src={process.env.REACT_APP_API_URL+"/images/"+uploadedFile.filename}
        alt={"img"+uploadedFile.pid}
        style={{width:"200px", height:"150px"}}
    />
</div>
  }
};
export default File;
