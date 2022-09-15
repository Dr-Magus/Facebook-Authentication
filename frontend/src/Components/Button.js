import React from "react";

function Button({ link, label }) {
  return (
    <div className="w-full flex">
      <a href={`http://localhost:8000/${link}`} className="btn w-full">
        {label}
      </a>
    </div>
  );
}

export default Button;
