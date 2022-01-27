function Die(props) {
    return <button className={`die ${props.isHeld && 'held'}`} onClick={props.holdDie}>{props.value}</button>
}

export default Die;