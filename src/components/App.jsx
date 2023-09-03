import React, { useRef, useState } from "react"
import Draggable from "react-draggable"

function Layers({ levels }) {
  const ref = useRef()

  if (levels === 0) {
    return null;
  }

  const size = 100*levels
  const lvl = "lvl"+levels
  const handle = `.${lvl}`
  
  return <>
    <Draggable bounds="parent" handle={handle} nodeRef={ref.current}>
      <div
        ref={ref}
        style={{ border: "1px solid", width: size, height: size }}
      >
        <div
          className={lvl}
          style={{ height: 20, backgroundColor: "gray" }}
        >
          Layer {levels}
        </div>
        <Layers levels={levels - 1} />
      </div>
    </Draggable>
  </>
}

const MAX_LEVEL = 5

function App() {
  const [levels, setLevels] = useState(0)
  console.log(levels)
  
  function addLevel() {
    if (levels === MAX_LEVEL) { return }
    setLevels(levels + 1)
  }

  return (
    <div style={{ height: "97vh" }}>
      <button onClick={addLevel}>Add layer</button>
      <Layers levels={levels} />
    </div>
  )
}

export default App
