import { ReactNode } from "react"
import Icon from "./Icon"

type DesktopProps = {
  children: ReactNode;
  programs: any[]
}

function Desktop({ programs, children }: DesktopProps) {
  return (
    <div className="desktop">
      <ul className="icons">
        {programs.map((program) => <li key={program.name}><Icon selected={program.icon_selected} iconSrc={program.iconSrc} name={program.name} /></li>)}
      </ul>
      {children}
    </div>
  )
}

export default Desktop;