import React, { Component } from 'react'
import './Buttons.css'

export default class Buttons extends Component {
    
    render() {
        
        return (
            <div className="buttons-container">
                <button 
                onClick={this.props.handlePress}
                value="start"
                className={this.props.buttonControls.setStart ? "start-active" : null}
                >
                Start
                </button>
                
                <button 
                onClick={this.props.handlePress}
                value="end"
                className={this.props.buttonControls.setEnd ? "end-active" : null}
                >
                End</button>
                <button 
                onClick={this.props.startSearch}
                value="begin">Begin</button>
                <button
                onClick={this.props.clearBoard}>
                    Clear
                </button>
                <button
                onClick={this.props.handlePress}
                value="block"
                className={this.props.buttonControls.setBlocks ? "block-active" : null}>

                    Set Block
                </button>

            </div>
        )
    }
}
