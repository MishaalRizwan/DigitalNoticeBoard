import { useMemo } from "react";
import PropTypes from "prop-types";
import "./GroupComponent1.css";

const GroupComponent1 = ({
  className = "",
  enterYourPasswordPlaceholder = "Enter your password",
  style = {},
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
        type={type}
        style={inputStyle}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

GroupComponent1.propTypes = {
  className: PropTypes.string,
  enterYourPasswordPlaceholder: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

export default GroupComponent1;
