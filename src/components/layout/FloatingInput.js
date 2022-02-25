import { Fragment } from "react";

const FloatingInput = (props) => {
  const errors = props.fieldErrors ? props.fieldErrors[props.field] : null;

  let content = null;

  if (errors) {
    const listContent = errors.map((message, index) => (
      <li key={index}>
        <small className="text-danger">{message}</small>
      </li>
    ));
    content = <ul className="p-0 m-0" style={{listStyle: "none"}}>{listContent}</ul>;
  }

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
          {content && content}

      </small>
    </Fragment>
  );
};

export default FloatingInput;
