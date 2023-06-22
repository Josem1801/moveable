import React from "react";
import { forwardRef } from "react";

export const Card = forwardRef(
  ({ children, classNames, id, ...props }, ref) => {
    return (
      <div
        id={id}
        ref={ref}
        {...props}
        className={`m-auto w-4/5 h-4/5   bg-opacity-50 bg-[#ffffff20] bg-blur-lg rounded-lg p-4 ${classNames}`}
      >
        {children}
      </div>
    );
  }
);
