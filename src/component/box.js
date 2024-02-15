import React from 'react'
import "../App.css"

const box = (props) => {
    

    return (
    <div className='boxContainer'>
        <h1>{props.title}</h1>
        <img className = "scissors" src={props.item && props.item.img}></img>
        <div className='winnerContainer' style={{backgroundColor:props.color}}>
            <div className= "winnerJudge">{props.result}</div>
        </div>
    </div>

  )
}

export default box

// push 할래
