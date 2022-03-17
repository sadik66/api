import { getRequest} from "../utils/http-helper";
import { getKycDefinationUrl} from "./urls";

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