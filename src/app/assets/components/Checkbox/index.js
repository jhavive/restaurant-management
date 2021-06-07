import React from 'react'
import './styles.scss'

const Checkbox = (props) => {
    if(props.name){
        return(
            <div className="checkbox-container" onClick={(e) => console.log(e.target)}>
                <input type="checkbox" {...props} id={props.name ? props.name : props.key} />
                <label for={props.name ? props.name: props.key}>{props.label}</label>
            </div>
        )
    } else {
        return(
            <p>props.name is mandatory</p>
        )
    }
}

export default Checkbox 