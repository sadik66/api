import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";


import Input from "../textInput";
import DateInput from "../dateInput";
import Select from "../select";
import NumberInput from "../numberInput";

import "./personalInfo.css"
import "../../styles/common.css"

import { ACTIVE_KYC_ID } from "../../constants";
import { getCustomerKyc, getKycDefination, submitKyc } from "../../services/kyc-service";
import { getCookie } from "../../utils/cookie-helper";
import { toast } from "react-toastify";

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
  const [versionData, setVersionData] = useState();
  const [response, setResponse] = useState(null);
  const [personalFormValues, setPersonalFormValues] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    marital_status: '',
    pan_number: '',
    occupation: '',
  });
  useEffect(() => {
    fetchPersonalDetails();
    fetchCustomerKyc();
  }, [])

  const fetchCustomerKyc = async () => {
    const customerKycParams = {
      msisdn: getCookie("phoneNumber"),
      kycId: ACTIVE_KYC_ID,
    }
    const { status, data, error } = await getCustomerKyc(customerKycParams)
    if (error) {
      toast.error(error.message)
    }
    else {
      if (status === 200 && data.statusCode === 404) {
        setPersonalFormValues({
          first_name: '',
          middle_name: '',
          last_name: '',
          date_of_birth: '',
          gender: '',
          marital_status: '',
          pan_number: '',
          occupation: '',
        })
      }
      else {
        if (status === 200 && data.data) {
          setPersonalFormValues(data.data.data)
          setResponse(data.data.data)
          setAge(data.data.data.age)
        }
      }
    }

  }

  const fetchPersonalDetails = async () => {
    const { data, status, error } = await getKycDefination(params);
    if (error) {
      console.error(error)
    } else {
      if (status === 200 && data) {
        let response = data.data.packagesDTOs;
    console.log(response)

        let personalInfo = response.find(obj => obj.id === "61d847683fe3296a7c7c40ca");
        console.log(personalInfo)
        const packageDTOs = personalInfo.children;
        const packageTitle = personalInfo.packageTitle;
        const personaldetails = [];
        const showerrors = {};
        let filterpackageDTOs = packageDTOs.filter((s) => {
          if (s.fieldName === "first_name" || s.fieldName === "middle_name" || s.fieldName === "last_name" ||
            s.fieldName === "date_of_birth" || s.fieldName === "gender" || s.fieldName === "marital_status" ||
            s.fieldName === "pan_number" || s.fieldName === "occupation" || s.fieldName === "age") {
            return s
          }
        })
        filterpackageDTOs.map((person) => {
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
        setVersionData(data.data.version)
        setShowErrors(showerrors)
        setPersonalInfoDetails(personaldetails)
        setTitle(packageTitle)
      }
    }


  }

  useEffect(() => {
    setPersonalFormValues({ ...personalFormValues, "age": age });
  }, [age])

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit === true) {
      createKyc(personalFormValues)
      // history.push("/personaldetails")
      history.push({
        pathname: `/personalInfo`, query: personalFormValues
      }
      )
    }
  }, [formErrors, isSubmit]);


  const createKyc = async (personalFormValues) => {
    let postData = {
      kycId: ACTIVE_KYC_ID,
      created_by: getCookie("phoneNumber"),
      data: personalFormValues,
      version: versionData
    }

    const { status, data, error } = await submitKyc(postData);
    if (error) {
      toast.error(error.message)
    } else if (status === 200 && data) {
      console.log("data submit", data)
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

  const handlesubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(personalFormValues));
    setIsSubmit(true)
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
    <div className="body">
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

      <div className="documents-buttons-main-div">
        <div className="documents-buttons">
          <button className="btn-pre" onClick={() => { history.push("/personaldetails") }} disabled={response !== null ? false : true}>Discard Change</button>
          <button className="btn-en" onClick={handlesubmit}>{response !== null ? "Update" : "submit"}</button>
        </div>
      </div>
    </div>

  );
}
export default PersonalInfoEdit;