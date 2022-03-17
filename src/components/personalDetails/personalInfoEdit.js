import React, { useState, useEffect } from "react"
import { useHistory,/* useParams */ } from "react-router-dom";

import "./personalInfo.css"

import logo from "../../assets/logo.png"
import { ACTIVE_KYC_ID } from "../../constants";
import { getKycDefination } from "../../services/kyc-service";

const PersonalInfoEdit = () => {
  const history = useHistory();
  const params = {
    id: ACTIVE_KYC_ID,
  }
  const [personalInfo,setPersonalInfo]=useState([]);
  const [title,setTitle]=useState('');
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
  useEffect(() => {

    fetchPersonalDetails();

    let data = JSON.parse(localStorage.getItem("details"))
    if (data) setPersonalFormValues(data)
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

  }, [])

  const fetchPersonalDetails = async () => {
    const { data, status, error } = await getKycDefination(params);
    if(error){
      console.error(error)
    }else{
      if(status === 200 && data){
        let response = data.data.packagesDTOs;
        let personalInfo = response.find(obj => obj.packageId === "61d847683fe3296a7c7c40ca");
        const packageDTOs = personalInfo.children;
        const packageTitle = personalInfo.packageTitle;
        const personaldetails = [];
        packageDTOs.map((person) => {
          personaldetails.push({
            fieldName: person.fieldName,
            fieldId: person.fieldId,
            options: person.options,
            multiQuestions: person.multiQuestions,
            validation: person.validation,
            mandatory: person.mandatory,
            editable: person.editable,
            fieldDisplayName: person.fieldDisplayName,
            type: person.type,
          })
        })
        setPersonalInfo(personaldetails)
        setTitle(packageTitle)
      }
    }
    

  }
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalFormValues({ ...personalFormValues, [name]: value });
  };
  const handlesubmit = () => {
    localStorage.setItem("details", JSON.stringify(personalFormValues));
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
          <p style={{ color: "blue" }}>personal info</p>
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
          <button className="btn1" onClick={() => { history.push("/login/otp/personaldetails") }}>Discard Change</button>
          <button className="btn2" onClick={handlesubmit}>Update</button>
        </div>
      </div>
    </div>
  );
}
export default PersonalInfoEdit;