import { useState, useRef, useEffect } from "react";
import { useNavigate, useNavigation, json, redirect } from "react-router-dom";


import FileList from "./FileList";
import File from "./File";
import AddressFind from "./AddressFind";

const MAX_COUNT = 5;

function HostRegisterForm({ method, host }) {
  // 수정일 때 method가 존재함
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const ref = useRef(null);
  const refMainImg = useRef(null);
  function cancelHandler() {
    navigate("..");
  }

  // 호스트 정보 
  const [hostNum, setHostNum] = useState("");
  useEffect(()=>{
    host && setHostNum(host.hnum);
  },[]);


  // 대표 이미지 입력
  const [file, setFile] = useState("");
  // 대표 이미지 삭제 (String)
  const [deleteFile, setdeleteFile] = useState("");

  // 멀티파일 입력
  const [fileList, setFileList] = useState([]);
  // 멀티파일 삭제 (String Array)
  const [deleteFileList, setdeleteFileList] = useState([]);

  // 파일 개수 제한
  const [fileLimit, setFileLimit] = useState(false);
  const [hostFileCnt, setHostFileCnt] = useState(0);

  // 카카오 주소 
  const [inputAddress, setInputAddress] = useState("");
  // 위도 
  const [lat, setLat] = useState("");
  // 경도 
  const [lng, setLng] = useState("");
 
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
    // 업로드하는 파일들의 배열
    const uploaded = [...fileList];
    // 파일제한 개수
    let limitExceeded = false;
    // 서버에 등록되어 있었던 이미지의 개수
    const uploadedImgsCnt = host ? host.hostMainImg.length : 0;
    setHostFileCnt(uploadedImgsCnt);

    const files = Array.from(e.target.files);
    files.some((newFile) => {
      // 업로드된 파일들의 이름과 새로운 파일의 이름을 비교해서 다른 경우
      if (uploaded.findIndex((f) => f.name === newFile.name) === -1) {
        // 새로운 파일을 업로드 함
        uploaded.push(newFile);
        if (uploaded.length === MAX_COUNT) {
          // 파일 제한
          setFileLimit(true);
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
    const deleteMainImg = deleteFile ? deleteFile : ""; // 메인이미지가 삭제된 경우

    const formData = new FormData();

    const HostData = {
      shortintro: getData.get("shortintro"),
      region: getData.get("region"),
      age: getData.get("age"),
      gender: getData.get("gender"),
      farmsts: getData.get("farmsts"),
      maxPpl: getData.get("maxPpl"),
      intro: getData.get("intro"),
      address : getData.get("address"),
      lat: getData.get("lat"),
      lng: getData.get("lng"),
      deleteMainImg: deleteMainImg,
      hostNum : hostNum
    };

    formData.append("file", getData.get("mainImg"));
    formData.append(
      "hostData",
      new Blob([JSON.stringify(HostData)], { type: "application/json" })
    );

    let headers = new Headers();

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
      headers.append("Authorization", "Bearer " + accessToken);
    }

    // update or insert
    let url =
      method === "PUT" ? "http://localhost:8080/api/host/update" : "http://localhost:8080/api/host/save";
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: formData,
    });

    if (response.state === 422) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: "Could not save board." }, { status: 500 });
    }
    // id를 전달함
    response.json().then((res) => uploadFiles(`${res}`));
  };

  const uploadFiles = async (id) => {
    if (!fileList) {
      return;
    }
    const formData = new FormData();

    // 배열로 보내야함, FileList로 보내면 객체로 보내짐
    [...fileList].forEach((f) => {
      formData.append("files", f);
    });

    // delete 된 파일들의 이름이 저장되어있는 파일들
    if (method === "PUT" && deleteFileList) {
      deleteFileList.forEach((f) => {
        formData.append("deleteFiles", f);
      });
    }

    // 서버에서 받은 호스트 번호
    formData.append("hnum", id);

    // update or insert
    let url =
      method === "PUT" ? "http://localhost:8080/api/host/updateImg" : "http://localhost:8080/api/host/saveImg";
    const response = await fetch(url, {
      method: method,
      body: formData,
    });

    if (!response.ok) {
      throw json({ message: "Could not save imgs." }, { status: 500 });
    }
    alert("Host Save Success");
    return redirect("/myinfoHost");
  };

  return (
    <form onSubmit={handleUpload} encType="multipart/form-data">
      <label htmlFor="shortintro">농장이름</label>
      <input
        type="text"
        name="shortintro"
        id="shortintro"
        defaultValue={host ? host.shortintro : ""}
      />
      <br />
      <label htmlFor="region">지역</label>
      <input
        type="radio"
        name="region"
        id="region"
        value="1"
        defaultChecked={host && host.region === "1"}
      />
      <label>경기도</label>
      <input
        type="radio"
        name="region"
        id="region"
        value="2"
        defaultChecked={host && host.region === "2"}
      />
      <label>충청도</label>
      <br />
      <label htmlFor="age">나이</label>
      <input
        type="radio"
        name="age"
        id="age"
        value="1"
        defaultChecked={host && host.age === "1"}
      />
      <label>20</label>
      <input
        type="radio"
        name="age"
        id="age"
        value="2"
        defaultChecked={host && host.age === "2"}
      />
      <label>30</label>
      <br />
      <label htmlFor="gender">성별</label>
      <input
        type="radio"
        name="gender"
        id="gender"
        value="1"
        defaultChecked={host && host.gender === "1"}
      />
      <label>여</label>
      <input
        type="radio"
        name="gender"
        id="gender"
        value="2"
        defaultChecked={host && host.gender === "2"}
      />
      <label>남</label>
      <br />
      <label htmlFor="farmsts">농법</label>
      <input
        type="radio"
        name="farmsts"
        id="farmsts"
        value="1"
        defaultChecked={host && host.farmsts === "1"}
      />
      <label>친환경</label>
      <input
        type="radio"
        name="farmsts"
        id="farmsts"
        value="2"
        defaultChecked={host && host.farmsts === "2"}
      />
      <label>유기농</label>
      <br />
      <label htmlFor="maxPpl">최대인원</label>
      <input
        type="text"
        name="maxPpl"
        id="maxPpl"
        defaultValue={host ? host.maxPpl : ""}
      />
      <br />
      <label htmlFor="intro">소개</label>
      <textarea name="intro" defaultValue={host ? host.intro : ""}></textarea>
      <br />
      <AddressFind setInputAddress={setInputAddress} setLat={setLat} setLng={setLng} />
      <label htmlFor="address">주소</label>
      <input
        type="text"
        name="address"
        id="address"
        defaultValue={host ? host.inputAddress : inputAddress}
      />
      <label htmlFor="lat">위도</label>
      <input
        type="text"
        name="lat"
        id="lat"
        defaultValue={host ? host.lat : lat}
      />
      <br />
      <label htmlFor="lng">경도</label>
      <input
        type="text"
        name="lng"
        id="lng"
        defaultValue={host ? host.lng : lng}
      />
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
        <File
          file={file}
          setFile={setFile}
          uploadedFile={host ? host.hostMainImg : ""}
          setdeleteFile={setdeleteFile}
        />
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
        <FileList
          fileList={fileList}
          setFileList={setFileList}
          uploadedFiles={host ? host.hostImg : ""}
          setdeleteFileList={setdeleteFileList}
          uploadedImgsCnt={hostFileCnt}
          setHostFileCnt={setHostFileCnt}
        />
      </div>

      <div>
        <button type="button" onClick={cancelHandler} disabled={isSubmiting}>
          취소
        </button>
        {host&&<button type="submit" disabled={isSubmiting}>
          수정
        </button>}
        {!host&&<button type="submit" disabled={isSubmiting}>
          저장
        </button>}
      </div>
    </form>
  );
}

export default HostRegisterForm;
