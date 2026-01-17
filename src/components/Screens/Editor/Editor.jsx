import { useState } from 'react'
import { useSealStore } from '../../../../stores/useSealStore'

import styles from './Editor.module.css'

export default function Editor({ uuid })
{
    const { tablets, tabletSelected_uuid, updateTablet } = useSealStore()
    var TabletSelected = tablets.find((tab) => tab.uuid === uuid)

    const [ title, setTitle ] = useState(TabletSelected?.title ?? '')
    const [ text, setText ] = useState(TabletSelected?.text ?? '')

    const HandleChangeText = (value) => {
        setText(value)
        TabletSelected.text = value
        updateTablet(uuid, TabletSelected)
    }
    
    const HandleChangeTitle = (value) => {
        if (value.length > 0)
        {
            setTitle(value)
            TabletSelected.title = value
            updateTablet(uuid, TabletSelected)
        }
    }

    return (
        <div className={styles.EditorMain}>
            {tabletSelected_uuid != undefined ?
                <>
                <section className={styles.TopEditor}>
                    <input 
                        style={{
                            userSelect: TabletSelected?.isSealed ? 'none' : ''
                        }}
                        value={title || ''} 
                        onBlur={(e) => HandleChangeTitle(e.target.value)} 
                        onChange={(e) => setTitle(e.target.value)}
                        minLength={1}
                        maxLength={30}
                        readOnly={TabletSelected?.isSealed}
                        type="text" 
                        id='title_tablet' 
                        placeholder='Store a thought.' 
                    />
                </section>
                <section className={styles.EditorArea}>
                    <textarea 
                        style={{
                            userSelect: TabletSelected?.isSealed ? 'none' : ''
                        }}
                        type="text" 
                        minLength={0}
                        maxLength={1000}
                        spellCheck={false}
                        readOnly={TabletSelected?.isSealed}
                        value={text} 
                        onChange={(e) => HandleChangeText(e.target.value)} 
                        id='content_tablet' 
                        placeholder='Store a thought.' 
                    />
                </section>
                </>
                :
                <></>
            }
        </div>
    )
}