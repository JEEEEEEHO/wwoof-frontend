import { useRef } from "react";
import { useDaumPostcodePopup } from 'react-daum-postcode';
 
const AddressFind = (props) => {
  const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);
  const setInputAddress = props.setInputAddress;

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; //추가될 주소
    let townAddress = '';
    //let localAddress = data.sido + ' ' + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
    if (data.addressType === 'R') { //주소타입이 도로명주소일 경우
      if (data.bname !== '') {
        extraAddress += data.bname; //법정동, 법정리
      }
      if (data.buildingName !== '') { //건물명
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      townAddress =  fullAddress += (extraAddress !== '' ? `(${extraAddress})` : '');
    }
    setInputAddress(townAddress);
  }
  //클릭 시 발생할 이벤트
  const handleClick = () => {
    //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
  	open({onComplete: handleComplete});
  }
  return <button type="button" onClick={handleClick}>주소찾기</button>
}
 
export default AddressFind;