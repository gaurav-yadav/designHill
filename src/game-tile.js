import React from 'react'
import './gametile.css'

class GameTile extends React.Component{
    constructor(props) {
        super(props);
        
      }
    render(){
        return(
        <div className={this.props.state} onClick={this.props.onClick.bind(this,this.props.state)}>test {this.props.state} </div>
        )
    }
}


export default GameTile