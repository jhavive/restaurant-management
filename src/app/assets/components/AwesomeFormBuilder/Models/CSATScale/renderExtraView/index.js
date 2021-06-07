import React, { useState, useEffect } from 'react'
import './styles.scss'
import { Button } from '../../../../Buttons'
import Form from '../../../Form'
import Input from '../../../Form/FormItemView/Input'
import Checkbox from '../../../../Checkbox'
import * as Actions from '../../../redux/actions'

const ExtraViewComponent = props => {
            
    let { dispatch } = window.AwesomeFormBuilderStore
    let [name, setName]             = useState(props.name)
    let [options, setOptions]       = useState(props.options)
    let [label, setLabel]           = useState(props.label)
    let [required, setRequired]     = useState(props.required)
    let [tooltip, setTooltip]       = useState(props.tooltip)

    let onPropsSave = () => {
        props.onPropsSave({
            name,
            options,
            label,
            required,
            tooltip
        })
        dispatch(Actions.extraInfoSave())
    }

    useEffect(() => {
        setName(name)
        setOptions(options)
        setLabel(label)
        setRequired(required)
        setTooltip(tooltip)
    }, [])

    useEffect(() => {
        setName(name)
        setOptions(options)
        setLabel(label)
        setRequired(required)
        setTooltip(tooltip)
    }, [name, options, label, required, tooltip])

    let onChange = (key, value, id=0) => {
        switch(key){
            case 'label':
                setLabel(value)
                break
            case 'options':
                let temp = JSON.parse(JSON.stringify(options))
                temp[id] = value
                setOptions(temp)
                break

        }
        if(!error){
            dispatch(Actions.extraInfoChange())
        }
    }

    return(
        <Form name={index+'extra_info'} onSave={onPropsSave}>
            <Input 
                label           =   'Question' 
                name            =   'label' 
                onChange        =   {e => onChange('label', e.target.value)} 
                value           =   {label}  
                placeholder     =   "Enter Question" required/>
            <div className="hr"/>
            <label>Dropdown Options</label>
            {
                options.map((option, i) => <div style={{'display':'flex'}}>
                    <Input 
                        value           =   {option} 
                        name            =   "options" 
                        onChange        =   {(e) => onChange('options', e.target.value, i)} 
                        required    
                        style           =   {{marginBottom:"0px"}}  
                        placeholder     =   {`Choice ${i+1}`}/>
                </div>)
            }
            <br/>
            <Checkbox 
                label       =   'Required' 
                name        =   'required' 
                onClick     =   {e => setRequired(e.target.checked)} 
                checked     =   {required} 
                />
                <br/>
            <Button style_type="secondary">Save</Button>
        </Form>
    )
}

export default ExtraViewComponent 