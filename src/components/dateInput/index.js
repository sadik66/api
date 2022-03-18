import React from "react"

import moment from "moment";

import "../../styles/common.css"

const DateInput = ({ handleChange, values, fieldDisplayName, fieldName, mandatory, showErrors }) => {
    return (
        <div className="personal-form">
            <label>
                {fieldDisplayName} <span className="color-star">{mandatory ? "*" : ""}</span>
            </label>
            <br />
            <input
                className={showErrors[fieldName]?"input-field-border":"input-field"}
                type="date"
                name={fieldName}
                value={values[fieldName] ? values[fieldName] : ""}
                onChange={handleChange}
                max={moment().format("YYYY-MM-DD")}
            /* max="2002-03-12" */
            />
        </div>
    )
}
export default DateInput;