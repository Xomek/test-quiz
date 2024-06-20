import React from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progressItems = Array.from({ length: totalSteps }, (_, index) => {
    if (index < currentStep) {
      return <div key={index} className="progress-item completed"></div>;
    } else if (index === currentStep) {
      return <div key={index} className="progress-item current"></div>;
    } else {
      return <div key={index} className="progress-item"></div>;
    }
  });

  return <div className="progress-bar">{progressItems}</div>;
};

export default ProgressBar;
