import React from 'react'
import '../App.css';

const Counter = (props) => {
  return (
    <div className='PlayBox'>
        <div className='counterContainer'>
            <div>Total: {props.count}</div>
            <div>Win : {props.winCount}</div>
            <div>lose : {props.loseCount}</div>
            <div>Draw : {props.drawCount}</div>
        </div>
    </div>
  )
}

export default Counter
