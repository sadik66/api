import React from "react"

const Input = ({ handleChange, values, fieldDisplayName, fieldName, mandatory, showErrors }) => {
    return (
        <div className="personal-form">
            <label>
                {fieldDisplayName} <span className="color-star">{mandatory ? "*" : ""}</span>
            </label>
            <br />
            <input
                className={showErrors[fieldName] ? "input-field-border" : "input-field"}
                type="text"
                name={fieldName}
                value={values[fieldName] ? values[fieldName] : ""}
                onChange={handleChange}
            />
        </div>
    )
}
export default Input;