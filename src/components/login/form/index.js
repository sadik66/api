import React,{useState,useEffect} from "react"
import { useHistory } from "react-router-dom"

import { saveCookie } from "../../../utils/cookie-helper"
import "./otpform.css"

const LoginForm = () => {
    const history = useHistory()
    const [phoneNumber,setPhoneNumber]=useState()
    const [formError,setFormError]=useState('')
    const [isSubmit,setIsSubmit]=useState(false);

    useEffect(()=>{
        if(formError.length===0 && isSubmit ){
            saveCookie ("phoneNumber", phoneNumber)
            history.push("/otp")    
        }
    },[formError,isSubmit])

    const handleChange=(e)=>{
        setPhoneNumber(e.target.value)
    }

    const handlesubmit=(e)=>{
        e.preventDefault()
        setFormError(validate(phoneNumber))
        setIsSubmit(true)
        
    }

    const validate=(num)=>{
        let error=''
        if(!num){
            error="mandatory";
        }
        else{
            if(num.length<10 || num.length>10){
                error="enter valid 10 digit number"
            }
        }
        return error;
    }

    return (
        <div className=" container">
            <h2>Welcome to YABX</h2>
            <h4>Please enter your number</h4>
            <form onSubmit={handlesubmit}>
                <input type="text" className="form-input margin" onChange={handleChange}/>
                <div className="error-div">{formError.length>0? formError:""}</div>
                <button type="submit" className="btn" >send</button>
            </form>
        </div>
    )
}
export default LoginForm;