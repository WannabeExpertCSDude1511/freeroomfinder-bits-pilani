"use client";
//import { useState } from "react";
"use client";

type ResultsButtonProps = {
  onClick: () => void;
};

export default function ResultsButton({ onClick }: ResultsButtonProps) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Results
    </button>
  );
}
