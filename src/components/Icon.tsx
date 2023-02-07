import { useContext, useEffect, useState } from "react";
import { Context, ActionType } from "../contexts/Context";
import { IconContext, IconActionType } from "../contexts/IconContext";

interface IconProps {
  iconSrc: string;
  name: string;
  selected: boolean;
}

function isMobile() {
  if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
    return true;
  } else {
    return false;
  }
}

function Icon({ iconSrc, name, selected }: IconProps) {
  const [clickCount, setClickCount] = useState(0)
  const [timeout, setTO] = useState<number | undefined>(undefined)
  const { dispatch } = useContext(Context)
  const { iconDispatch } = useContext(IconContext)

  function printPDF(url) {
    let pdfFrame = document.body.appendChild(document.createElement('iframe'));
    pdfFrame.style.display = 'none';
    pdfFrame.onload = () => (void pdfFrame.contentWindow.print());
    pdfFrame.src = url;
  }
  const handleDoubleClick = () => {
    if (clickCount >= 1) {
      if (name === "Print") {
        if (!isMobile()) {
          printPDF("ResumeBB.pdf")
        }
        return
      }
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
