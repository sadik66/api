import React,{useEffect,useState} from "react"
import { toast } from "react-toastify";

import PersonalInfoEdit from "./personalInfoEdit";
import PersonalInfo from "./personalInfo";

import { getCookie } from "../../utils/cookie-helper";
import { getCustomerKyc } from "../../services/kyc-service";

import { ACTIVE_KYC_ID } from "../../constants";

const PersonalDetails=()=>{
    const [data,setData]=useState(false)
  useEffect(()=>{
        fetchCustomerKyc();
  },[])
  
  const fetchCustomerKyc= async ()=>{
    const customerKycParams={
      msisdn:getCookie("phoneNumber"),
      kycId: ACTIVE_KYC_ID,
    }
    const {status,data,error}= await getCustomerKyc(customerKycParams)
      if (error) {
        toast.error(error.message)
      }
      else {
        if (data.statusCode === 404) {
            console.log(data.statusCode)
            setData(false)
        }
        else {
          if (status === 200 && data.data) {
            setData(true)
          }
        }
  }
  }
    return (
        <div>
           {data?<PersonalInfo/>:<PersonalInfoEdit/>} 
        </div>
    )
}
export default PersonalDetails;