import React from "react";

export const Container = ({ children }) => {
  return (
    <main className="w-screen h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      {children}
    </main>
  );
};
