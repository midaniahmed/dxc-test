import React from "react";
import "./CustomCard.scss";

export const CustomCard = props => {
  return (
    <div className="CustomCard">
      <div className="card">
        <div className="card-body">
          <div className="card-title display-flex-between">
            <div className="card-title">{props.title}</div>
            <div className="card-date">{props.time}</div>
          </div>
          <hr className="divider" />
          {props.children}
        </div>
      </div>
    </div>
  );
};
