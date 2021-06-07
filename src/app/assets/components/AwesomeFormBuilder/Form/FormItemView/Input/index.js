import React from 'react'
import './styles.scss'

const Input = (props) => {
    console.log("Input props", props)
    return <React.Fragment>
        <label className="input-container">{props.label}<br/><input type={ props.type ? props.type : 'text' } {...props}/></label><br/>
    </React.Fragment>
}

export default Input