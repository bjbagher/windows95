import { useMemo, useContext } from 'react'
import './App.css'
import { Context, Status } from "./contexts/Context"
import { IconContext } from "./contexts/IconContext"
import Desktop from "./components/Desktop"
import Window from "./components/Window"
import NavBar from "./components/NavBar"
import Splash from "./assets/splash.webp"
import Asurion from "./assets/asurion.webp"
import Hopes from "./assets/hope.webp"
import Dreams from "./assets/dreams.webp"
import CloseButton from "./components/CloseButton"
import windows_95 from "./assets/windows-95.svg"
import musicplayer from "./assets/musicplayer.png"

import InfoWindow from "./components/InfoWindow"





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

function Resume() {
  return (<embed src="ResumeBB.pdf" />)
}
function VideoPlayer() {
  return (
    <video controls width="590" autoPlay>
      <source src="rickroll.mp4" type="video/mp4" />
    </video>
  )
}

const trash = [Hopes, Dreams, Splash, Asurion]

function Trash() {
  return (
    <div className="trash">
      <ul>
        {trash.map(item => <li key={item}><div><img src={item} /></div></li>)}
      </ul>
    </div>
  )
}

function App() {
  const { state } = useContext(Context)
  const { iconStt } = useContext(IconContext)
  for (const key in iconStt) {
    state[key]['icon_selected'] = iconStt[key].selected
  }
  const programs = useMemo(() => Object.values(state), [state])
  const open = programs.filter((program: any) => program.status === Status.OPEN)
  return (
    <div className="App">
      <Desktop programs={programs}>
        {open.map((program: any) => {

          if (program.name === "Info")
            return (
              <InfoWindow top={program.position.top} left={program.position.left} name={program.name} selected={program.selected} />
            )


          if (program.name === "Music")
            return (<MusicPlayer />)

          if (program.name === "Internet") {
            return (
              <Window key={program.name} top={program.position.top} left={program.position.left} iconSrc={program.iconSrc} name={program.name} selected={program.selected} >
                <VideoPlayer />
              </Window>
            )
          }

          if (program.name === "about.md") {
            return (
              <Window key={program.name} top={program.position.top} left={program.position.left} iconSrc={program.iconSrc} name={program.name} selected={program.selected} >
                <Resume />
              </Window>
            )
          }

          if (program.name === "Recycle Bin") {
            return (
              <Window key={program.name} top={program.position.top} left={program.position.left} iconSrc={program.iconSrc} name={program.name} selected={program.selected} >
                <Trash />
              </Window>
            )
          }


          return (<Window key={program.name} top={program.position.top} left={program.position.left} iconSrc={program.iconSrc} name={program.name} selected={program.selected} />)
        })}
      </Desktop>
      <NavBar programs={open} />
    </div>
  )
}


export default App;
