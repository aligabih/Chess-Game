import React from "react";
import Tile from "./Tile";
import { move } from "./Game";
const promotionPieces = ["r", "n", "b", "q"];

export default function Promote({ promotion: { from, to, color } }) {
  return (
    <div className="board">
      {promotionPieces.map((p, i) => (
        <div key={i} className="promote-square">
          <Tile black={i % 3 === 0}>
            <div className="piece-box" onClick={() => move(from, to, p)}>
              <img
                src={require(`./assets/${p}_${color}.png`)}
                alt=""
                className="piece cursor-pointer"
              />
            </div>
          </Tile>
        </div>
      ))}
    </div>
  );
}
