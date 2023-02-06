import { createContext } from "react"
import { SELECT } from "./constants"

export const iconState = {
  Computer: {
    selected: false
  },
  "Recycle Bin": {
    selected: false
  },
  Internet: {
    selected: false
  },
  Music: {
    selected: false
  },
  "about.md": {
    selected: false
  },
  Info: {
    selected: false
  },
  Print: {
    selected: false
  }
}

export const IconContext = createContext(null)

export const IconActionType = {
  SELECT
}

interface Action<T, P> {
  readonly type: T;
  readonly payload?: P;
}


function iconReducer(state: typeof iconState, action: Action<string, string>) {
  switch (action.type) {
    case IconActionType.SELECT:
      const clone = structuredClone(state)
      for (const key in clone) {
        clone[key].selected = false
      }
      return { ...clone, [action.payload]: { selected: true } }
    default:
      const error = new Error('Action not found')
      console.error(error)
      return state
  }
}

export default iconReducer;
