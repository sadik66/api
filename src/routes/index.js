import React ,{useContext} from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../containers/login";
import SubmitOtp from "../containers/otp";
import PersonalDetails from "../components/personalDetails";
import PersonalInfoEdit from "../components/personalDetails/personalInfoEdit";
import PersonalInfo from "../components/personalDetails/personalInfo";
import Documents from "../components/documents";
import Stepper from "../components/stepper";
import { Mycontext } from "../components/context";

import "../styles/common.css"

import logo from "../assets/logo.png"

const RouterComponent = () => {
    const { title,count ,percentage}=useContext(Mycontext)

    return (

        <BrowserRouter>

            <div className="root-body">
                <div className="nav-bar">
                    <div className="nav-child"><img src={logo} alt="logo" /></div>
                </div>
                <div className="stepper-center">
                    <div className='order-list '>
                        <Stepper></Stepper>
                    </div>
                    <div className="tog-list">
                        <div className="mobile-stepper">
                            <div className="title">{title}</div>
                            <div className="title">{`${count}/7`}</div>
                        </div>
                        <div className="mobile-empty-div">
                            <div style={{width:`${percentage}`, height:"4px",backgroundColor:"red" ,borderRadius:"6px"}}></div>
                            
                        </div>
                    </div>
                </div>
                <Switch>
                    <Route exact path="/" component={(props) => <Login {...props} />} />
                    <Route exact path="/otp" component={(props) => <SubmitOtp {...props} />} />
                    <Route exact path="/personaldetails" component={(props) => <PersonalDetails {...props} />} />
                    <Route path="/personaldetailsForm" component={(props) => <PersonalInfoEdit {...props} />} />
                    <Route path="/personalInfo" component={(props) => <PersonalInfo {...props} />} />
                    <Route path="/documents" component={(props) => <Documents {...props} />} />
                </Switch>
            </div>
        </BrowserRouter>
        
    )
}
export default RouterComponent;