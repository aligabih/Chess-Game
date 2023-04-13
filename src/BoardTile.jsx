import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import Piece from "./Piece";
import { useDrop } from "react-dnd";
import { handleMove } from "./Game";
import { gameSubject } from "./Game";
import Promote from "./Promote";
export default function BoardTile({ piece, black, position }) {
  const [promotion, setPromotion] = useState(null);
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split("_");
      handleMove(fromPosition, position);
    },
  });
  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingPromotion }) =>
      pendingPromotion && pendingPromotion.to === position
        ? setPromotion(pendingPromotion)
        : setPromotion(null)
    );
    return () => subscribe.unsubscribe();
  }, [position]);
  return (
    <div className="board-tile" ref={drop}>
      <Tile black={black}>
        {promotion ? (
          <Promote promotion={promotion} />
        ) : piece ? (
          <Piece piece={piece} position={position} />
        ) : null}
      </Tile>
    </div>
  );
}
