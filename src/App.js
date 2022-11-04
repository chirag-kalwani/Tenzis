import React from "react";
import Die from "./Die.js";
import "./style.css"
import Confetti from 'react-confetti'
export default function App() {

  const [randNumbers, setRandNumbers] = React.useState(allNewDice());
  const [tenzis, setTenzis] = React.useState(false);


  function generateRandomNumber(number = 7) {
    let newNumber = Math.ceil(Math.random() * 6);
    while (newNumber === number)
      newNumber = Math.ceil(Math.random() * 6);
    return newNumber;
  }


  function allNewDice() {
    let ret = [];
    for (let i = 0; i < 10; i++) {
      ret.push(
        {
          value: generateRandomNumber(),
          isHold: false
        });
    }
    return ret;
  }


  function rollDice() {
    setRandNumbers(prevState => prevState.map(ele => (
      ele.isHold ?
        ele :
        {
          ...ele,
          value: generateRandomNumber(ele.value)
        })
    ));
  }


  function handleClick(id) {
    setRandNumbers(prevState => prevState.map((ele, i) => {
      let newEle = ele;
      if (id === i)
        newEle.isHold = !newEle.isHold;
      return newEle;
    })
    )
  }


  function restart() {
    setRandNumbers(allNewDice());
    setTenzis(false);
  }


  React.useEffect(() => {
    const isHold = randNumbers.every(die => die.isHold);
    const firstValue = randNumbers[0].value;
    const allSameValue = randNumbers.every(die => die.value === firstValue);
    setTenzis(isHold && allSameValue);
  }, [randNumbers]);


  return (
    <main>
      {tenzis && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container">
        {
          randNumbers.map((randNumber, i) => (
            <Die
              key={i}
              index={i}
              value={randNumber.value}
              isHold={randNumber.isHold}
              onClick={handleClick}
            />
          ))
        }

      </div>
      {!tenzis && <button onClick={rollDice} className="roll">Roll</button>}
      {tenzis && (
        <>
          <h3> You Won </h3>
          <button onClick={restart} className="roll">Restart Game</button>
        </>
      )}
    </main>
  )
}