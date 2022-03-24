import { useState, useRef } from "react";
import { WindowContent } from "./Styled/Styled";

function Window(props) {
  const [top, setTop] = useState(Math.round(Math.random() * 400));
  const [left, setLeft] = useState(Math.round(Math.random() * 400));
  const [layer, setLayer] = useState(props.layer);
  const domNode = useRef();

  function activate() {
    setLayer(layer + 3); // 3 comes from there being a max of 3 "windows" open
  }

  return (
    <WindowContent
      ref={domNode}
      style={{ top, left, zIndex: layer }}
      onMouseDown={activate}
      className="box blockhover"
    >
      <div
        onMouseDown={(e) => props.startDrag(e, domNode)}
        style={{
          height: "1.5em",
          lineHeight: "1em",
          margin: "0.1em",
          padding: "0.2em",
          cursor: "move",
          display: "flex",
          justifyContent: "space-between",
        }}
        className="box blockhover"
      >
        <span></span>
        <span>{props.title}</span>
        <span style={{cursor:"crosshair"}} onMouseDown={props.close}>X</span>
      </div>
      {props.children}
    </WindowContent>
  );
}

export default Window;
