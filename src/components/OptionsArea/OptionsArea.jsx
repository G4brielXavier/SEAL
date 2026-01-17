import styles from './OptionsArea.module.css'

import { useSealStore } from '../../../stores/useSealStore'
import { useState } from 'react'

import IconSealed from '../../assets/icons/sealed.png'
import IconDelete from '../../assets/icons/delete.png'

import AlertBox from '../AlertBox/AlertBox'

export default function OptionsArea()
{
    const [popupAlert, setPopupAlert] = useState({ status: false, from: '' })

    const { 
        tablets, 
        tabletSelected_uuid, 
        updateTablet,
        removeTablet 
    } = useSealStore()

    var currentTablet = tablets.find((tab) => tab.uuid === tabletSelected_uuid)

    const date = new Date()

    const HandleSealTablet = () => {
        if (!currentTablet.isSealed) currentTablet.isSealed = true

        currentTablet.dateSealed = {
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }

        updateTablet(tabletSelected_uuid, currentTablet)
    }

    const HandlePopup = (status, fromName) => {
        setPopupAlert({ status: status, from: fromName })
    }

    return (
        <>
        { popupAlert.from === 'delete' && 
            <AlertBox 
                msg={`Do you want to delete "${currentTablet.title}"`} 
                msgAction={'Delete'}
                condition={'DELETE'}
                onClose={() => setPopupAlert({ status: false, from: '' })}
                onAction={() => removeTablet(tabletSelected_uuid)}
            /> 
        }

        { popupAlert.from === 'seal' && 
            <AlertBox 
                msg={`Do you want to seal "${currentTablet.title}"`} 
                msgAction={'Seal'}
                condition={'SEAL'}
                onClose={() => setPopupAlert({ status: false, from: '' })}
                onAction={() => HandleSealTablet()}
            /> 
        }

        {tablets.length > 0 && 
            <div className={styles.OptionMain}>
                {!currentTablet?.isSealed && 
                    <div className={styles.ButtonSeal} onClick={() => HandlePopup(true, 'seal')}>
                        <img src={IconSealed} alt="" />
                    </div>
                }
                <div className={styles.ButtonDelete} onClick={() => HandlePopup(true, 'delete')}>
                    <img src={IconDelete} alt="" />
                </div>
                <div className={styles.InfoBlock}>
                    <p>{currentTablet?.text.length > 0 ? currentTablet?.text.replaceAll(" ", "").length : 0}</p>
                    <p>Chars</p>
                </div>
                <div className={styles.InfoBlock}>
                    <p>{currentTablet?.text.length > 0 ? currentTablet.text.split(' ').length : 0}</p>
                    <p>Words</p>
                </div>
                {currentTablet?.isSealed && 
                    <div className={styles.InfoBlock}>
                        <p style={{ fontSize: '0.9rem' }}>{`${currentTablet.dateSealed.month}/${currentTablet.dateSealed.year}`}</p>
                        <p>Sealed in</p>
                    </div>
                }
            </div>}
        </>
    )
}