import { postRequest} from "../utils/http-helper";
import { LMS_BASE_URL, NEW_TOKEN,GENERATE_OTP,RESET_OTP, VERIFY_OTP} from "./urls";
import { LMS_PARTNER_CODE,LMS_OS, LMS_PACKAGE_ID} from "../constants";

const lmsStandardHeaders = {
    partner_code: LMS_PARTNER_CODE,
    os: LMS_OS,
    package_id: LMS_PACKAGE_ID,
  };
  
export const SaveNewToken= async (data)=>{
    return await postRequest({
        url:NEW_TOKEN,
        data:data,
        noAuth: true,
        headers:lmsStandardHeaders,

    })
}

export const generateOtp= async (data)=>{
    return await postRequest({
        url:GENERATE_OTP,
        data:data,
        headers:lmsStandardHeaders,
        baseUrl:LMS_BASE_URL,
    })
}
export const verifyOtp= async (data)=>{
    return await postRequest({
        url:VERIFY_OTP,
        data:data,
        headers:lmsStandardHeaders,
        baseUrl:LMS_BASE_URL,
    })
}

export const resendOtp= async (data)=>{
    return await postRequest({
        url:RESET_OTP,
        data:data,
        headers:lmsStandardHeaders,
        baseUrl:LMS_BASE_URL,
    })
}