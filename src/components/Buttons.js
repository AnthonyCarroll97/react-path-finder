import React, { Component } from 'react'

export default class Buttons extends Component {
    
    render() {
        
        return (
            <>
                <div className="buttons-main">
                    <button 
                    onClick={this.props.handlePress}
                    value="start"
                    className={this.props.buttonControls.setStart ? "button-active" : "hover"}
                    >
                    Set Start
                    </button>
                    
                    <button 
                    onClick={this.props.handlePress}
                    value="end"
                    className={this.props.buttonControls.setEnd ? "button-active" : "hover"}
                    >
                    Set End
                    </button>
                    <button
                    onClick={this.props.handlePress}
                    value="block"
                    className={this.props.buttonControls.setBlocks ? "button-active" : "hover"}
                    >
                    Set Block
                    </button>
                    
                    
                </div>
                <div className="large-buttons-main">
                    <button
                    onClick={this.props.clearBoard}
                    className="button-large hover clear">
                    Clear
                    </button>
                    <button 
                    onClick={this.props.startSearch}
                    className="button-large hover begin"
                    >Begin</button>

                </div>
            </>
        )
    }
}
