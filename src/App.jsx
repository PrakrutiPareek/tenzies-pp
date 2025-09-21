import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function generateAllNewDice() {
    return Array.from({ length: 10 }, () => ({
      isHeld: false,
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (!gameWon) {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      value={dieObj.value}
      key={dieObj.id}
      isHeld={dieObj.isHeld}
      onClick={() => hold(dieObj.id)}
    />
  ));

  return (
    <main>
      {gameWon && (
        <Confetti width={1250} recycle={false} numberOfPieces={2000} />
      )}
      {gameWon && <h2 className="congrats">Congratulations...! You Won!</h2>}

      <section className="main-game">
        <h1 className="title">Tenzies</h1>
        <p className="instruction">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </section>
    </main>
  );
}

export default App;
