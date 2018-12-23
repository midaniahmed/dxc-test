import React from "react";

import "./CustomSpinner.scss";

export const CustomSpinner = props => {
  if (!props.isLoading) return null;
  return (
    <div className="CustomSpinner">
      <div className="custom-spinner">
        <div id="custom-spinner-id" />
      </div>
    </div>
  );
};
