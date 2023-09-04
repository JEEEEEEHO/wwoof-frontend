const File = ({ file, setFile }) => {
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
};
export default File;
