interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ color, children, ...rest }) => {
  return (
    <button {...rest} className={``}>
      {children}
    </button>
  );
};

export default Button;
