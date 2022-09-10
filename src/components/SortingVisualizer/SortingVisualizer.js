import { useState, useEffect } from "react";
import { getMergeSortAnimations } from "./algorithms";

import Bar from "./Bar";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

const numOfNodes = 1000;

export default function SortingVisualizer() {
  const [nodes, setNodes] = useState([]);
  const [inProgress, setInProgress] = useState(false);

  function resetArray() {
    /*
    Generate random array of data
    */
    function randIntRange(min, max) {
      // inclusive min and max
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const array = [];
    for (let i = 0; i < numOfNodes; i++) {
      array.push(randIntRange(5, 1000));
    }
    setNodes(array);
  }

  useEffect(() => {
    resetArray();
  }, []);

  function mergeSort() {
    // setInProgress(true);

    const animations = getMergeSortAnimations(nodes);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        console.log("b1:", arrayBars[barOneIdx]);
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  //
  return (
    <div>
      {nodes.map((node, i) => (
        <div
          className="array-bar"
          style={{
            display: "inline-block",
            // margin: `0 ${25 / numOfNodes}vw`,
            width: `${100 / numOfNodes}%`,
            backgroundColor: PRIMARY_COLOR,
            height: `${node}px`,
          }}
          key={i}
        ></div>
      ))}

      {!inProgress ? (
        <div>
          <button onClick={() => resetArray()}>New Array</button>
          <button onClick={() => mergeSort()}>Merge Sort</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
