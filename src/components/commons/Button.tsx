interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: "primary" | "secondary" | "secondary-light" | "secondary-outlined" | "primary-light" | "danger-outlined";
}

const Button: React.FC<ButtonProps> = ({ btnType = "primary", children, className, ...rest }) => {
  return (
    <button {...rest} className={`btn ${btnType} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
