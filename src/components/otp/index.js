import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import "./otp.css"

import { getCookie } from "../../utils/cookie-helper"
import { LMS_PARTNER_CODE } from "../../constants"
import { verifyOtp, resendOtp } from "../../services/lms-service"

const Otp = () => {
    let emptyOtps = {
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
        six: "",
    }
    const history = useHistory();
    const [otpS, setOtpS] = useState(emptyOtps)
    const [otp, setOtp] = useState()
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        if (isSubmit === true && otp) {
            otpVerification()
            setOtpS(emptyOtps)

        }
    }, [otp, isSubmit])

    const otpVerification = async () => {
        let postData = {
            msisdn: getCookie("phoneNumber"),
            partner_code: LMS_PARTNER_CODE,
            purpose: "customer_verification",
            otp: otp
        }
        console.log(postData)
        const { data, status, error } = await verifyOtp(postData);
        console.log(data, status, error)
        if (error) {
            console.error(error)
        } else if (status === 200 && data.status === "success") {
            history.push("/personaldetails")
        }
    }

    const handleResendOtp = async () => {
        setOtpS(emptyOtps)
        let postData = {
            msisdn: getCookie("phoneNumber"),
            partner_code: LMS_PARTNER_CODE,
            purpose: "customer_verification",
        }
        console.log(postData)
        const { data, status, error } = await resendOtp(postData);
        console.log(data, status, error)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setOtpS({ ...otpS, [name]: value })
    }
    const handlesubmit = (e) => {
        e.preventDefault()
        let strNumber = "";
        strNumber = strNumber + otpS.one + otpS.two + otpS.three + otpS.four + otpS.five + otpS.six;
        if (!isNaN(strNumber)) {
            setOtp(strNumber)
            setIsSubmit(true)
        }
        else {
            alert("please enter valid otp")
        }
    }

    return (
        <div className=" container">
            <h2>Welcome Deeraj</h2>
            <h4>A OTP has been sent to-{getCookie("phoneNumber")}</h4>
            <form onSubmit={handlesubmit}>
                <input type="text" className="password-input" name="one" maxLength="1" onChange={handleChange} value={otpS ? otpS.one : ''} />
                <input type="text" className="password-input" name="two" maxLength="1" onChange={handleChange} value={otpS ? otpS.two : ''} />
                <input type="text" className="password-input" name="three" maxLength="1" onChange={handleChange} value={otpS ? otpS.three : ''} />
                <input type="text" className="password-input" name="four" maxLength="1" onChange={handleChange} value={otpS ? otpS.four : ''} />
                <input type="text" className="password-input" name="five" maxLength="1" onChange={handleChange} value={otpS ? otpS.five : ''} />
                <input type="text" className="password-input" name="six" maxLength="1" onChange={handleChange} value={otpS ? otpS.six : ''} />
                <div> <p>haven't recieved code yet? <span className="resend" onClick={handleResendOtp}>Resend</span>-00:23</p></div>
                <button type="submit" className="btn" >Submit</button>
            </form>
        </div>
    )
}
export default Otp;