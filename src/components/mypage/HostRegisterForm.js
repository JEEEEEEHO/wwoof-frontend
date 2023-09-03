import { useState, useRef } from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";

import FileList from "./FileList";

const MAX_COUNT = 5;

function HostRegisterForm({ method }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const ref = useRef(null);

  function cancelHandler() {
    navigate("..");
  }

  const [fileList, setFileList] = useState([]);
  // 멀티파일 입력
  const [fileLimit, setFileLimit] = useState(false);
  // 파일 개수 제한

  const handleChoose = (e) => {
    e.preventDefault();
    ref.current && ref.current.click();
  };

  const handleChange = (e) => {
    const uploaded = [...fileList];
    // 이미 존재하는 파일들의 배열
    let limitExceeded = false;
    // 파일제한 개수
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
        if (uploaded.length > MAX_COUNT) {
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

  const handleUpload = () =>{
    console.log(fileList)
    if(!fileList){
      return;
    }
    const data= new FormData();
    [...fileList].forEach((f)=>{
      data.append('files', f);
    })
    uploadFiles(data);
  }


  let url = "http://localhost:8080/api/host/saveImgs";

  const uploadFiles = async data => {
    Array.from(data).forEach(el=>
      console.log(el));
    
    const response = await fetch(url, {
      method : 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body : data
    })
    .then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err));

    if(!response.ok){
      throw json({ message: 'Could not save imgs.' }, { status: 500 });
    }
  };

  return (
    <Form method={method} encType="multipart/form-data">
      <label htmlFor="shortintro">농장이름</label>
      <input type="text" name="shortintro" id="shortintro" />
      <br />

      <label htmlFor="region">지역</label>
      <input type="radio" name="region" id="region" value="1" />
      <label>경기도</label>
      <input type="radio" name="region" id="region" value="2" />
      <label>충청도</label>
      <br />

      <label htmlFor="age">나이</label>
      <input type="radio" name="age" id="age" value="1" />
      <label>20</label>
      <input type="radio" name="age" id="age" value="2" />
      <label>30</label>
      <br />

      <label htmlFor="gender">성별</label>
      <input type="radio" name="gender" id="gender" value="1" />
      <label>여</label>
      <input type="radio" name="gender" id="gender" value="2" />
      <label>남</label>
      <br />

      <label htmlFor="farmsts">농법</label>
      <input type="radio" name="farmsts" id="farmsts" value="1" />
      <label>친환경</label>
      <input type="radio" name="farmsts" id="farmsts" value="2" />
      <label>유기농</label>
      <br />

      <label htmlFor="maxPpl">최대인원</label>
      <input type="text" name="maxPpl" id="maxPpl" />
      <br />

      <label htmlFor="intro">소개</label>
      <textarea name="intro"></textarea>
      <br />

      <label htmlFor="lat">위도</label>
      <input type="text" name="lat" id="lat" />
      <br />

      <label htmlFor="lng">경도</label>
      <input type="text" name="lng" id="lng" />
      <br />
      <div>
        <label htmlFor="file">대표이미지</label>
        <input type="file" name="mainImg" />
      </div>
      <div>
        <label htmlFor="files">이미지</label>
        <button onClick={handleChoose}>choose file</button>

        <input
          type="file"
          name="images"
          ref={ref}
          multiple
          hidden
          onChange={handleChange}
        />
        <FileList fileList={fileList} setFileList={setFileList} />
        <button onClick={handleUpload} >파일 업로드</button>
      </div>

      <div>
        <button type="button" onClick={cancelHandler} disabled={isSubmiting}>
          취소
        </button>
        <button disabled={isSubmiting}>등록</button>
      </div>
    </Form>
  );
}

export default HostRegisterForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const HostData = {
    shortintro: data.get("shortintro"),
    region: data.get("region"),
    age: data.get("age"),
    gender: data.get("gender"),
    farmsts: data.get("farmsts"),
    maxPpl: data.get("maxPpl"),
    intro: data.get("intro"),
    lat: data.get("lat"),
    lng: data.get("lng"),
  };

  const formData = new FormData();
  formData.append(
    "hostData",
    new Blob([JSON.stringify(HostData)], { type: "application/json" })
  );

  // data.get("images").forEach((img) => {
  //   formData.append("files", img); // 동일한 key 값으로 계속 담아줌
  // });

  let url = "http://localhost:8080/api/host/save";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  console.log(response);

  if (!response.ok) {
    throw json({ message: "Could not save board." }, { status: 500 });
  }
  return redirect("/");
}
