import { Fragment } from "react";

const FloatingInput = (props) => {
  return (
    <Fragment>
      <input
        className={`form-control ${
          props.fieldErrors && props.fieldErrors[props.field]
            ? "is-invalid"
            : ""
        }`}
        {...props.input}
      />
      <label htmlFor={props.input.id}>{props.label}</label>
      <small className="text-danger">
        {props.fieldErrors &&
          props.fieldErrors[props.field] &&
          props.fieldErrors[props.field].join(",")}
      </small>
    </Fragment>
  );
};

export default FloatingInput;
