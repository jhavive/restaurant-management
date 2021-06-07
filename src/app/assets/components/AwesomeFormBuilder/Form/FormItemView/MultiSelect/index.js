import React, { useState, useEffect } from 'react'
import './styles.scss'

const MulitSelectView = props => {
    console.log(props.value)
    let [value, setValue] = useState(props.value || [])

    const onChange = event => {
            
        console.log(value,props,"deepCopyFunction",event.target.innerHTML)
        if (!value.includes(event.target.innerHTML)){
            let temp = JSON.parse(JSON.stringify(value))
            temp.push(event.target.innerHTML)
            setValue(temp)
            props.onChange(props.name, temp)
    
        }
        console.log(props.value)
    }

    const onRemove = event => {
        let index   = value.indexOf(event.target.innerHTML)
        let temp    = JSON.parse(JSON.stringify(value))

        temp.splice(index, 1)
        setValue(temp)
        props.onChange(props.name, temp)
    }
    return <label className="multi-select-main-label">{props.label}<br/>
        <div 
            className   =   "multi-select-view-container" 
            tabindex    =   {props.index || 0} 
            onFocus     =   {e => e.target.classList.add("active")} 
            onBlur      =   {e => e.target.classList.remove('active')}>
            <div className="multi-select">
                {
                    props.value && props.value.length ? props.value.map(v => <div 
                        className   =   "label" 
                        onClick     =   {onRemove}
                    >
                        {v}
                    </div>) : null 
                        
                }
            </div>
            <div className="dropdown">
                {
                    props.options.map(option => <p onClick={onChange}>{option}</p>)
                }
            </div>
        </div>
    </label>
}

export default MulitSelectView