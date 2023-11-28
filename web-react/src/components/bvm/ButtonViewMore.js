import React from 'react';
import './ButtonViewMore.css';

const ButtonViewMore = ({ onClick }) => {
    return (
      <div className="button">
        <button type="button" onClick={onClick}>
          View More
        </button>
      </div>
    );
  };

export default ButtonViewMore;
