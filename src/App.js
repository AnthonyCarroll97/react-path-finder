import React, { Component } from 'react'
import Buttons from './components/Buttons'
import Grid from './components/Grid'
import Inputs from './components/Inputs'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      gridInfo: {
        rows: 0,
        columns: 0,
        start: null,
        end: null
      },
      totalSquares: 0,
      adjList: {},
      setStart: false,
      setEnd: false,
      visited: [],
      path: []
    }
    
  }
  // This function will be passed down to the inputs component to get the user input for rows and columns
  getSquares = (userInput) => {
    const totalSquares = parseInt(userInput.rows) * parseInt(userInput.columns)
    const gridInfo = {
      rows: parseInt(userInput.rows),
      columns: parseInt(userInput.columns)
    }
    this.setState({totalSquares, gridInfo}, this.createAdjList)
  }
  startSearch = () => {
    const que = []
    const visited = Array(this.state.totalSquares).fill(false) 
    const prev = Array(this.state.totalSquares).fill(null)
    const start = this.state.gridInfo.start
    const end = this.state.gridInfo.end
    const adjList = this.state.adjList

    que.push(start)
    visited[start] = true

    const searchPromise = new Promise((resolve, reject) => {
      const searchInterval = setInterval(() => {
        const node = que.shift()
          // check neighbours of the current node
          adjList[node].forEach(neighbour => {
              if (!visited[neighbour]) {
                  que.push(neighbour)
                  visited[neighbour] = true
                  prev[neighbour] = node
                  // colour visited nodes
                  
              }
          })

          this.setState({visited})
          if (visited[end] === true){
              clearInterval(searchInterval)
              resolve()
          }
      }, 500)
    })

    searchPromise.then(() => {
      // find shortest path
      const path = Array(1).fill(end)
      let current = end
      while(prev[current] != null){
          path.push(prev[current])
          current = prev[current]
      }
      this.setState({path: path.reverse()})
    })
  }

  
  createAdjList = () => {
    // Convert state into variables to improve readability
    const columns = this.state.gridInfo.columns
    const totalSquares = this.state.totalSquares
    let adjList = {}
    
    for(let i=0; i < totalSquares; i++){
      let adjArray = []
      if((i + 1) % columns !== 0){ adjArray.push(i + 1) }
      if((i < totalSquares - columns)){ adjArray.push(i + columns) }
      if(i % columns !== 0){ adjArray.push(i - 1) }
      if (i > columns - 1 ){ adjArray.push(i - columns) }

      adjList[i] = adjArray
    }
    console.log(adjList)
    this.setState({adjList})
  }

  getPosition = (event) => {
    const position = parseInt(event.target.value)
    const gridInfo = this.state.gridInfo

      if(this.state.setStart){
          gridInfo.start = position
          this.setState(
            {gridInfo,
            setStart: false
            }, () => {
              console.log(this.state)
            })
        } else if (this.state.setEnd){
          gridInfo.end = position
          this.setState(
            {gridInfo,
            setEnd: false
            
            }, () => {
            console.log(this.state)
          })
      }
  }
  clearBoard = () => {
    const gridInfo = this.state.gridInfo
    gridInfo.end = null
    gridInfo.start = null
    this.setState({visited: [],path: []})
  }

  handleButton = (event) => {
    const value = event.target.value
    if(value === "start"){this.setState((prevState) => ({setStart: !prevState.setStart}))}
    if(value === "end"){this.setState((prevState) => ({setEnd: !prevState.setEnd}))}
  }

  render() {
    return (
      <div>
        <Inputs getSquares={this.getSquares} />
        <Grid 
        gridInfo={this.state.gridInfo} 
        totalSquares={this.state.totalSquares} 
        onClick={this.getPosition}
        visited={this.state.visited}
        path={this.state.path}
        />
        <Buttons 
        handlePress={this.handleButton} 
        setStart={this.state.setStart}
        setEnd={this.state.setEnd}
        startSearch={this.startSearch}
        clearBoard={this.clearBoard}
        />
        
      </div>
    )
  }
}
