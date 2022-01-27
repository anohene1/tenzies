import './App.css';
import Dice from "./components/Dice";
import Die from "./components/Die";
import {useState} from "react";
import {nanoid} from "nanoid";

function App() {
    const [dice, setDice] = useState(allNewDice);
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
        setDice(oldDice => oldDice.map(oldDie => {
            let randomNumber = Math.floor((Math.random() * 6) + 1);
            return oldDie.isHeld ? oldDie : {value: randomNumber, isHeld: false, id: nanoid()}
        }));
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
          <Dice>
              {allDice}
          </Dice>
          <button className='roll-dice' onClick={handleRollDice}>Roll</button>
      </main>
  );
}

export default App;
