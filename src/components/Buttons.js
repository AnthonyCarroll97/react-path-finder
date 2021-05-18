import React, { Component } from 'react'

export default class Buttons extends Component {
    
    render() {
        
        return (
            <div className="buttons-main">
                <button 
                onClick={this.props.handlePress}
                value="start"
                className={this.props.buttonControls.setStart ? "button-active" : null}
                >
                Start
                </button>
                
                <button 
                onClick={this.props.handlePress}
                value="end"
                className={this.props.buttonControls.setEnd ? "button-active" : null}
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
                className={this.props.buttonControls.setBlocks ? "button-active" : null}>

                    Set Block
                </button>
            </div>
        )
    }
}
