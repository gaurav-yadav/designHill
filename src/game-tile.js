import React from "react";
import "./gametile.css";

class GameTile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={`${this.props.state} DivStyle`}
        onClick={this.props.onClick.bind(this, this.props.id)}
      >
        X
      </div>
    );
  }
}

export default GameTile;
