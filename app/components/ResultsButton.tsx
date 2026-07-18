"use client";
//import { useState } from "react";

type ResultsButtonProps = {
  onClick: () => void;
  disabled: boolean;
  hasSearched: boolean;
};

export default function ResultsButton({
  onClick,
  disabled,
  hasSearched,
}: ResultsButtonProps) {
  console.log("ResultsButton disabled:", disabled);

  return (
    <button
      className={`btn ${hasSearched ? "btn-success" : "btn-error"}`}
      onClick={onClick}
      disabled={disabled}
    >
      Results
    </button>
  );
}
