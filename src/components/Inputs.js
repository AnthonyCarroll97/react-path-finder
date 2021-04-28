import React, { Component } from 'react'

export default class Inputs extends Component {
    constructor(props){
        super(props)
        this.state = {
            rows: "",
            columns: ""
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.getSquares(this.state)
        this.setState({rows: "", columns: ""})
    }
    handleChange = (event) => { 
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Rows:
                    </label>
                    <input 
                    type="number"
                    name="rows" 
                    value={this.state.rows} 
                    onChange={this.handleChange}
                    />
                    <label>
                        Columns:
                    </label>
                    <input 
                    type="text"
                    name="columns" 
                    value={this.state.columns} 
                    onChange={this.handleChange}
                    />
                    <button>Create Table</button>
                </form>
            </div>
        )
    }
}
