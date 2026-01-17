import styles from './AlertBox.module.css'

import { useState } from 'react'

export default function AlertBox ({ msg, msgAction, condition, onClose, onAction })
{
    const [text, setText] = useState('')

    const HandleApplyAction = () => {
        if (text === condition)
        {
            onAction()
            onClose()
        }
    }

    return (
        <div className={styles.AlertBoxMain}>
            <div className={styles.Box}>
                <p>{msg}</p>
                <p style={{ fontSize: '0.8rem', opacity: '0.8' }}>This action is irreversible.</p>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={`Write "${condition}"`} />
                <div className={styles.BtnsAB}>
                    <button id='cancel' onClick={() => onClose()}>Cancel</button>
                    <button id={`action_${msgAction}`} onClick={() => HandleApplyAction()}>{msgAction}</button>
                </div>
            </div>
        </div>
    )
}