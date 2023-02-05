import { useEffect, useState } from 'react'
import './App.css'
import windows_95 from "./assets/windows-95.svg"
import pc_icon from "./assets/pc_icon.png"
import recycle_bin from "./assets/recycle-bin.png"
import book_info from "./assets/book_info.png"
import readme from "./assets/readme.png"
import loading from "./assets/loading.png"
import internet from "./assets/internet.png"
import print from "./assets/print.png"
import sound from "./assets/sound.png"
import music from "./assets/music.png"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"


function CloseButton() {
  return (<button className="close-button">X</button>)
}

function OkButton() {
  return (<button className="ok-button">OK</button>)
}

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
      {time}
    </div>
  )
}

interface Props {
  iconSrc: string;
  iconDesc: string;
}

function Icon({ iconSrc, iconDesc }: Props) {
  return (
    <div className="icon">
      <img src={iconSrc} />
      <p id="icon-desc">{iconDesc}</p>
    </div>
  )
}

function Window() {
  return (
    <div className="window" draggable="true">
      <div id="mini-nav">
        <div className="window-title">
          <img src={pc_icon} />
          <p>Computer</p>
        </div>
        <CloseButton />
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

function InfoWindow() {
  return (
    <div className="info-window">
      <div id="mini-nav">
        <div className="window-title">Windows</div>
        <CloseButton />
      </div>
      <div className="container">
        <p>Windows 95</p>
        <img src={windows_95}></img>
        <p>Copyright&copy; 1981-1995, Microsoft Corp.</p>
        <OkButton />
      </div>
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

function Task({ iconSrc, desc }) {
  return (<div class="task">
    <img src={iconSrc} />
    <p>{desc}</p>
  </div>)
}


function NavBar() {
  return (
    <div id="nav-bar">
      <Start />
      <Task desc="Computer" iconSrc={pc_icon} />
      <Time />
    </div>
  )
}

const enum Status { "OPEN", "CLOSE" };




const programsInit = [
  {
    iconSrc: pc_icon,
    programDesc: "Computer",
    status: Status.OPEN
  },

  {
    iconSrc: recycle_bin,
    programDesc: "Recycle Bin",
    status: Status.OPEN
  },
]

function Desktop({ children }) {
  const [programs, setPrograms] = useState(programsInit)
  return (
    <div className="desktop">
      <ul>
        {programs.map((program) => <li key={program.programDesc}><Icon iconSrc={program.iconSrc} iconDesc={program.programDesc} /></li>)}
      </ul>
      {children}
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <Desktop >
        <InfoWindow />
        <Window />
      </Desktop>
      <NavBar />
    </div>
  )
}

export default App
