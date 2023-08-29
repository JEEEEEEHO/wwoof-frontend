import { useState } from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";

function HostRegisterForm({ method }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";

  const [file, setFile] = useState([]);

  function cancelHandler() {
    navigate("..");
  }

  const onSelectFile = (e) => {
    if(e.target.files[0]){
      const [...file] = e.target.files;
      file.map(f => {
        setFile((file)=> [...file, {f, fileName : f.name}])
      })
    }
  };

  const FileList = ({file, setFile}) => {
    const onClick = fileName =>{
      setFile(
        file.filter(f => f.fileName !== fileName)
      )
    }
    
    return <div>
      {
        file.map(f =>{
          return <div key={f.fileName}>
            {f.fileName}
            <button onClick={()=>onClick(f.fileName)}>X</button>
          </div>
        })
      }

    </div>
  }


  return (
    <Form method={method} file={file}>
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
        <input
          type="file"
          name="mainImg"
        />
      </div>
      <div>
        <label htmlFor="files">
          이미지
        </label>
        <input type="file" name="images" id="uploadFile" multiple  onChange={onSelectFile} />
        <FileList file={file} setFile={setFile} />
      </div>
      {file}
      <input type="hidden" name="files" value={file} />
      {/* 승인날짜, 승인여부 */}
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
  const file = data.get("files");
  console.log(file[0]);

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
    throw json({ message: 'Could not save board.' }, { status: 500 });
  }
  return redirect('/boards')
}
