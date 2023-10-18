import { useEffect } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

const AddressFind = (props) => {
  const setInputAddress = props.setInputAddress;
  const setLat = props.setLat;
  const setLng = props.setLng;
  const apiKey = '6da7c37a54a54b5a4e25bc33459da757';
  
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer&autoload=false`;
    document.head.appendChild(script);
  }, []);

  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const geoCoder = new window.kakao.maps.services.Geocoder();
  const getAddressCoords = (address) => {
    return new Promise((resolve, reject) => {
      geoCoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].x, result[0].y);
          resolve(coords);
        } else {
          reject(status);
        }
      });
    });
  };

  const handleComplete = async (data) => {
    let fullAddress = data.address;
    let extraAddress = ""; //추가될 주소
    let townAddress = "";
    //let localAddress = data.sido + ' ' + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
    let zipCode = '';
    let mainAddress = '';
    let x = 0;
    let y = 0;
    if (data.addressType === "R") {
      //주소타입이 도로명주소일 경우
      if (data.bname !== "") {
        extraAddress += data.bname; //법정동, 법정리
      }
      if (data.buildingName !== "") {
        //건물명
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      townAddress = fullAddress +=
        extraAddress !== "" ? `(${extraAddress})` : "";
    }
    mainAddress = data.roadAddress || data.jibunAddress;
    const coords = await getAddressCoords(mainAddress);
    x = coords.getLng();
    y = coords.getLat();
    
    setInputAddress(townAddress);
    setLat(x); // 위도
    setLng(y); // 경도

  };
  //클릭 시 발생할 이벤트
  const handleClick = () => {
    //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
    open({ onComplete: handleComplete });
  };
  return (
    <button type="button" onClick={handleClick}>
      주소찾기
    </button>
  );
};

export default AddressFind;
