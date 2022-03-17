import { BrowserRouter,Switch,Route } from "react-router-dom";

import Login from "../containers/login";
import SubmitOtp from "../containers/otp";
import PersonalDetails from "../components/personalDetails";
import PersonalInfoEdit from "../components/personalDetails/personalInfoEdit";

const RouterComponent=()=>{
    return (
             <BrowserRouter>
                <Switch>
                <Route exact path="/" component={(props) => <Login {...props} />} />
                <Route exact path="/login/otp" component={(props) => <SubmitOtp {...props} />}/>
                <Route exact path="/login/otp/personaldetailsForm/:toggle" component={(props) => <PersonalInfoEdit {...props} />}/>
                <Route exact path="/login/otp/personaldetails" component={(props) => <PersonalDetails {...props} />}/>
                </Switch>
             </BrowserRouter>   
    )
}
export default RouterComponent;