import React from "react"

import PersonalInfoEdit from "./personalInfoEdit";
import PersonalInfo from "./personalInfo";

const PersonalDetails=()=>{
    let data=JSON.parse(localStorage.getItem("details"))

    return (
        <div>
           {data?<PersonalInfo/>:<PersonalInfoEdit/>} 
        </div>
    )
}
export default PersonalDetails;