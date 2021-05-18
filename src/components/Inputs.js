import React, { Component } from 'react'
import '../style.css'

export default class Inputs extends Component {
    constructor(props){
        super(props)
        this.state = {
            rows: "",
            columns: "",
            rowError: "",
            columnError: ""
        }
    }
    validateInputs = () => {
        let rowError = ""
        let columnError = ""
        // Check rows
        const rows = parseInt(this.state.rows)
        if(!rows){
            rowError = "Row field is empty"
        } else if (rows > 10 || rows < 3 ){
            rowError = "Please enter a number between 3 and 10"
        }
        // Check columns
        const columns = parseInt(this.state.columns)
        if(!columns){
            columnError = "Column field is empty"
        } else if (columns > 10 || columns < 3){
            columnError = "Please enter a number between 3 and 10"
        }

        if (columnError || rowError){ 
            this.setState({ columnError, rowError }) 
            return false
        }
        return true
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const isValid = this.validateInputs()
        if(isValid){
            this.setState({
                columnError: "",
                rowError: "",
                rows: "",
                columns: ""
            })
            // Pass data back up to the app component
            this.props.getSquares(this.state)
        }
    }
    handleChange = (event) => { 
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <div className="inputs-main">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <input 
                    autoComplete="off"
                    type="number"
                    placeholder="rows"
                    name="rows" 
                    value={this.state.rows} 
                    onChange={this.handleChange}
                    />
                    <div className="error">{this.state.rowError}</div>
                    <input 
                    autoComplete="off"
                    type="number"
                    placeholder="columns"
                    name="columns" 
                    value={this.state.columns} 
                    onChange={this.handleChange}
                    />
                    <div className="error">{this.state.columnError}</div>
                    <button className="hover create-table">Create Table</button>
                </form>
            </div>
        )
    }
}
