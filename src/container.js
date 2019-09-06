import React from "react";
import GameTile from "./game-tile";

class Container extends React.Component {
  x; //do not kill me for global variables
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 4,
      gameCenter: [],
      delayValue: 2,
      flipValue: 3,
      totalColored: 0,
      gameStarted: false,
      gameFinished: false,
      gameLost: false
    };
  }

  startGame = () => {
    this.setState({ gameStarted: true });
    const matrixSize = parseInt(this.state.inputValue);

    var m = Array(matrixSize)
      .fill({ type: "" })
      .map(() => Array(matrixSize).fill({ type: "dull" }));
    this.setState({ gameCenter: m }); //set the state to initiall array 
    let flipCount = this.state.flipValue;
    let flipDelay = this.state.delayValue;
    //color the initial set of tiles.
    for (let i = 0; i < flipCount; i++) {
        this.triggerColor(); // takes care of changing tile color and finding new one if already colored
      }

      //setup a recurring event for coloring tiles every few secs
    this.x = setInterval(() => {
      //  console.log("flipping")
      for (let i = 0; i < flipCount; i++) {
        this.triggerColor();
      }
    }, flipDelay * 1000);
  };

  triggerColor = () => {
    setTimeout(() => {
      while (true) {
        const matrixSize = parseInt(this.state.inputValue);
        let row = Math.floor(Math.random() * Math.floor(matrixSize));
        let col = Math.floor(Math.random() * Math.floor(matrixSize));
        console.log(row, col);
        let m = this.state.gameCenter;
        // console.log(m[row][col].type , 'curr state')
        if (
          this.state.totalColored ===
          this.state.inputValue * this.state.inputValue
        ) {
         
          this.setState({ gameLost: true });
          clearInterval(this.x);
          alert("you LOST,  reload to play again");
        //   window.location.reload();
          break;
        }
        if (m[row][col].type !== "Active") {
          //if not active make it or let it find a new one
          m[row][col] = { type: "Active" };
          let colorCount = this.state.totalColored;
          colorCount++;
          if (colorCount === this.state.inputValue * this.state.inputValue) {
            console.log("you lost");
            this.setState({ gameLost: true });
          }
          this.setState({ gameCenter: m, totalColored: colorCount });
          break;
        } else {
          //console.log("finding new");
        }
      }
    }, 0);
  };

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
  handleChildClick = (data, event) => {
    let m = this.state.gameCenter;
    if (
      m[data[0]][data[1]].type !== "dull" &&
      m[data[0]][data[1]].type !== "Inactive"
    ) {
      m[data[0]][data[1]] = { type: "Inactive" };
      //increment the color counter.
      let colorCount = this.state.totalColored;
      colorCount--;
      if (colorCount === 0) {
      
        this.setState({ gameFinished: true });
        clearInterval(this.x);
        alert(" you won refresh to start new game");
        return;
      }
      this.setState({ gameCenter: m, totalColored: colorCount });
    }
  };

  render() {
    return (
      <fragment>
        {this.state.gameStarted ? (
          <p>Enjoy the game:  Colored tiles on the board {this.state.totalColored}</p>
        ) : (
          <fragment>
            <button onClick={this.startGame}>lets go</button>
            <p>matrix size</p>
            <input
              value={this.state.inputValue}
              onChange={evt => this.updateInputValue(evt)}
            />
            <p>delay in seconds</p>
            <input
              value={this.state.delayValue}
              onChange={evt => this.updateDelayValue(evt)}
            />
            <p>number of tiles to be flipped</p>
            <input
              value={this.state.flipValue}
              onChange={evt => this.updateFlipValue(evt)}
            />{" "}
          </fragment>
        )}
        <section className="game-container" style={{ width: "100%" }}>
          {this.state.gameCenter.map((a, xidx) => {
            return (
              <div className="row">
                {a.map((i, yidx) => {
                  return (
                    <GameTile
                      state={i.type}
                      onClick={this.handleChildClick}
                      id={[xidx, yidx]}
                    ></GameTile>
                  );
                })}
              </div>
            );
          })}
        </section>
      </fragment>
    );
  }
}

export default Container;
