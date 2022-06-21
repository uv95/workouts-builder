import React from 'react';

function Switch({ text, handleToggle, isChecked }) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text mr-2">{text}</span>
        <input
          onChange={handleToggle}
          type="checkbox"
          className="toggle toggle-primary"
          checked={isChecked}
        />
      </label>
    </div>
  );
}

export default Switch;
