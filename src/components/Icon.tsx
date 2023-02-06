import { useContext, useEffect, useState } from "react";
import { Context, ActionType } from "../contexts/Context";
import { IconContext, IconActionType } from "../contexts/IconContext";

interface IconProps {
  iconSrc: string;
  name: string;
  selected: boolean;
}

function Icon({ iconSrc, name, selected }: IconProps) {
  const [clickCount, setClickCount] = useState(0)
  const [timeout, setTO] = useState<number | undefined>(undefined)
  const { dispatch } = useContext(Context)
  const { iconDispatch } = useContext(IconContext)

  const handleDoubleClick = () => {
    if (clickCount >= 1) {
      const action = {
        type: ActionType.OPEN,
        payload: name
      }
      dispatch(action)
    } else {
      if (clickCount === 0) {
        const action = {
          type: IconActionType.SELECT,
          payload: name
        }
        iconDispatch(action)
      }
      setClickCount(clickCount + 1)
      const timeout = setTimeout(() => { setClickCount(0) }, 1000)
      setTO(timeout)
    }
  }
  useEffect(() => { return () => clearTimeout(timeout) }, [timeout])


  const style = { border: selected ? "1px dotted black" : "none" }

  return (
    <div className="icon" style={style} onClick={handleDoubleClick} >
      <img src={iconSrc} />
      <p id="icon-desc">{name}</p>
    </div>
  )
}

export default Icon;
