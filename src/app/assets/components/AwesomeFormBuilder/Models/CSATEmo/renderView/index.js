import React, { useState } from 'react'
import './styles.scss'
import VeryDissatisfied from '../../../../../images/svg/form-builder/csat/very_dissatisfied'
import Dissatisfied from '../../../../../images/svg/form-builder/csat/dissatisfied'
import Neutral from '../../../../../images/svg/form-builder/csat/neutral'
import Satisfied from '../../../../../images/svg/form-builder/csat/satisfied'
import VerySatisfied from '../../../../../images/svg/form-builder/csat/very_satisfied'
import CSATSelected from '../../../../../images/svg/form-builder/csat/csat-selected'

const RATING = [
    {
        label: 'Very Dissatisfied',
        component: <VeryDissatisfied/>
    },
    {
        label: 'Dissatisfied',
        component: <Dissatisfied/>
    },
    {
        label: 'Neutral',
        component: <Neutral/>
    },
    {
        label: 'Satisfied',
        component: <Satisfied/>
    },
    {
        label: 'Very Satisfied',
        component: <VerySatisfied/>
    }
]

const renderRating = props => {
    console.log("renderRating",props)
    return props.options.map((option, index) => <div 
            className   =   {`rating ${props.value == RATING[index].label ? 'active' : ''}`}
            onClick     =   {e =>  props.onClick(e, props.param_index)} 
            data-type   =   {index}
            >
                {
                    RATING[index].component
                }<br/>
                {
                    option ? option : <p>{RATING[index].label}</p> 
                }
                {
                    props.value == RATING[index].label ? <CSATSelected/> : null
                }
    </div>)
}

const View = props => {

    console.log("props.value",props)
    if(! props.parameters)
        return null
    let parametersValue = props.parameters.map(p => '')
    let [value, setValue] = useState(props.value || parametersValue)

    const onChange = (event, param_index) => {
        event.preventDefault()
        console.log(event.currentTarget)
        let index   =   event.currentTarget.getAttribute('data-type')
        let temp    =   [...value]
        temp[param_index]   = RATING[index].label
        setValue(temp)
        console.log("props.value",value)
        console.log("props.value",temp)
        if(temp.every(i => i ? true : false))
            props.onChange(props.name, temp)
    }

    return (
        <div className="render-view-container" >
            <h5>{props.label}</h5>
            <input required value={value}/>
            <div className = "parameters-grid">
                <div className="params-row-header">
                    <div className="param"></div> 
                    {
                        props.options.map((option, index) => <div 
                                className   =   {`rating header-item`}
                                >
                                    {
                                        ""
                                    }
                                    {
                                        option ? option : <p>{RATING[index].label}</p>
                                    }
                            </div>) 
                    }
                </div>
                {
                    props.parameters.map((params, param_index) => <div className="params-row">
                        <div className="param">{params}</div> 
                        {
                            renderRating({...props, onClick: onChange, value: value[param_index], param_index})
                        }
                    </div>)
                }
            </div>
        </div>
    )
}

export default View 