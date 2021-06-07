import React from 'react'
import './styles.scss'

const Textarea = (props) => {
    console.log("Input props", props)
    return <React.Fragment>
        <label className="input-container">{props.label}<textarea {...props}/></label><br/>
    </React.Fragment>
}

export default Textarea