import { useState, useRef } from "react";
import {
  useNavigate,
  useNavigation,
  json,
  redirect
} from "react-router-dom";

import FileList from "./FileList";
import File from "./File";

const MAX_COUNT = 5;

function HostRegisterForm({method, host}) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const ref = useRef(null);
  const refMainImg = useRef(null);
  function cancelHandler() {
    navigate("..");
  }

  const [file, setFile] = useState("");
  // 대표 이미지 입력
  const [deleteFile, setdeleteFile] = useState("");
  // 대표 이미지 삭제 (String)
  const [fileList, setFileList] = useState([]);
  // 멀티파일 입력
  const [deleteFileList, setdeleteFileList] = useState([]);
  // 멀티파일 삭제 (String Array)
  const [fileLimit, setFileLimit] = useState(false);
  // 파일 개수 제한

  const handleMainImgChoose = (e) => {
    e.preventDefault();
    refMainImg.current && refMainImg.current.click();
  };
  const handleMainImgChange = (e) => {
    setFile(e.target.files);
  };

  const handleChoose = (e) => {
    e.preventDefault();
    ref.current && ref.current.click();
  };
  const handleChange = (e) => {
    const uploaded = [...fileList];
    // 이미 존재하는 파일들의 배열
    let limitExceeded = false;
    // 파일제한 개수
    const hostFileCnt = host ? host.hostMainImg.length : 0;
    // 서버에 등록되어 있었던 이미지의 개수 

    const files = Array.from(e.target.files);
    files.some((newFile) => {
      if (uploaded.findIndex((f) => f.name === newFile.name) === -1) {
        // 이미 존재하는 파일들의 이름과 새로운 파일의 이름을 비교해서 다른 경우
        uploaded.push(newFile);
        // 새로운 파일을 업로드 함
        if (uploaded.length === MAX_COUNT) {
          setFileLimit(true);
          // 파일 제한
        }
        if (uploaded.length + hostFileCnt > MAX_COUNT) {
          alert("파일제한초과");
          setFileLimit(false);
          limitExceeded = true;
          return true;
        } 
        
      }
    });
    if (!limitExceeded) {
      setFileList(uploaded);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const getData = new FormData(e.target);

    const HostData = {
      shortintro: getData.get("shortintro"),
      region: getData.get("region"),
      age: getData.get("age"),
      gender: getData.get("gender"),
      farmsts: getData.get("farmsts"),
      maxPpl: getData.get("maxPpl"),
      intro: getData.get("intro"),
      lat: getData.get("lat"),
      lng: getData.get("lng"),
    };
    
 
    
    const formData = new FormData();
    formData.append('file', getData.get("mainImg"));
    formData.append('hostData', new Blob([JSON.stringify(HostData)], { type: "application/json" }))
    
    let url = 'http://localhost:8080/api/host/save';
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if(response.state === 422){
      return response;
    }
    if (!response.ok) {
      throw json({ message: 'Could not save board.' }, { status: 500 });
    }
    response.json().then(res =>  uploadFiles(`${res}`) );
    // id를 전달함 
  };

  const uploadFiles = async (id) => {
    if (!fileList) {
      return;
    }
    const formData = new FormData();
    [...fileList].forEach((f) => {
      formData.append('files', f); // 배열로 보내야함, FileList로 보내면 객체로 보내짐 
    });
    formData.append('hnum', id);
    // 서버에서 받은 호스트 번호 
    
    let url = "http://localhost:8080/api/host/saveImg";
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw json({ message: "Could not save imgs." }, { status: 500 });
    }
    if (!response.ok) {
      throw json({ message: 'Could not save board.' }, { status: 500 });
    }
    return redirect('/boards');
  };

  return (
    <form onSubmit={handleUpload} encType="multipart/form-data">
      <label htmlFor="shortintro">농장이름</label>
      <input type="text" name="shortintro" id="shortintro" defaultValue={host ? host.shortintro : ""} />
      <br />

      <label htmlFor="region">지역</label>

      <input type="radio" name="region" id="region" value="1" checked={this.host.region===1} />
      <label>경기도</label>
      <input type="radio" name="region" id="region" value="2" checked={this.host.region===2} />
      <label>충청도</label>
      <br />

      <label htmlFor="age">나이</label>
      <input type="radio" name="age" id="age" value="1" checked={this.host.age===1} />
      <label>20</label>
      <input type="radio" name="age" id="age" value="2" checked={this.host.age===2} />
      <label>30</label>
      <br />

      <label htmlFor="gender">성별</label>
      <input type="radio" name="gender" id="gender" value="1" checked={this.host.gender===1} />
      <label>여</label>
      <input type="radio" name="gender" id="gender" value="2" checked={this.host.gender===2} />
      <label>남</label>
      <br />

      <label htmlFor="farmsts">농법</label>
      <input type="radio" name="farmsts" id="farmsts" value="1" checked={this.host.farmsts===1} />
      <label>친환경</label>
      <input type="radio" name="farmsts" id="farmsts" value="2" checked={this.host.farmsts===2} />
      <label>유기농</label>
      <br />

      <label htmlFor="maxPpl">최대인원</label>
      <input type="text" name="maxPpl" id="maxPpl" defaultValue={host ? host.maxPpl : ""} />
      <br />

      <label htmlFor="intro">소개</label>
      <textarea name="intro"  defaultValue={host ? host.intro : ""} ></textarea>
      <br />

      <label htmlFor="lat">위도</label>
      <input type="text" name="lat" id="lat" />
      <br />

      <label htmlFor="lng">경도</label>
      <input type="text" name="lng" id="lng" />
      <br />
      <div>
        <label htmlFor="file">대표이미지</label>
        <button onClick={handleMainImgChoose}>choose file</button>
        <input
          type="file"
          name="mainImg"
          accept=".jpg, .png"
          ref={refMainImg}
          onChange={handleMainImgChange}
          hidden
        />
        <input
          type="text"
          name="deleteMainImg"
          value={deleteFile}
          hidden
        />
        <File file={file} setFile={setFile} uploadedFile={host.hostMainImg} setdeleteFile={setdeleteFile} />

      </div>
      <div>
        <label htmlFor="files">이미지</label>
        <button onClick={handleChoose}>choose file</button>
        <input
          type="file"
          name="images"
          accept=".jpg, .png"
          ref={ref}
          onChange={handleChange}
          hidden
          multiple
        />
        <FileList fileList={fileList} setFileList={setFileList} uploadFiles={host.hostImg}  />
      </div>
      <div>
        <button type="button" onClick={cancelHandler} disabled={isSubmiting}>
          취소
        </button>
        <button type="submit" disabled={isSubmiting}>
          등록
        </button>
      </div>
    </form>
  );
}

export default HostRegisterForm;
