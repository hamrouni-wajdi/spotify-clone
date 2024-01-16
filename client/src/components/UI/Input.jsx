import "./Input.scss";

const Input = ({
  type = "text",
  name = "",
  minLength = "",
  maxLength = "",
  placeholder = "",
  required = false,
  onChange = null,
}) => {
  return (
    <input
      className="input"
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
    />
  );
};

export default Input;
