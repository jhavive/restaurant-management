import React, { useState, useEffect } from 'react'
import './styles.scss'
import { Button } from '../../../../Buttons';
import Form from '../../../Form';
import Input from '../../../Form/FormItemView/Input'
import Checkbox from '../../../../Checkbox';
import * as Actions from '../../../redux/actions'

const ExtraViewComponent = props => {
            
    let { dispatch }                =   window.AwesomeFormBuilderStore
    let [name, setName]             =   useState(props.name)
    let [label, setLabel]           =   useState(props.label)
    let [required, setRequired]     =   useState(props.required)

    let onPropsSave = () => {
        props.onPropsSave({
            name,
            label,
            required,
        })
        dispatch(Actions.extraInfoSave())
    }

    useEffect(() => {
        setName(name)
        setLabel(label)
        setRequired(required)
    }, [])

    useEffect(() => {
        setName(name)
        setLabel(label)
        setRequired(required)
    }, [name, label, required])


    let onChange = (key, value, id=0) => {
        setLabel(value)
        if(!error){
            dispatch(Actions.extraInfoChange())
        }
    }

    return(
        <Form 
            name    =   {index+'extra_info'} 
            onSave  =   {onPropsSave}
            >
                <Input 
                    label           =   'Label' 
                    name            =   'label' 
                    onChange        =   {e => onChange('label', e.target.value)} value={label}  
                    placeholder     =   "Enter the Lable/Heading" 
                    required
                    />
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