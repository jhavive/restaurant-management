import React, { useState } from 'react'
import './styles.scss'
import { MoreVertical, Circle, CheckCircle } from 'react-feather'



const Card = props => {
    console.log(props ," ", props.index)


    let [openMenu, setOpenMenu] = useState(false)

    const onClickMenu = e => {
        if(window.matchMedia("(min-width: 320px) and (max-width: 767px) and (orientation: portrait)").matches){
            let { dispatch } = window.rootStore
            dispatch({
                type: 'OPEN_MODAL',
                modalBody: props.menuComponent,
                modalType: 'slide-menu'
                // data: {
                //     data: {...props },
                //     component:  (props) => <div className="mobile-footer individual-card-selection-footer">{
                //             props.menuComponent
                //         }</div>
                // }
            })
        } else {
            setOpenMenu(!openMenu)
        }
    }

    return <div 
        className   =   { 
                            "card-container "+
                            ( props.selectedIndexs && props.selectedIndexs.length ? "show-selection ": "" )+
                            ( props.selectedIndexs && props.selectedIndexs.includes(props.index+"") ? "active-selection ": "inactive-selection " )+
                            props.className+" "
                        } 
        data-index  =   {props.index} 
        onClick     =   {props.onClick}
        style       =   {{background: props.background || 'white'}}
        >

        {
            props.children
        }
        {
            props.selectedIndexs && props.selectedIndexs.length ? 
                props.selectedIndexs && props.selectedIndexs.includes(props.index+"") ?
                <CheckCircle color="#1749a5" className="selection-icon"/> :
                <Circle className="selection-icon"/>
            : null
        }
        {
            props.menuComponent ? <React.Fragment>
                <MoreVertical 
                    className   =   "menu" 
                    size        =   "18"
                    onClick     =   {onClickMenu}
                    />
                <div className={`hide-mobile card-menu-container ${openMenu ? 'show-menu' : 'hide-menu'}`}>
                {
                    props.menuComponent
                }
                </div>
            </React.Fragment> : null
        }
    </div>
}
export  default Card