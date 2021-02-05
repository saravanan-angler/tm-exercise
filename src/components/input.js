import React from "react";

function Input(props) {
  const { name, type, value, onChange, required, className } = props;

  return (
    <input
      name={name}
      value={value}
      type={type}
      className={className}
      onChange={onChange}
      required={required}
    />
  );
}

export default Input;
