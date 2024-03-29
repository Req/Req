import { useState, useRef, useEffect } from "react"
import { Clock, Desktop, Menu, Menubar, ProgramList, ProgramListItem, Start, WindowButton, Windows } from "./Styled/Styled.jsx"
import ModelViewer from "./ThreeDee/Threedee.jsx"
import Window from "./Window.jsx"
import "./style.css"
import Matrix from "./Matrix.jsx"
import RainbowPaint from "./RainbowPaint.jsx"

function startDrag(e, pointer) {
  if (document.body.classList.contains("dragging")) {
    return
  }
  document.body.classList.add("dragging")

  // Save the offset of the mouse (how far from window "titlebar" origo did dragging start from)
  const { offsetX, offsetY } = e.nativeEvent
  function handlePointerMovement(e) {
    let toX = e.x - 1 - offsetX
    let toY = e.y - 1 - offsetY

    // constrain left and top
    toX = toX<0?0:toX
    toY = toY<0?0:toY

    if (window.visualViewport?.width) {
      if (toX>window.visualViewport?.width-200) {
        toX = window.visualViewport?.width-200
      }
     if (toY>window.visualViewport?.height-200) {
      toY = window.visualViewport?.height-200
      }
    }
    pointer.current.style.left = toX + "px"
    pointer.current.style.top = toY + "px"
  }

  // events bubble up to the body
  // attaching event listener via property for easy removal in cancelDrag
  document.body.onpointermove = handlePointerMovement
}

const cancelDrag = e => {
  if (!document.body.classList.contains("dragging")) {
    return
  }
  document.body.classList.remove("dragging")
  document.body.onpointermove = null
}

document.body.onmouseup = cancelDrag
window.onblur = cancelDrag

function App() {
  const [windows, setWindows] = useState([])
  const main = useRef()

  useEffect(() => {
    // only exiting the App container (instad of child elements) counts as stopping window drag
    main.current.addEventListener("mouseleave", cancelDrag)
  }, [])

  function spawn(e) {
    const id = e.target.dataset.id

    if (!id) return

    if (windows.find(w => w.id === id)) { return }

    let content = null
    if (id === "three") {
      content = <ModelViewer scale="1" modelPath={"/cubes.glb"} />
    }
    if (id === "paint") {
      content = <RainbowPaint />
    }
    if (id === "matrix") {
      content = <Matrix />
    }

    const window = {
      id,
      content,
      title: e.target.dataset.title,
    }
    setWindows([...windows, window])
  }

  function closeWindow(window) {
    setWindows(windows.filter(x => x.id !== window.id))
  }

  return (
    <Desktop ref={main}>
      {windows.map((window, index) => (
        <Window
          key={window.id}
          title={window.title}
          layer={index}
          close={e => {
            e.stopPropagation()
            closeWindow(window)
          }}
          startDrag={startDrag}
        >
          {window.content}
        </Window>
      ))}
      <Menu className="box blockhover">
        <ProgramList onClick={spawn}>
          <ProgramListItem data-title="Paint" data-id="paint">
            Rainbow Paint
          </ProgramListItem>
          <ProgramListItem data-title="Not xEyes" data-id="2">
            Not Xeyes
          </ProgramListItem>
          <ProgramListItem data-title="WASM" data-id="3">
            WASM test
          </ProgramListItem>
          <ProgramListItem data-title="Matrix" data-id="matrix">
            Matrix
          </ProgramListItem>
          <ProgramListItem data-title="3d Cubes" data-id="three">
            3D Cubes
          </ProgramListItem>
          <hr />
          <ProgramListItem data-title="About" data-id="6">
            About
          </ProgramListItem>
        </ProgramList>
      </Menu>
      <Menubar>
        <Start className="box">🪟 Start</Start>
        <Windows>
          {windows.map(window => (
            <WindowButton key={window.id} className="box">
              {window.title}
            </WindowButton>
          ))}
        </Windows>
        <Clock className="box blockhover">13:37</Clock>
      </Menubar>
    </Desktop>
  )
}

export default App
