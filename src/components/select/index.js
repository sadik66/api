import React from "react"

import '../../styles/common.css'
const Select = ({ handleChange, values,fieldDisplayName, fieldName ,mandatory,options,showErrors}) => {
    return (
        <div className="personal-form">
            <label>
                {fieldDisplayName} <span className="color-star">{mandatory?"*":""}</span>
            </label>
            <br />
            <div className="select-arrow">
            <select
                className={showErrors[fieldName]===true?"select-field-border":"select-field"}
                name={fieldName}
                value={values[fieldName]?values[fieldName]:""}
                onChange={handleChange}
            >
                <option value="">--select--</option>
                {
                    options && options.map((option)=>{
                        return(
                            <option value={option.value} key={option.value}>{option.display}</option>
                        )
                    })
                }
               
            </select>
            </div>
      </div>
    )
}
export default Select;