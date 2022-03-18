import React, { useState, useEffect } from "react"
import { useHistory,/* useParams */ } from "react-router-dom";

import Input from "../textInput";
import DateInput from "../dateInput";
import Select from "../select";
import NumberInput from "../numberInput";

import "./personalInfo.css"

import logo from "../../assets/logo.png"

import { ACTIVE_KYC_ID } from "../../constants";
import { getKycDefination } from "../../services/kyc-service";

const PersonalInfoEdit = () => {
  const history = useHistory();
  const params = {
    id: ACTIVE_KYC_ID,
  }
  const [personalInfoDetails, setPersonalInfoDetails] = useState([]);
  const [formErrors, setFormErrors] = useState({})
  const [showErrors, setShowErrors] = useState({})
  const [title, setTitle] = useState('');
  const [age, setAge] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

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
    if (error) {
      console.error(error)
    } else {
      if (status === 200 && data) {
        let response = data.data.packagesDTOs;
        let personalInfo = response.find(obj => obj.packageId === "61d847683fe3296a7c7c40ca");
        const packageDTOs = personalInfo.children;
        const packageTitle = personalInfo.packageTitle;
        const personaldetails = [];
        const showerrors = {};
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
          showerrors[person.fieldName] = false;
        })
        setShowErrors(showerrors)
        setPersonalInfoDetails(personaldetails)
        setTitle(packageTitle)
      }
    }


  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalFormValues({ ...personalFormValues, [name]: value });

    if (name === "date_of_birth") {
      let calculatedAge = new Date().getFullYear() - new Date(value).getFullYear()
      setAge(calculatedAge)
    }

    setShowErrors({
      ...showErrors, [name]: false
    })

  };

  useEffect(() => {
    setPersonalFormValues({ ...personalFormValues, [age]: age });
  }, [age])

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      history.push("/personaldetails")
    }
  }, [formErrors]);

  const handlesubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(personalFormValues));
    setIsSubmit(true)
    //localStorage.setItem("details", JSON.stringify(personalFormValues));
    // if(!formErrors){history.push("/personaldetails")}
  }

  const validate = (formValues) => {
    let errors = {};
    personalInfoDetails && personalInfoDetails.map((val) => {
      let { mandatory, fieldName, fieldDisplayName, validation } = val;
      if (mandatory) {
        if (!formValues[fieldName]) {
          setShowErrors({
            ...showErrors, [fieldName]: true
          })
          errors[fieldName] = `${fieldDisplayName} mandatory field`
        }
      }
      if (mandatory && validation && formValues[fieldName] !== undefined) {
        const testRegEx = new RegExp(validation);
        if (!testRegEx.test(formValues[fieldName])) {
          setShowErrors({
            ...showErrors, [fieldName]: true
          })
          errors[fieldName] = `${validation} contain these all`
        }
      }
      if (formValues[age] < 20) {
        errors.age = "You should be 20 years and above to apply for loan "
        setShowErrors({
          ...showErrors, "date_of_birth": true
        })
      }
    })
    return errors;
  }

  let errorValues = Object.values(formErrors)
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
              {
                personalInfoDetails && personalInfoDetails.map((person) => {
                  switch (person.type) {
                    case "TEXT":
                      return (
                        <div key={person.fieldName}>
                          <Input
                            handleChange={handleChange}
                            fieldDisplayName={person.fieldDisplayName}
                            values={personalFormValues}
                            fieldName={person.fieldName}
                            mandatory={person.mandatory}
                            showErrors={showErrors}
                          />
                        </div>
                      );
                    case "CALENDAR":
                      return (
                        <div key={person.fieldName}>
                          <DateInput
                            handleChange={handleChange}
                            fieldDisplayName={person.fieldDisplayName}
                            values={personalFormValues}
                            fieldName={person.fieldName}
                            mandatory={person.mandatory}
                            showErrors={showErrors}
                          />

                        </div>
                      );
                    case "NUMBER":
                      return (
                        <div key={person.fieldName}>
                          <NumberInput
                            handleChange={handleChange}
                            fieldDisplayName={person.fieldDisplayName}
                            values={age}
                            fieldName={person.fieldName}
                            mandatory={person.mandatory}
                            showErrors={showErrors}

                          />

                        </div>
                      );
                    case "RADIO":
                      return (
                        <div key={person.fieldName}>
                          <Select
                            handleChange={handleChange}
                            fieldDisplayName={person.fieldDisplayName}
                            values={personalFormValues}
                            fieldName={person.fieldName}
                            options={person.options}
                            mandatory={person.mandatory}
                            showErrors={showErrors}
                          />
                        </div>
                      );
                    default:
                      break;
                  }
                })
              }
            </form>
            <div className={Object.keys(formErrors).length !== 0 ? "show" : "hide"}>
              {
                errorValues && errorValues.map((error, i) => {
                  if (i === 0) return (<span>{error} </span>)
                })
              }
            </div>
          </div>
        </div>

        <div className="buttons">
          <button className="btn1" onClick={() => { history.push("/personaldetails") }}>Discard Change</button>
          <button className="btn2" onClick={handlesubmit}>Update</button>
        </div>
      </div>
    </div>
  );
}
export default PersonalInfoEdit;