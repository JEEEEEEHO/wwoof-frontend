import DaumPostcode from 'react-daum-postcode';

interface P {
    isOpen: boolean;
    handleAddressChange: (mainAddress: string) => void;
    close: () => void;
  }

const AddressFind = ({ isOpen, handleAddressChange, close }: P)=>{
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
      });
}

export default AddressFind;