import React, { Component } from 'react'
import Square from './Square'

export default class Grid extends Component {
    constructor(props){
        super(props)
    }
    renderSquares(){
        const {gridInfo, totalSquares, blocks, visited, path} = this.props
        if(gridInfo.rows === 0){return null}
        const squareArray = new Array(totalSquares)
        for(let i = 0; i < this.props.totalSquares; i++){
            var className;
            if (gridInfo.start === i){className = "start-square"}
            else if (gridInfo.end === i){className = "end-square"}
            else if (path.includes(i)){className = "path"}
            else if (visited[i]){className = "visited"}
            else if(blocks.includes(i)){className = "block"}
            else {className = null}

            squareArray.push(
                <Square 
                    className={className} 
                    onClick={this.props.onClick} 
                    i={i} 
                    key={i}
                    
                />)
        }
        return squareArray
    }
    render(){
        const squareArray = this.renderSquares()
        const gridStyle = {
            display: "grid",
            gridTemplateRows : `repeat(${this.props.gridInfo.rows}, 60px)`,
            gridTemplateColumns: `repeat(${this.props.gridInfo.columns}, 60px)`,
            background: "#282828",
            borderRadius: "8px"
        }
        if(squareArray) gridStyle.padding = "25px"
        return(
            <div>
                <div style={gridStyle}>
                    {squareArray}
                </div>
            </div>
            
        )
    }
}
