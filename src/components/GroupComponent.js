import { useMemo } from "react";
import PropTypes from "prop-types";
import GroupComponent1 from "./GroupComponent1";
import "./GroupComponent.css";

const GroupComponent = ({
  className = "",
  userName = "",
  enterYourPasswordPlaceholder = "",
  value = "",
  onChange,
  type = "text", // Default type
  style = {}, // Combine all style props into one
}) => {
  const groupDivStyle = useMemo(() => ({ ...style }), [style]);

  return (
    <div className={`user-name-parent ${className}`} style={groupDivStyle}>
      <div className="user-name">{userName}</div>
      <GroupComponent1
        enterYourPasswordPlaceholder={enterYourPasswordPlaceholder}
        value={value}
        onChange={onChange}
        type={type} // Pass type to GroupComponent1
      />
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
  userName: PropTypes.string,
  enterYourPasswordPlaceholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.object, // Combined style prop
};

export default GroupComponent;
