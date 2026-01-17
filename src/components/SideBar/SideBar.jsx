import { useState } from 'react'
import { useSealStore } from '../../../stores/useSealStore'

import styles from './SideBar.module.css'

import IconCollection from '../../assets/icons/collections.png'
import IconTablet from '../../assets/icons/tablets.png'
import IconSealed from '../../assets/icons/sealed.png'


export default function SideBar()
{
    const { 
        tablets, 
        tabletSelected_uuid,

        addTablet, 
        setTabletSelected 
        
    } = useSealStore()
    const [open, setOpen] = useState(true)

    const HandleChangeOption = (dest) => {
        console.log(dest)
    }

    const HandleStateSideBar = () => setOpen(!open)

    const HandleNewTablet = () => {
        addTablet()
    }


    const itemsMain = [
        { key: "New Tablet", dest: 0, type: 'main', onClickFunc: HandleNewTablet },
    ]

    const items = [
        // { key: "Collections", dest: 1, type: 'option', ico: IconCollection },

    ]

    const SideBarCSS = {
        width: open ? "20%" : "5%"
    }


    return (
        <div style={SideBarCSS} className={styles.SideBarMain}>
            <div className={styles.BlockSideBar}>
                {open ? <p>v1.0</p> : <></>}
                <div style={{ width: open ? '50px' : '100%' }} className={styles.CharacterButton} onClick={() => HandleStateSideBar()}>{open ? "<" : ">"}</div>
            </div>
            <div className={styles.SectionSBM}>
                <div className={styles.BrandWW}>
                    <h1
                        style={{
                            fontSize: open ? "3rem" : "0.8rem",
                            transition: "0.2s"
                        }}
                    >SEAL</h1>
                    <p>{open ? "Write once. Keep forever." : ""}</p>
                </div>
                <div className={styles.OptionList}>
                    {open && itemsMain.map((value) => (
                        <div className={styles.MainOption} onClick={() => value.onClickFunc()}>
                            <p>{value.key}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.OptionListTablets}>
                    {open && tablets.map((value) => (
                        value.uuid === tabletSelected_uuid 
                        ?
                        <div className={styles.OptionSelected} key={value.uuid} onClick={() => setTabletSelected(value.uuid)}>
                            <img style={{ opacity: '1' }} src={value.isSealed ? IconSealed : IconTablet} alt="option-icon" />
                            <p>{value.title}</p>
                        </div>
                        :
                        <div className={styles.Option} key={value.uuid} onClick={() => setTabletSelected(value.uuid)} >
                            <img style={{ opacity: '0.4' }} src={value.isSealed ? IconSealed : IconTablet} alt="option-icon" />
                            <p>{value.title}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.OptionList}>
                    {open && items.map((value) => (
                        <div className={styles.Option} onClick={() => HandleChangeOption(value.dest)}>
                            <img style={{
                                width: open ? '8%' : '60%',
                                transition: '0.2s'

                            }} src={value.ico} alt="option-icon" />
                            {open && <p>{value.key}</p>}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.Diamonds}>
                
            </div>
        </div>
    )
}