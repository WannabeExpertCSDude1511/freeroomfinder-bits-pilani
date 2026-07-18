"use client";
//import { useState } from "react";

type ResultsButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

export default function ResultsButton({
  onClick,
  disabled,
}: ResultsButtonProps) {
  console.log("ResultsButton disabled:", disabled);

  return (
    <button className="btn btn-primary" onClick={onClick} disabled={disabled}>
      Results
    </button>
  );
}
