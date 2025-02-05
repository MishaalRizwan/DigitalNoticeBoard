import { useMemo } from "react";
import PropTypes from "prop-types";
import "./GroupComponent1.css";

const GroupComponent1 = ({
  className = "",
  enterYourPasswordPlaceholder = "Enter your password",
  style = {}, // Combine width and color into a style object
  value = "",
  onChange,
  type = "text", // Default type
}) => {
  const inputStyle = useMemo(() => ({ ...style }), [style]);

  return (
    <div className={`group-div ${className}`}>
      <div className="instance-child" />
      <input
        className="enter-your-password"
        placeholder={enterYourPasswordPlaceholder}
        type={type} // Apply type dynamically
        style={inputStyle} // Apply dynamic styles
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

GroupComponent1.propTypes = {
  className: PropTypes.string,
  enterYourPasswordPlaceholder: PropTypes.string,
  style: PropTypes.object, // Combine width and color props into a style object
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

export default GroupComponent1;
