import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld && "#6d5d9ec7",
    color: props.isHeld && "#F4F4F4",
  };

  return (
    <button style={styles} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Die;
