import classNames from "classnames";
import React from "react";
import Button from "react-bootstrap/lib/Button";

import "./CustomButton.scss";

export const CustomButton = props => {
  return (
    <div className="CustomButton">
      <Button
        className={classNames("btn custom-btn display-flex-center", props.className)}
        onClick={props.onClick}
        style={props.style}
      >
        {props.icon && (
          <span className="material-icons icon-button" style={props.labelStyle}>
            {props.icon}
          </span>
        )}
        <span className="button-label">{props.label}</span>
      </Button>
    </div>
  );
};
