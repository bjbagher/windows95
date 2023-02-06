import windows_95 from "../assets/windows-95.svg"
import sound from "../assets/sound.png"
import { useContext, useEffect, useState } from "react"
import { Context, ActionType } from "../contexts/Context"

function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    setTimeout(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
  }
    , [time])

  return (
    <div className="time">
      <img src={sound} alt={"sound"} />
      <p>{time}</p>
    </div>
  )
}

function Start() {
  return (
    <div className="start">
      <img src={windows_95}></img>
      <p>Start</p>
    </div>
  )
}

function Task({ iconSrc, name }) {
  const { dispatch } = useContext(Context)

  const handleSelect = () => {
    console.log("hello??")
    const action = {
      type: ActionType.SELECT,
      payload: name
    }
    dispatch(action)
  }
  return (<div className="task" onClick={handleSelect}>
    <img src={iconSrc} />
    <p>{name}</p>
  </div>)
}

type NavBarProps = {
  programs: any[]
}

function NavBar({ programs }: NavBarProps) {
  return (
    <div id="nav-bar">
      <Start />
      {programs.map(program =>
        <Task key={program.name} name={program.name} iconSrc={program.iconSrc} />
      )}
      <Time />
    </div>
  )
}

export default NavBar;