import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { LMS_CLIENT_SECRET,LMS_PARTNER_CODE } from "../../../constants"

import { generateOtp, SaveNewToken } from "../../../services/lms-service"
import { getCookie, saveCookie } from "../../../utils/cookie-helper"
import "./otpform.css"

const LoginForm = () => {
    const history = useHistory()
    const [phoneNumber, setPhoneNumber] = useState()
    const [formError, setFormError] = useState('')
    const [isSubmit, setIsSubmit] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);

    useEffect(() => {
        newToken();
    }, [])
    const newToken = async () => {
        const { status, error, data } = await SaveNewToken({ client_secret: LMS_CLIENT_SECRET });
        if (error) {
            console.log(error)
        } else if (status === 200 && data.status === "success") {
            saveCookie("accessToken", data.access_token)
        }
    }
    useEffect(() => {
        if (formError.length === 0 && isSubmit) {
            saveCookie("phoneNumber", phoneNumber)
            setIsRedirect(true)
        }
    }, [formError, isSubmit])

    useEffect(() => {
        if (isRedirect === true) {
            generateClientOtp();
        }
    }, [isRedirect])

    const handleChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        setFormError(validate(phoneNumber))
        setIsSubmit(true)
    }
    const generateClientOtp = async () => {
        let postData = {
            msisdn: getCookie("phoneNumber"),
            partner_code: LMS_PARTNER_CODE,
            purpose: "customer_verification"
        }
        const { status, data, error } = await generateOtp(postData)
        if(error){
            console.log(error)
        }else if(status===200 && data.status==="success"){
            history.push("/otp")
        }
    }

    const validate = (num) => {
        let error = ''
        if (!num) {
            error = "mandatory";
        }
        else {
            if (num.length < 10 || num.length > 10) {
                error = "enter valid 10 digit number"
            }
        }
        return error;
    }

    return (
        <div className=" container">
            <h2>Welcome to YABX</h2>
            <h4>Please enter your number</h4>
            <form onSubmit={handlesubmit}>
                <input type="text" className="form-input margin" onChange={handleChange} />
                <div className="error-div">{formError.length > 0 ? formError : ""}</div>
                <button type="submit" className="btn" >send</button>
            </form>
        </div>
    )
}
export default LoginForm;