import { useContext } from "react"
import { ActionType, Context } from "../contexts/Context"

interface CloseButtonProps {
  name: string;
}

function CloseButton({ name } : CloseButtonProps) {
  const { dispatch } = useContext(Context)

  const handleClose = () => {
    const action = {
      type: ActionType.CLOSE,
      payload: name
    }
    dispatch(action)
  }
  return (<button className="close-button" onClick={handleClose}>X</button>)
}

export default CloseButton;
