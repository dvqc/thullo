interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: "primary" | "secondary" | "secondary-light" | "primary-light";
}

const Button: React.FC<ButtonProps> = ({ btnType = "primary", children, className,...rest }) => {
  return (
    <button {...rest} className={`btn ${btnType} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
