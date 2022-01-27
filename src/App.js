import './App.css';
import Dice from "./components/Dice";
import Die from "./components/Die";
import {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import ReactConfetti from "react-confetti";

function App() {
    const [dice, setDice] = useState(allNewDice);
    const [tenzies, setTenzies] = useState(false);

    useEffect(function () {
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
        }
    }, [dice]);

    const allDice = dice.map(die => <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDie={() => holdDie(die.id)}/>);
    
    function allNewDice() {
        let newDice = [];
        for (let i = 1; i <= 10; i++) {
            let randomNumber = Math.floor((Math.random() * 6) + 1);
            newDice.push({
                value: randomNumber,
                isHeld: false,
                id: nanoid()
            });
        }
        return newDice;
    }

    function handleRollDice() {
        if (tenzies) {
            setDice(allNewDice());
            setTenzies(false);
        } else {
            setDice(oldDice => oldDice.map(oldDie => {
                let randomNumber = Math.floor((Math.random() * 6) + 1);
                return oldDie.isHeld ? oldDie : {
                    value: randomNumber,
                    isHeld: false,
                    id: nanoid(),
                }
            }));
        }
    }

    function holdDie(id) {
        let newDice = [];
        setDice(oldDice => {
            oldDice.forEach(oldDie => {
                if (oldDie.id === id) {
                    newDice.push({...oldDie, isHeld: !oldDie.isHeld})
                } else {
                    newDice.push(oldDie);
                }
            });
            return newDice;
        });
    }
    
    return (
      <main className='container'>
          {
              tenzies && <ReactConfetti />
          }
          <h1 className='title'>Tenzies</h1>
          <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <Dice>
              {allDice}
          </Dice>
          <button className='roll-dice' onClick={handleRollDice}>{tenzies ? 'New Game': 'Roll'}</button>
      </main>
  );
}

export default App;
