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
        end: null,
        
      },
      buttonControls: {
        setStart: false,
        setEnd: false,
        setBlocks: false,
      },
      totalSquares: 0,
      adjList: {},
      visited: [],
      path: [],
      blocks: []
    }
    
  }
  // This function will be passed down to the inputs component to get the user input for rows and columns
  getSquares = (userInput) => {
    const totalSquares = parseInt(userInput.rows) * parseInt(userInput.columns)
    const gridInfo = {
      rows: parseInt(userInput.rows),
      columns: parseInt(userInput.columns)
    }
    this.setState({totalSquares, gridInfo})
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
    const blocks = this.state.blocks
    let adjList = {}
    // Create array of all neighbours for a given square
    for(let i=0; i < totalSquares; i++){
      let adjArray = []
      if((i + 1) % columns !== 0){ adjArray.push(i + 1) }
      if((i < totalSquares - columns)){ adjArray.push(i + columns) }
      if(i % columns !== 0){ adjArray.push(i - 1) }
      if (i > columns - 1 ){ adjArray.push(i - columns) }

      // Remove squares that have blockers on them
      let filteredArray = adjArray.filter(element => {
        if(blocks.includes(element)){
          return false
        }
        return true
      })
      adjList[i] = filteredArray
    }
    console.log(adjList)
    console.log("made the list")
    this.setState({adjList}, this.startSearch)
  }

  getPosition = (event) => {
    const position = parseInt(event.target.value)
    const gridInfo = this.state.gridInfo

      if(this.state.buttonControls.setStart){
          gridInfo.start = position
          this.setState(
            {gridInfo})
        } else if (this.state.buttonControls.setEnd){
          gridInfo.end = position
          this.setState({
            gridInfo,
            setEnd: false
          })
        } else if(this.state.buttonControls.setBlocks){
          let blocks = this.state.blocks
          blocks.push(position)
          this.setState({
            blocks,
            setBlocks: false
          },() => console.log(this.state))
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
    const buttonControls = this.state.buttonControls
    if(value === "start"){
      buttonControls.setStart = true
      this.setState({ buttonControls }, () => {console.log(this.state)})
    }
    if(value === "end"){this.setState((prevState) => ({setEnd: !prevState.setEnd}))}
    if(value === "block"){this.setState((prevState) => ({setBlocks: !prevState.setBlocks}))}
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
        buttonControls={this.state.buttonControls}
        startSearch={this.createAdjList}
        clearBoard={this.clearBoard}
        />
        
      </div>
    )
  }
}
