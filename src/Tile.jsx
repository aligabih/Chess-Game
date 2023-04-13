import React from "react";

export default function Tile({ children, black }) {
  const bgClass = black ? "tile-black" : "tile-white";

  return <div className={`${bgClass} board-tile`}>{children}</div>;
}
