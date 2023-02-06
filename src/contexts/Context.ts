
import { OPEN, CLOSE, SELECT, DROP } from "./constants"
import pc_icon from "../assets/pc_icon.png"
import recycle_bin from "../assets/recycle-bin.png"
import book_info from "../assets/book_info.png"
import readme from "../assets/readme.png"
import loading from "../assets/loading.png"
import internet from "../assets/internet.png"
import print from "../assets/print.png"
import music from "../assets/music.png"
import { createContext } from "react"

export const Status = { OPEN, CLOSE };

export const ActionType = {
  OPEN,
  CLOSE,
  SELECT,
  DROP
}

export const initState = {
  Computer: {
    iconSrc: pc_icon,
    name: "Computer",
    status: Status.CLOSE,
    position: { top: '60px', left: '60px' },
    selected: true
  },
  "Recycle Bin": {
    iconSrc: recycle_bin,
    name: "Recycle Bin",
    status: Status.CLOSE,
    position: { top: '80px', left: '90px' },
    selected: false
  },
  Internet: {
    iconSrc: internet,
    name: "Internet",
    status: Status.CLOSE,
    position: { top: '100px', left: '120px' },
    selected: false
  },
  Music: {
    iconSrc: music,
    name: "Music",
    status: Status.CLOSE,
    position: { top: '120px', left: '150px' },
    selected: false
  },
  "about.md": {
    iconSrc: readme,
    name: "about.md",
    status: Status.CLOSE,
    position: { top: '140px', left: '180px' },
    selected: false
  },
  Info: {
    iconSrc: book_info,
    name: "Info",
    status: Status.CLOSE,
    position: { top: '160px', left: '210px' },
    selected: true
  },
  Print: {
    iconSrc: print,
    name: "Print",
    status: Status.CLOSE,
    position: { top: '180px', left: '240px' },
    selected: false
  }
}

export const Context = createContext<any>(null)

interface Action<T, P> {
  readonly type: T;
  readonly payload?: P;
}

interface Payload {
  name: string;
  left: string;
  top: string;
}

function reducer(state: any, action: any) {
  let clone
  switch (action.type) {
    case ActionType.DROP:
      console.log('reducer', action)
      return { ...state, [action.payload.name]: { ...state[action.payload.name], position: { top: action.payload.top, left: action.payload.left } } }
    case ActionType.SELECT:
      clone = structuredClone(state)
      console.log('hello', action)
      for (const key in clone) {
        clone[key].selected = false
      }
      return { ...clone, [action.payload]: { ...clone[action.payload], selected: true } }
    case ActionType.OPEN:
      clone = structuredClone(state)
      for (const key in clone) {
        clone[key].selected = false
      }
      return { ...clone, [action.payload]: { ...clone[action.payload], status: Status.OPEN, selected: true } }
    case ActionType.CLOSE:
      return { ...state, [action.payload]: { ...state[action.payload], status: Status.CLOSE } }
    default:
      const error = new Error('Action type not found')
      console.error(error)
      return state
  }
}

export default reducer;
