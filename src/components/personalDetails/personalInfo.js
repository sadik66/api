import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import "./personalInfo.css"
import "../../styles/common.css"

import { ACTIVE_KYC_ID } from "../../constants";

import { getCustomerKyc } from "../../services/kyc-service";
import { getCookie } from "../../utils/cookie-helper";


const PersonalInfo = () => {
  const history = useHistory();
  const location = useLocation();
  let { query } = location;
  const [checkboxToggle, setCheckboxToggle] = useState(true)
  const [details, setDetails] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    marital_status: '',
    pan_number: '',
    occupation: '',
    age: ''
  });

  const handleCheckBox = (e) => {
    setCheckboxToggle(!e.target.checked)
  }

  useEffect(() => {
    fetchCustomerKyc();
  }, [query])

  const fetchCustomerKyc = async () => {
    const customerKycParams = {
      msisdn: getCookie("phoneNumber"),
      kycId: ACTIVE_KYC_ID,
    }
    const { status, data, error } = await getCustomerKyc(customerKycParams)
    if (error) {
      toast.error(error.message)
    }
    else if (status === 200 && data.data) {
      setDetails(data.data.data)
    }
    else if (data.statusCode === 404) {
      setDetails({
        first_name: '',
        middle_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        marital_status: '',
        pan_number: '',
        occupation: '',
        age: ''
      })
    }
  }
  return (
    <div className="body">
      <div className=" details-container">
        <div className="sub-container">
          <div className="edit-button-div">
            <h2>Personal Details</h2>
            <button className="edit" onClick={() => { history.push(`/personaldetailsForm`) }}>Edit</button>
          </div>
          <div className="main-form">
            <div className="personal-details">
              <label>First Name</label>
              <div className="detail-div">{details.first_name}</div>
            </div>
            <div className="personal-details">
              <label>Middle Name</label>
              <div className="detail-div">{details.middle_name}</div>

            </div>
            <div className="personal-details">
              <label>Last Name</label>
              <div className="detail-div">{details.last_name}</div>

            </div>
            <div className="personal-details">
              <label>Date of Birth</label>
              <div className="detail-div">{details.date_of_birth}</div>

            </div>
            <div className="personal-details">
              <label>Gender</label>
              <div className="detail-div">{details.gender}</div>

            </div>
            <div className="personal-details">
              <label>Marital Status</label>
              <div className="detail-div">{details.marital_status}</div>

            </div>
            <div className="personal-details">
              <label>PAN Number</label>
              <div className="detail-div">{details.pan_number}</div>

            </div>
            <div className="personal-details">
              <label>Occupation</label>
              <div className="detail-div">{details.occupation}</div>

            </div>
            <div className="personal-details">
              <label>Age</label>
              <div className="detail-div">{details.age}</div>

            </div>
          </div>
          <hr></hr>
          <div>
            <p className="confirm-msg"><input type="checkbox" className="checkbox" onChange={handleCheckBox} /> I confirm my personal details are correct</p>
          </div>
        </div>
      </div>

      {/* <div className="buttons">
        <button className="btn-pre" >Previous</button>
        <button className={checkboxToggle ? "btn-dis" : "btn-en"} disabled={checkboxToggle} >Continue</button>
      </div> */}
      <div className="documents-buttons-main-div">
                <div className="documents-buttons">
                    <button className="btn-pre" >Previous</button>
                    <button className={checkboxToggle ? "btn-dis" : "btn-en"} disabled={checkboxToggle} >Continue</button>
                </div>
            </div>
    </div>

  );
}
export default PersonalInfo;