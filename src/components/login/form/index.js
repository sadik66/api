import React from "react"
import { useHistory } from "react-router-dom"
import "./otpform.css"
const LoginForm = () => {
    const history = useHistory()
    return (

        <div className=" container">
            <h2>Welcome to YABX</h2>
            <h4>Please enter your number</h4>
            <form onSubmit={()=>{history.push("/login/otp")}}>
                <input type="text" className="form-input margin"/>
                <button type="submit"  className="btn">send</button>
            </form>
        </div>

       /*  <div className="col-sm-12 col-md-12 col-xs-12 ">
            <div className="row main-form">
                <div className="sub-form">
                    <h2>Wellcome to YABX</h2>
                    <h4>Please enter your mobile number</h4>
                    <form  >
                        <div className="form-group">
                            <input
                                type="text"
                                name="mobilenumber"
                            />
                        </div>

                        <div className="form-group">
                             <input type="submit" value="Send OTP" className="btn" /> 
                            <button className="btn btn-primary" type="submit">Send OTP</button>
                        </div>
                    </form>
                </div>
            </div>
        </div> */
    )
}
export default LoginForm;