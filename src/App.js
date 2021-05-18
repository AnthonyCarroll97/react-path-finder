import React, { Component } from 'react'
import Buttons from './components/Buttons'
import Grid from './components/Grid'
import Inputs from './components/Inputs'
import './style.css'

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
        blocks: [],
        gameError: ""
      }
    
  }
  // This function will be passed down to the inputs component to get the user input for rows and columns
  getSquares = (userInput) => {
    const totalSquares = parseInt(userInput.rows) * parseInt(userInput.columns)
    const gridInfo = {
      rows: parseInt(userInput.rows),
      columns: parseInt(userInput.columns)
    }
    // Check if a grid has already been created, if so, clear the grid
    if(this.state.totalSquares > 0) this.clearBoard()
    this.setState({totalSquares, gridInfo})
  }
  startSearch = () => {
    return new Promise((resolve, reject) => {
    const que = []
    const visited = Array(this.state.totalSquares).fill(false) 
    const prev = Array(this.state.totalSquares).fill(null)
    const {start, end} = this.state.gridInfo
    const adjList = this.state.adjList

    que.push(start)
    visited[start] = true

    const searchInterval = setInterval(() => {
      const node = que.shift()
        // check neighbours of the current node
        adjList[node].forEach(neighbour => {
            if (!visited[neighbour]) {
                que.push(neighbour)
                visited[neighbour] = true
                prev[neighbour] = node
            }
        })

        this.setState({visited})
        if(que.length === 0){
          console.log("cant get there")
          clearInterval(searchInterval)
          reject()
        }
        if (visited[end]){
            clearInterval(searchInterval)
            resolve({prev, end})
        }
    }, 100)
    })

    
  }
  bfs = () => {
    this.startSearch()
    .then((data) => {
      // find shortest path
      const {prev, end} = data
      const path = Array(1).fill(end)
      let current = end
      while(prev[current] != null){
          path.push(prev[current])
          current = prev[current]
      }
      this.setState({path: path.reverse()})
    })
    .catch(() => {
      this.setState({gameError: "you done fucked it up"})
    })
  }
  
  createAdjList = () => {
    // Convert state into variables to improve readability
    const totalSquares = this.state.totalSquares
    const columns = this.state.gridInfo.columns
    const blocks = this.state.blocks
    // Return from the function if there is no grid or there is no start point
    console.log(this.state, "just before logic gate")
    if(!totalSquares || this.state.gridInfo.start === null) return 
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
    // Update state with adjacency list and begin the search
    this.setState({adjList}, this.bfs)
  }

  // This function executes when the user clicks on a square
  getPosition = (event) => {
    const position = parseInt(event.target.value)
    const gridInfo = this.state.gridInfo

      if(this.state.buttonControls.setStart){
          gridInfo.start = position
          this.setState({gridInfo})
        } else if (this.state.buttonControls.setEnd){
          gridInfo.end = position
          this.setState({gridInfo})
        } else if(this.state.buttonControls.setBlocks){
          let blocks = this.state.blocks
          blocks.push(position)
          this.setState({blocks})
        }
  }
  clearBoard = () => {
    const gridInfo = this.state.gridInfo
    gridInfo.end = null
    gridInfo.start = null
    this.setState({ 
      visited: [],
      path: [],
      blocks: [],
      gridInfo,
      gameError: ""
    })
  }

  handleButton = (event) => {
    // Get the value of the button the user clicked on
    const value = event.target.value
    // Go back to intial state of all false values
    const buttonControls = {
      setStart: false,
      setEnd: false,
      setBlocks: false
    }
    // Update boolean th
    if(value === "start"){buttonControls.setStart = true}
    else if(value === "end"){buttonControls.setEnd = true}
    else if(value === "block"){buttonControls.setBlocks = true}
    this.setState({ buttonControls })
  }

  render() {
    return (
      <div className="main">
        <div className="left-column">
          <h1>React</h1>
          <h1>Path-Finder</h1>
          <p>Portfolio Project by Anthony Carroll</p>
          <Inputs getSquares={this.getSquares} />
          <Buttons 
            handlePress={this.handleButton} 
            buttonControls={this.state.buttonControls}
            startSearch={this.createAdjList}
            clearBoard={this.clearBoard}
          />
        </div>
        <div className="right-column">
          <Grid 
            gridInfo={this.state.gridInfo} 
            totalSquares={this.state.totalSquares} 
            blocks={this.state.blocks}
            onClick={this.getPosition}
            visited={this.state.visited}
            path={this.state.path}
          />
          <p>{this.state.gameError}</p>
        </div>
      </div>
    )
  }
}
