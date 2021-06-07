import React from 'react'
import './styles.scss'

const Dropdown = props => <React.Fragment>
    <div className="dropdown-container">
        <label className="label">{props.label} </label>
        <select {...props}>
            {
                props.children
            }
        </select>
    </div>
    <br/>
</React.Fragment>

// const Dropdown = props => <label className="dropdown-container">
//     {props.label}<br/>
//     <select {...props}>
//         {
//             props.children
//         }
//     </select>
// </label>

export default Dropdown 