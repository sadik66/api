import React from "react"

import "../../styles/common.css"

const NumberInput = ({ handleChange, values,fieldDisplayName,  fieldName ,mandatory, showErrors}) => {
    return (
        <div className="personal-form">
            <label>
                {fieldDisplayName} <span className="color-star">{mandatory?"*":""}</span>
            </label>
            <br />
            <input
                className="input-field"
                type="number"
                name={fieldName}
                value={values?values:''}
                onChange={handleChange}
                disabled={true}
            />
        </div>
    )
}
export default NumberInput;