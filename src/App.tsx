import { useMemo, useContext } from 'react'
import './App.css'
import { Context, Status } from "./contexts/Context"
import { IconContext } from "./contexts/IconContext"
import Desktop from "./components/Desktop"
import Window from "./components/Window"
import NavBar from "./components/NavBar"

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
        {open.map((program: any) => <Window key={program.name} top={program.position.top} left={program.position.left} iconSrc={program.iconSrc} name={program.name} selected={program.selected} />)}
      </Desktop>
      <NavBar programs={open} />
    </div>
  )
}


export default App;
