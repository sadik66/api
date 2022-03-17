import LoginForm from "../../components/login/form";

import "../../styles/common.css"

const Login=()=>{
    return (
              <div className="login-body">
                   <LoginForm/> 
              </div>
       /*  <div>
       { <div className="flex">
          <div className="side-component"> }
            <div className="container side-component">
                <div className="row">
                  <OtpLogo/>
                  <OtpForm/>
                </div>
            </div>
       {   </div>
        </div>}
      </div> */
    )
}
export default Login;