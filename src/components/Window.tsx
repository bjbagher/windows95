import { useContext, useState } from "react"
import { ActionType, Context } from "../contexts/Context"
import CloseButton from "./CloseButton"

interface WindowProps {
  top: string;
  left: string;
  iconSrc: string;
  name: string;
  selected: boolean;
}

function Window({ top, left, iconSrc, name, selected }: WindowProps) {
  const darkGrey = "#817F80"
  const blue = "#010084"
  const style = {
    backgroundColor: selected ? blue : darkGrey,
    zIndex: selected ? 2 : 5
  }
  const { dispatch } = useContext(Context)
  const [listen, setListen] = useState(true)

  const dropAction = (e) => {

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
  const handleDrop = (e) => {
    const action = dropAction(e)
    dispatch(action)
  }

  const handleDrag = (e) => {
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
        <div className="window-title">
          <img src={iconSrc} />
          <p>{name}</p>
        </div>
        <CloseButton name={name} />
      </div>
      <div className="window-outline">
        <div className="window-menu">
          <ul>
            <li>File</li>
            <li>Edit</li>
            <li>View</li>
            <li>Help</li>
          </ul>
        </div>
        <div className="window-container"></div>
      </div>
    </div>
  )
}

export default Window;