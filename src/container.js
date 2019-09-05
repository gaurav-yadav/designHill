import React from 'react';
import  GameTile from './game-tile'
import { util } from 'node-forge';

class Container extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            gameCenter :[],
            delayValue : 2,
            flipValue: 1,
            totalColored:1
          };
      }

handleSomething = ()=>{
    const matrixSize= parseInt(this.state.inputValue);
var m = Array(matrixSize).fill({type:""}).map(()=>Array(matrixSize).fill({type:""}));
console.log(m)
this.setState({gameCenter :m})
// let itr= Math.floor(Math.random() * Math.floor(matrixSize-1));
let flipCount= this.state.flipValue;
 let flipDelay = this.state.delayValue;
setInterval(()=>{
    console.log("flipping")
    for(let i=0;i<flipCount;i++){
        this.triggerColor()
}
},flipDelay*1000)


}

triggerColor = ()=>{
    setTimeout(()=>{
        const matrixSize= parseInt(this.state.inputValue);
        let row= Math.floor(Math.random() * Math.floor(matrixSize-1));
        let col= Math.floor(Math.random() * Math.floor(matrixSize-1));
        console.log(row,col)
        let m = this.state.gameCenter;
        m[row][col]= {type:"active"};
        //increment the color counter. 

        this.setState({gameCenter:m})
        //console.log(JSON.stringify(m))
    },0)
    

}

updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  updateDelayValue(evt) {
    this.setState({
      delayValue: evt.target.value
    });
  }
  updateFlipValue(evt) {
    this.setState({
      flipValue: evt.target.value
    });
  }
  handleChildClick =(data,event)  =>{

    //alert("The Child button data is: " + childData.childText + " - " + childData.childNumber);
    alert("The Child HTML is: " + event.target.innerHTML , data);
 }

render(){
    return (
        <fragment>
        <button onClick={this.handleSomething}>lets go</button>
        <p>matrix size</p>
        <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
        <p>delay</p><input value={this.state.delay} onChange={evt => this.updateDelayValue(evt)}/>
        <p>number to be flipped</p><input value={this.state.delay} onChange={evt => this.updateFlipValue(evt)}/>
        {this.state.gameCenter.map((a,xidx) =>{
            return a.map((i,yidx)=>{
                console.log("sdf")
                return  <GameTile state={i.type} onClick={this.handleChildClick} id={[xidx,yidx]}></GameTile>

            })
        })}
        <GameTile state={"inactive"} onClick={this.handleChildClick}></GameTile>
        <GameTile state={"inactive"} onClick={this.handleChildClick}></GameTile>
        <GameTile state={"inactive"} onClick={this.handleChildClick}></GameTile>
        </fragment>
    )
}
    
}


export default Container