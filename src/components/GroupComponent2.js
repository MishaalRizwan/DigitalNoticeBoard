import { useMemo } from "react";
import GroupComponent1 from "./GroupComponent1";
import PropTypes from "prop-types";
import "./GroupComponent2.css";

const GroupComponent2 = ({
  className = "",
  propPosition,
  propTop,
  propLeft,
  propFlex,
  propOverflow,
  propHeight,
  propPadding,
  confrimPassword,
  enterYourPasswordPlaceholder,
  propWidth,
  propColor,
  value,           // Add value prop
  onChange,        // Add onChange prop
}) => {
  const groupDiv1Style = useMemo(() => {
    return {
      position: propPosition,
      top: propTop,
      left: propLeft,
      flex: propFlex,
      overflow: propOverflow,
      height: propHeight,
      padding: propPadding,
    };
  }, [
    propPosition,
    propTop,
    propLeft,
    propFlex,
    propOverflow,
    propHeight,
    propPadding,
  ]);

  return (
    <div
      className={`confrim-password-parent ${className}`}
      style={groupDiv1Style}
    >
      <div className="confrim-password">{confrimPassword}</div>
      <GroupComponent1
        enterYourPasswordPlaceholder={enterYourPasswordPlaceholder}
        propWidth={propWidth}
        propColor={propColor}
        value={value}   // Pass value to GroupComponent1
        onChange={onChange}  // Pass onChange to GroupComponent1
      />
    </div>
  );
};

GroupComponent2.propTypes = {
  className: PropTypes.string,
  confrimPassword: PropTypes.string,
  enterYourPasswordPlaceholder: PropTypes.string,
  propWidth: PropTypes.string,
  propColor: PropTypes.string,

  /** Style props */
  propPosition: PropTypes.any,
  propTop: PropTypes.any,
  propLeft: PropTypes.any,
  propFlex: PropTypes.any,
  propOverflow: PropTypes.any,
  propHeight: PropTypes.any,
  propPadding: PropTypes.any,

  /** Value and onChange props */
  value: PropTypes.string,  // Add value prop type
  onChange: PropTypes.func,  // Add onChange prop type
};

export default GroupComponent2;
