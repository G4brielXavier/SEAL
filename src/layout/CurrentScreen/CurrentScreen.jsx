
import Editor from "../../components/Screens/Editor/Editor"
import { useSealStore } from "../../../stores/useSealStore"

export default function CurrentScreen()
{
    const { tabletSelected_uuid } = useSealStore()

    const ScreensTemplate = [
        Editor
    ]

    const Screen = ScreensTemplate[0]

    return <Screen key={tabletSelected_uuid} uuid={tabletSelected_uuid} />
}