"use client";

import React from "react";

export default function DeleteButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!confirm("¿Eliminar esta iglesia?")) e.preventDefault();
  };

  return (
    <button
      type="submit"
      onClick={handleClick}
      className="text-red-600 underline hover:text-red-800"
    >
      Eliminar
    </button>
  );
}
