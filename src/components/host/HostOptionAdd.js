const HostOptionAdd = (setHostGender, setHostFarmsts) => {
  
  const genderChangeHandler = (e) =>{
    setHostGender(e.target.value);
  }
  
  const farmstsChangeHandler = (e) =>{
    setHostFarmsts(e.target.value);
  }
  
  return (
    <>
      <label htmlFor="gender">성별</label>
      <input
        type="radio"
        name="gender"
        id="gender"
        value="1"
        onChange={genderChangeHandler}
      />
      <label>여</label>
      <input
        type="radio"
        name="gender"
        id="gender"
        value="2"
        onChange={genderChangeHandler}
      />
      <label>남</label>
      <input
        type="radio"
        name="gender"
        id="gender"
        value=""
        defaultChecked
        onChange={genderChangeHandler}
      />
      <label>무관</label>
      <br />
      <label htmlFor="farmsts">농법</label>
      <input
        type="radio"
        name="farmsts"
        id="farmsts"
        value="1"
        onChange={farmstsChangeHandler}
      />
      <label>친환경</label>
      <input
        type="radio"
        name="farmsts"
        id="farmsts"
        value="2"
        onChange={farmstsChangeHandler}
      />
      <label>유기농</label>
      <input
        type="radio"
        name="farmsts"
        id="farmsts"
        value=""
        defaultChecked
        onChange={farmstsChangeHandler}
      />
      <label>무관</label>
    </>
  );
};
export default HostOptionAdd;
