import GroupComponent2 from "./GroupComponent2";
import PropTypes from "prop-types";
import "./InputFields.css";

const InputFields = ({
  className = "",
  label = "User name",
  placeholder = "Enter your user name",
  value,         // Add value prop
  onChange,      // Add onChange prop
}) => {
  return (
    <div className={`input-fields5 ${className}`}>
      <GroupComponent2
        propPosition="unset"
        propTop="unset"
        propLeft="unset"
        propFlex="1"
        propOverflow="unset"
        propHeight="unset"
        propPadding="unset"
        confrimPassword={label}  // Update the label here
        enterYourPasswordPlaceholder={placeholder}  // Update the placeholder here
        propWidth="200px"
        propColor="#ababab"
        value={value}  // Pass value to GroupComponent2
        onChange={onChange}  // Pass onChange to GroupComponent2
      />
    </div>
  );
};

InputFields.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,  // Add label prop type
  placeholder: PropTypes.string,  // Add placeholder prop type
  value: PropTypes.string,  // Add value prop type
  onChange: PropTypes.func,  // Add onChange prop type
};

export default InputFields;
