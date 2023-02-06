import { useContext, useState } from "react";
import windows_95 from "../assets/windows-95.svg"
import { ActionType, Context } from "../contexts/Context";
import CloseButton from "./CloseButton"

function OkButton() {
  const { dispatch } = useContext(Context)

  const handleClose = () => {
    const action = {
      type: ActionType.CLOSE,
      payload: "Info"
    }
    dispatch(action)
  }

  return (<button className="ok-button" onClick={handleClose}>OK</button>)
}

interface WindowProps {
  top: string;
  left: string;
  iconSrc: string;
  name: string;
  selected: boolean;
  dispatch: any;
}

function InfoWindow({ top, left, name, selected }: WindowProps) {

  const { dispatch } = useContext(Context)
  const darkGrey = "#817F80"
  const blue = "#010084"
  const style = {
    backgroundColor: selected ? blue : darkGrey,
    zIndex: selected ? 2 : 5
  }
  const [listen, setListen] = useState(true)

  const dropAction = (e: any) => {

    const action = {
      type: ActionType.DROP,
      payload: {
        name,
        top: `${e.clientY}px`,
        left: `${e.clientX}px`
      }
    }
    return action
  }
  const handleSelect = () => {
    const action = {
      type: ActionType.SELECT,
      payload: name
    }
    dispatch(action)
  }
  const handleDrop = (e: any) => {
    const action = dropAction(e)
    dispatch(action)
  }

  const handleDrag = (e: any) => {
    if (!listen) return
    setListen(false)
    console.log('drag')
    const action = dropAction(e)
    dispatch(action)
    setTimeout(() => setListen(true), 200)
  }

  return (
    <div className="window" onDrag={handleDrag} onClick={handleSelect} draggable="true" style={{ top, left }}>
      <div id="mini-nav" style={style}>
        <div className="window-title">Windows</div>
        <CloseButton name={"Info"} />
      </div>
      <div className="info-container">
        <p>Windows 95</p>
        <img src={windows_95}></img>
        <p>Copyright&copy; 1981-1995, Microsoft Corp.</p>
        <OkButton />
      </div>
    </div>
  )
}

export default InfoWindow;