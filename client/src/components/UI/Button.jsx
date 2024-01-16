import "./Button.scss";

const Button = ({
  type = "button",
  color = "",
  fullWidth = false,
  onClick,
  children,
}) => {
  return (
    <button
      className={`btn btn--${color} ${fullWidth ? "btn--full-width" : ""}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
