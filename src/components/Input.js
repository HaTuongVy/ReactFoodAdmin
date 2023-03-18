// import { useEffect, useState } from "react";

const Input = (props) => {
  const {
    id,
    inputRef,
    label,
    labelSize,
    required,
    lastRow,
    frmField,
    errorMessage,
    ...others
  } = props;
  const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label ${
    required ? "required" : ""
  }`;

  const inputClass = `form-control ${errorMessage ? "is-invalid" : ""}`;
  return (
    <div className={`row ${lastRow ? "" : "mb-3"}`}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="col-sm">
        {others["row"] > 1 ? (
          <textarea
            ref={inputRef}
            className={inputClass}
            id={id}
            {...others}
            {...frmField}
          ></textarea>
        ) : (
          <input
            ref={inputRef}
            className={inputClass}
            id={id}
            {...others}
            {...frmField}
          />
        )}
        {errorMessage ? (
          <div className="invalid-feedback">{errorMessage}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Input;
