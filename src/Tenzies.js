import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function Tenzies() {
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const [dices, setDices] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const value = dices[0].value;
    const won = dices.every(
      (dice) => dice.value === value && dice.isHeld === true
    );
    if (won) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dices]);

  function rollDice() {
    if (tenzies) {
      setDices(allNewDice());
      setTenzies(false);
    } else {
      setDices((prevDices) =>
        prevDices.map((dice) => {
          return dice.isHeld ? dice : generateNewDie();
        })
      );
    }
  }

  function holdDice(id) {
    setDices((prevDices) =>
      prevDices.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dices.map((die) => (
    <Die
      value={die.value}
      isHeld={die.isHeld}
      key={die.id}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="main-container">
      <div className="game-container">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="die-container">{diceElements}</div>
        <button className="roll-btn" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
