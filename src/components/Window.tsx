import { ReactNode, useContext, useState } from "react"
import { ActionType, Context } from "../contexts/Context"
import CloseButton from "./CloseButton"
import InfoWindow from "./InfoWindow"

import musicplayer from "../assets/musicplayer.png"


function MusicPlayer() {
  return (
    <div className="music_container">
      <div className="music_player">
        <img src={musicplayer} />
        <audio
          controls
          autoPlay
          src="bigpoppa.mp3">
        </audio>
        <CloseButton name="Music" />
      </div>
    </div>
  )
}

interface WindowProps {
  top: string;
  left: string;
  iconSrc: string;
  name: string;
  selected: boolean;
  children?: ReactNode;
}

function Window({ top, left, iconSrc, name, selected, children }: WindowProps) {
  const { dispatch } = useContext(Context)

  if (name === "Info")
    return <InfoWindow name={name} top={top} left={left} selected={selected} />

  if (name === "Music")
    return (<MusicPlayer />)

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
        <div className="window-container">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Window;