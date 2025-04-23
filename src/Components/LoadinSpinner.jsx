import React from "react";

const LoadingSpinner = ({ size = "md" }) => {
  const spinnerSize = size === "sm" ? "spinner-border-sm" : "";
  return (
    <div className={`spinner-border text-primary ${spinnerSize}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
