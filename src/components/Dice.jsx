import Die from "./Die";

function Dice(props) {
    return (
      <div className='dice'>
          {
              props.children
          }
      </div>
    );
}

export default Dice;