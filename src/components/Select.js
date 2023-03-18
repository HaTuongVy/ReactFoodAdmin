import React from "react";

const Select = (props) => {
  const {
    inputRef,
    id,
    label,
    labelSize = 3,
    inputSize,
    lastRow,
    required,
    frmField,
    err,
    errMessage,
    values,
    ...others
  } = props;
  const inputClass = `form-select ${err ? "is-invalid" : ""}`;
  return (
    <div className={`row ${lastRow ? "" : "mb-3"}`}>
      <label
        htmlFor={id}
        className={`col-sm-${labelSize} col-form-label ${
          required ? "required" : ""
        }`}
      >
        {label}
      </label>
      <div className={`col-sm${inputSize ? "-" + inputSize : ""}`}>
        <select {...others} {...frmField} className={inputClass}>
          <option value="">-----</option>
          {values.map((el) => (
            <option key={el.CAT_ID} value={el.CAT_ID}>
              {el.Name}
            </option>
          ))}
        </select>
        {err ? <div className="invalid-feedback">{errMessage}</div> : ""}
      </div>
    </div>
  );
};

export default Select;
