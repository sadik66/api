import React,{useState,useEffect} from "react"
import { useHistory,/* useParams */ } from "react-router-dom";

import "./personalInfo.css"
import logo from "../../assets/logo.png"

const PersonalInfoEdit=()=>{
    /* const toggle=useParams(); */
    const history=useHistory();
    /* const [tog,setTog]=useState(false) */
    const [personalFormValues, setPersonalFormValues] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        dob: '',
        gender: '',
        maritalstatus: '',
        pannumber: '',
        occupation: '',
      });
      /* useEffect(()=>{
        setTog(toggle)
      },[toggle]) */
      useEffect(()=>{
        
          let data=JSON.parse(localStorage.getItem("details"))
          if(data)setPersonalFormValues(data)
           else setPersonalFormValues({
            firstname: '',
            middlename: '',
            lastname: '',
            dob: '',
            gender: '',
            maritalstatus: '',
            pannumber: '',
            occupation: '',
          })
        
    },[])
      const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalFormValues({ ...personalFormValues, [name]: value });
      };
      const handlesubmit=()=>{
          localStorage.setItem("details",JSON.stringify(personalFormValues));
          history.push("/login/otp/personaldetails")
      }
      return (
        <div className="root-body">
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
    
            <div className=" form-container">
              <div className="sub-container">
                <h2>Personal Info</h2>
                <form className="main-form" >
                  <div className="personal-form">
                    <label>First Name</label>
                    <br />
                    <input
                      type="text"
                      name="firstname"
                      value={personalFormValues.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="personal-form">
                    <label>Middle Name</label>
                    <br />
                    <input
                      type="text"
                      name="middlename"
                      value={personalFormValues.middlename}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="personal-form">
                    <label>Last Name</label>
                    <br />
                    <input
                      type="text"
                      name="lastname"
                      value={personalFormValues.lastname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="personal-form">
                    <label>Date of Birth</label>
                    <br />
                    <input
                      type="date"
                      name="dob"
                      value={personalFormValues.dob}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="personal-form">
                    <label>Gender</label>
                    <br />
                    <div className="select-arrow">
                      <select
                        name="gender"
                        value={personalFormValues.gender}
                        onChange={handleChange}
                      >
                        <option value="">--select--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="personal-form">
                    <label>Marital Status</label>
                    <br />
                    <div className="select-arrow">
                      <select
                        name="maritalstatus"
                        value={personalFormValues.maritalstatus}
                        onChange={handleChange}
                      >
                        <option value="">--select--</option>
                        <option value="married">Married</option>
                        <option value="Unmarried">Unmarried</option>
                      </select>
                    </div>
                  </div>
                  <div className="personal-form">
                    <label>PAN Number</label>
                    <br />
                    <input
                      type="text"
                      name="pannumber"
                      value={personalFormValues.pannumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="personal-form">
                    <label>Occupation</label>
                    <br />
                    <div className="select-arrow">
                      <select
                        name="occupation"
                        className="form-select"
                        value={personalFormValues.occupation}
                        onChange={handleChange}
                      >
                        <option value="">--select--</option>
                        <option value="software">SoftWare</option>
                        <option value="hardware">HardWare</option>
                        <option value="former">Former</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
    
            <div className="buttons">
              <button className="btn1" onClick={()=>{history.push("/login/otp/personaldetails")}}>Discard Change</button>
              <button className="btn2" onClick={handlesubmit}>Update</button>
            </div>
          </div>
        </div>
      );
    }
export default PersonalInfoEdit;