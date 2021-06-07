import React, { useState, useEffect } from 'react'
import './styles.scss'

const DropdownMenu = props => {

    let [open, setOpen] = useState(false)

    let toggleClass = () => {
        setOpen(!open)
    }

    return <div className="dropdwon-container">
        <div className="menu-label" onClick={toggleClass}>{props.menuLabel}</div>
        <div class={`submenu ${open ? 'submenu-open': 'submenu-closed'}`}>
        {
            props.children
        }
        </div>
    </div>
}

export default DropdownMenu