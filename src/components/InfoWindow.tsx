import windows_95 from "../assets/windows-95.svg"
import CloseButton from "./CloseButton"

function OkButton() {
  return (<button className="ok-button">OK</button>)
}

function InfoWindow() {
  return (
    <div className="info-window">
      <div id="mini-nav">
        <div className="window-title">Windows</div>
        <CloseButton name={"Windows"} />
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

export default InfoWindow;