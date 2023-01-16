import React from "react";

export default function Die(props) {
  const { value, isHeld, holdDice } = props;
  return (
    <div className={isHeld ? "die held" : "die"} onClick={holdDice}>
      {value}
    </div>
  );
}
