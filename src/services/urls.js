import { attachParams } from "./helper";

// ALL API'S

export const KYC_BASE_URL = 'https://kyc.yabx.co';

export const GET_KYC_DEFINATION = `${KYC_BASE_URL}/kyc2/get`;

export const KYC_SUBMIT_RESPONSE = `${KYC_BASE_URL}/kyc2/kycFieldResponse`;

export const GET_KYC_RESPONSE_BODY = `${KYC_BASE_URL}/kyc2/kycResponseBody`

export const getKycDefinationUrl=(params=null)=>{
    let url=`${GET_KYC_DEFINATION }`;
    if(params){
        return attachParams(url,params);
    }
}