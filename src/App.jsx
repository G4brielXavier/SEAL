
import Intro from "./components/Intro/Intro"
import SideBar from "./components/SideBar/SideBar"
import CurrentScreen from "./layout/CurrentScreen/CurrentScreen"
import OptionsArea from "./components/OptionsArea/OptionsArea"

export default function App()
{
  return (
    <div className="AppBackground">
      <Intro />
      <div className="AppContentScreen">
        <SideBar />
        <CurrentScreen  />
        <OptionsArea />
      </div>
    </div>
  )
}
