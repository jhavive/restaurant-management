import React from 'react'
import './styles.scss'

export const Select = (props) => (
    <div className="select-container">
        <select {...props} className={props.name}>

        </select>
    </div>
)

export const Option = (props) => (
    <option {...props}>{props.children}</option>
)