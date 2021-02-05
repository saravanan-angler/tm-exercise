import React from "react";

function Button(props) {
  const { type, label, className, onClick, disabled } = props;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
