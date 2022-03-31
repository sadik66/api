import React ,{useContext} from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../containers/login";
import SubmitOtp from "../containers/otp";
import PersonalDetails from "../components/personalDetails";
import PersonalInfoEdit from "../components/personalDetails/personalInfoEdit";
import PersonalInfo from "../components/personalDetails/personalInfo";
import Documents from "../components/documents";
import "../styles/common.css"

const RouterComponent = () => {
    return (
        <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={(props) => <Login {...props} />} />
                    <Route exact path="/otp" component={(props) => <SubmitOtp {...props} />} />
                    <Route exact path="/personaldetails" component={(props) => <PersonalDetails {...props} />} />
                    <Route path="/personaldetailsForm" component={(props) => <PersonalInfoEdit {...props} />} />
                    <Route path="/personalInfo" component={(props) => <PersonalInfo {...props} />} />
                    <Route path="/documents" component={(props) => <Documents {...props} />} />
                </Switch>
        </BrowserRouter>
        
    )
}
export default RouterComponent;