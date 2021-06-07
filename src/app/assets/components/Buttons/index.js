import React from 'react'
import './styles.scss'

export const Button = props =>{ 
    let clas = props.className 
    let temp = JSON.parse(JSON.stringify(props))
    delete temp.className
    console.log("props", props)
    return <button className={`custom-button ${props.style_type} ${clas}`} {...temp} onClick={props.onClick}>{props.children}</button>
}