import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";

import "./personalInfo.css"
import logo from "../../assets/logo.png"

const PersonalInfo=()=>{
    const history=useHistory();
    const [checkboxToggle,setCheckboxToggle]=useState(true)
    const [details, setDetails] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        dob: '',
        gender: '',
        maritalstatus: '',
        pannumber: '',
        occupation: '',
      });
useEffect(()=>{
    let data=JSON.parse(localStorage.getItem("details"))
    if(data)setDetails(data)
    else setDetails({
        firstname: '---',
        middlename: '---',
        lastname: '---',
        dob: '---',
        gender: '---',
        maritalstatus: '---',
        pannumber: '---',
        occupation: '---',
      })
},[])

const handleCheckBox=(e)=>{
  setCheckboxToggle(!e.target.checked)
}
      return (
        <div className="details-root-body">
          <div className="nav-bar">
            <div className="nav-child"><img src={logo} alt="logo" /></div>
          </div>
    
          <div className="body">
            <div className="order-list">
              <p>loan info</p>
              <p style={{color:"blue"}}>personal info</p>
              <p>address</p>
              <p>documents</p>
              <p>summary</p>
              <p>mandate</p>
              <p>Esign</p>
            </div>
            <div className="tog-list">
            <p>personal info</p>
            </div>
    
            <div className=" details-container">
              <div className="sub-container">
                <div className="edit-button-div">
                    <h2>Personal Details</h2>
                    <button className="edit" onClick={()=>{history.push(`/login/otp/personaldetailsForm/${true}`)}}>Edit</button>
                </div>
                <form className="main-form">
                  <div className="personal-details">
                    <label>First Name</label>
                    <div className="detail-div">{details.lastname}</div>
                  </div>
                  <div className="personal-details">
                    <label>Middle Name</label>
                    <div className="detail-div">{details.middlename}</div>

                  </div>
                  <div className="personal-details">
                    <label>Last Name</label>
                    <div className="detail-div">{details.lastname}</div>

                  </div>
                  <div className="personal-details">
                    <label>Date of Birth</label>
                    <div className="detail-div">{details.dob}</div>

                  </div>
                  <div className="personal-details">
                    <label>Gender</label>
                    <div className="detail-div">{details.gender}</div>
                   
                  </div>
                  <div className="personal-details">
                    <label>Marital Status</label>
                    <div className="detail-div">{details.maritalstatus}</div>

                  </div>
                  <div className="personal-details">
                    <label>PAN Number</label>
                    <div className="detail-div">{details.pannumber}</div>

                  </div>
                  <div className="personal-details">
                    <label>Occupation</label>
                    <div className="detail-div">{details.occupation}</div>

                  </div>
                </form>
                <hr></hr>
                <div>
                   <p className="confirm-msg"><input type="checkbox" className="checkbox" onChange={handleCheckBox}/> I confirm my personal details are correct</p>
                </div>
              </div>
            </div>
    
            <div className="buttons">
              <button className="btn-pre" >Previous</button>
              <button className={checkboxToggle?"btn-dis":"btn-en"} disabled={checkboxToggle} >Continue</button>
            </div>
          </div>
        </div>
      );
    }
export default PersonalInfo;