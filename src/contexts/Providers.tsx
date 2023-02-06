
import { ReactNode, useMemo, useReducer } from "react"
import iconReducer, { iconState, IconContext } from "./IconContext"
import reducer, { initState, Context } from "./Context"

type ProviderProps = {
  children: ReactNode
}

function Providers({ children }: ProviderProps) {
  const [iconStt, iconDispatch] = useReducer(iconReducer, iconState)
  const [state, dispatch] = useReducer(reducer, initState)
  const iconCtx = useMemo(() => ({
    iconStt, iconDispatch
  }), [iconStt])
  const ctx = useMemo(() => ({
    state, dispatch
  }), [state])

  return (
    <IconContext.Provider value={iconCtx}>
      <Context.Provider value={ctx}>
        {children}
      </Context.Provider>
    </IconContext.Provider>
  )
}

export default Providers;
