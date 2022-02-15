const FieldErrorMessage = ({ fieldErrors, field }) => {
  return (
    <small className="text-danger">
      {fieldErrors && fieldErrors[field] && fieldErrors[field].join(",")}
    </small>
  );
};

export default FieldErrorMessage;
