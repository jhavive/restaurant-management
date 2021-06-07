import React, { useState } from 'react'
import './styles.scss'

const View = props => {

    let [value, setValue] = useState(props.value)

    const onChange = event => {
        event.preventDefault()
        console.log(event.currentTarget)
        let index   =   event.currentTarget.getAttribute('data-type')
        let temp    =   props.options[index]
        setValue(temp)
        props.onChange(props.name, temp)
    }

    return  <div className="csat-scale-view">
        <h5>{props.label}</h5>
        <input required value={value}/>
        {
            props.options.map((option, index) => (
                <div 
                    className   =   "flex flex-align-center option-row" 
                    data-type   =   {index}
                    onClick     =   {onChange}
                    >
                    <div  className   =   {`cirlce ${option == value? 'active' : ''}`} />
                    <p>{option} </p>
                </div>
            ))
        }
    </div>
}

export default View 