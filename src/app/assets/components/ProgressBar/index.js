import React from 'react'
import './styles.scss'

const ProgressBar = props => <div className="progress-bar-container">
    <h2>{props.width} Completed</h2>
    <div className="progress-bar-component">
        <div className="progress" style={{width: props.width}}/>
    </div>
</div>

export default ProgressBar 