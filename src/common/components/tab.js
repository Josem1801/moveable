import React from "react";

export const Tab = ({ isActive, onClick, children }) => {
  return (
    <li className="mr-2">
      <button
        className={
          isActive
            ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
            : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
        }
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};
