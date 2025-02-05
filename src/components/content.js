import PropTypes from "prop-types";
import "./content.css";

const Content = ({ className = "" }) => {
  return (
    <header className={`content1 ${className}`}>
      <div className="content-child" />
      <img
        className="image-1-icon"
        loading="lazy"
        alt=""
        src="/image-1@2x.png"
      />
      <div className="number-panel">
        <a className="numl">NUML</a>
      </div>
    </header>
  );
};

Content.propTypes = {
  className: PropTypes.string,
};

export default Content;
