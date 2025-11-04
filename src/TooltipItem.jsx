import React from "react";

const TooltipItem = ({ imgSrc, imgAlt, title, description, buttonText, buttonHref,theme }) => {
  return (
    <div className={`tooltip cursor-pointer`}>
      <div className="tooltip-content p-0">
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img src={imgSrc} alt={imgAlt}/>
          </figure>
          <div className="card-body text-base-content">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <button className="btn">
        <a href={buttonHref} target="_blank" rel="noopener noreferrer">
          {buttonText}
        </a>
      </button>
    </div>
  );
};

export default TooltipItem;
