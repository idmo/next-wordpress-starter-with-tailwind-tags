const Button = ({ children, className, ...rest }) => {
  return <button {...rest}>{children}</button>;
};

export default Button;
