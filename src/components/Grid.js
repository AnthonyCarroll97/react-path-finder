import React, { Component } from 'react'
import Square from './Square'
import './grid.css'

export default class Grid extends Component {
    constructor(props){
        super(props)
    }
    renderSquares(gridInfo, visited, path,blocks){
        if(gridInfo.rows === 0){return null}
        const squareArray = new Array(this.props.totalSquares)
        

        for(let i = 0; i < this.props.totalSquares; i++){
            var className;
            if (gridInfo.start === i){className = "start-square"}
            else if (gridInfo.end === i){className = "end-square"}
            else if (path.includes(i)){className = "path"}
            else if (visited[i]){className = "visited"}
            else if(blocks.includes(i)){className = "block"}
            else {className = null}

            squareArray.push(<Square className={className} onClick={this.props.onClick} i={i} key={i}/>)
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
                {this.renderSquares(this.props.gridInfo, this.props.visited, this.props.path,this.props.blocks)}
            </div>
        )
    }
}
