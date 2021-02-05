import React from "react";

function Checkbox(props) {
  const { name, label, checked, onChange, required } = props;

  return (
    <label className="check-box-label">
      <input className="checkbox" type="checkbox" />
      Remember me?
    </label>
  );
}

export default Checkbox;
