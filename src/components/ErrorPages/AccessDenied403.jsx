import React from "react";
import "./AccessDenied403.css";
// If you put your image in public/images/figures.png use this path:
const FIGURE_SRC = "/Error_403.png"

export default function AccessDenied403() {
  return (
    <div className="forbidden-page">
      <div className="forbidden-inner">
        <h1 className="code">403</h1>
        <p className="subtitle">This is a forbidden area.</p>

        <div className="figure-wrap" aria-hidden>
          <img src={FIGURE_SRC} alt="" className="figure-image" />
          <div className="ground-shadow" />
        </div>
      </div>
    </div>
  );
}
