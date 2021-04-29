import React, { Component } from 'react'
import './Buttons.css'

export default class Buttons extends Component {
    
    render() {
        
        return (
            <div>
                <button 
                onClick={this.props.handlePress}
                value="start"
                className={this.props.setStart ? "start-active" : null}
                >
                Start
                </button>
                
                <button 
                onClick={this.props.handlePress}
                value="end"
                className={this.props.setEnd ? "end-active" : null}
                >
                End</button>
                <button 
                onClick={this.props.startSearch}
                value="begin">Begin</button>
                <button
                onClick={this.props.clearBoard}>
                    Clear
                </button>

            </div>
        )
    }
}
