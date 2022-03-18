import React from "react"
import { useHistory } from "react-router-dom"

import "./otp.css"

const Otp=()=>{
    const history=useHistory();
    const handlesubmit=()=>{
        history.push("/personaldetails")
    }
    return (
        <div className=" container">
            <h2>Welcome Deeraj</h2>
            <h4>A OTP has been sent to-9849128606</h4>
            <form onSubmit={handlesubmit}>
                <input type="text" className="password-input"/>
                <input type="text" className="password-input"/>
                <input type="text" className="password-input"/>
                <input type="text" className="password-input"/>
                <input type="text" className="password-input"/>
                <input type="text" className="password-input"/>
               <div> <p>haven't recieved code yet? Resend-00:23</p></div>
                <button type="submit"  className="btn" >Submit</button>
            </form>
        </div>
    )
}
export default Otp;