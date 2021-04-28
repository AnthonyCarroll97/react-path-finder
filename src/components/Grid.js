import React, { Component } from 'react'
import Square from './Square'
import './grid.css'

export default class Grid extends Component {
    
    renderSquare(gridInfo){
        if(gridInfo.rows === 0){return null}
        const squareArray = new Array(this.props.totalSquares)
        for(let i = 0; i < this.props.totalSquares; i++){
            if(gridInfo.start === i){
                squareArray.push(<Square className="start-square" onClick={this.props.onClick} i={i} key={i}></Square>)
            } else if(gridInfo.end === i){
                squareArray.push(<Square className="end-square" onClick={this.props.onClick} i={i} key={i}/>)
            }else {
               squareArray.push(<Square onClick={this.props.onClick} i={i} key={i}/>) 
            }
        }
        return squareArray
           
        
    }
    render(){
        const gridStyle = {
            display: "grid",
            gridTemplateRows : `repeat(${this.props.gridInfo.rows}, 70px)`,
            gridTemplateColumns: `repeat(${this.props.gridInfo.columns}, 70px)`

        }
        return(
            <div style={gridStyle}>
                {this.renderSquare(this.props.gridInfo)}
            </div>
        )
    }
}