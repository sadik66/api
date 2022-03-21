import { getRequest, postRequest} from "../utils/http-helper";
import { getKycDefinationUrl,KYC_SUBMIT_RESPONSE ,getCustomerKycUrl} from "./urls";

export const getKycDefination= async (params)=>{
    let url=getKycDefinationUrl(params);
    return await getRequest({
        url:url,
        data:{},
        headers:{
                'Content-Type':'application/json',
        },
    });
};

export const submitKyc= async (data)=>{
    return await postRequest({
        url:KYC_SUBMIT_RESPONSE,
        data:data
    })
}

export const getCustomerKyc= async (urlparams)=>{
    let url=getCustomerKycUrl(urlparams);
    return await getRequest({
        url:url,
        data:{},
        headers:{
                'Content-Type':'application/json',
        }
    });
}