import React, { useState, useEffect } from 'react'
import './styles.scss'
import { FORM_ITEM_TYPE } from '../constant';
import { Button } from '../../../Buttons';
import Form from '../../Form';
import { deepCopyFunction } from '../../../../../utils/object'
import Checkbox from '../../../Checkbox'
import { spaceToUnderscore } from '../../../../../utils/string'
import Input from '../../Form/FormItemView/Input'
import Close from '../../../../images/svg/close'
import connect from 'react-redux/lib/connect/connect';
import * as Actions from '../../redux/actions'

export default class InputFormItem {

    error = true
    builderFormData = {
        type: FORM_ITEM_TYPE.TEXT_INPUT.key,
        props:{
            name: '',
            placeholder: '',
            label: '',
            pattern: '',
            required: false,
            tooltip: false
        }
    }

    onChange = event  => {
        this.value = event.target.value
    }
    
    getJSON = ()  => {
        return({ [this.name]: this.value })
    }

    getObjectFromJSON = jsonObj => {
        this.builderFormData.type = FORM_ITEM_TYPE.TEXT_INPUT.key
        this.value = jsonObj.value || ''
        // this.error = false
        // this.builderFormData.props = deepCopyFunction(jsonObj.props)
    }
    
    getBuilderJSON = ()  => {
        return this.builderFormData
    }
    
    getMeta = ()  => {
        return this.builderFormData.props
    }

    onPropsSave = temp => {
        this.error = false
        this.builderFormData.props.name         =   spaceToUnderscore(temp.label),
        this.builderFormData.props.placeholder  =   temp.placeholder,
        this.builderFormData.props.label        =   temp.label,
        this.builderFormData.props.pattern      =   temp.pattern,
        this.builderFormData.props.required     =   temp.required
    }

    renderExtraView = props => {
        let extraView = props => {

            let { dispatch }                    =   window.AwesomeFormBuilderStore
            let [name, setName]                 =   useState(this.builderFormData.props.name)
            let [placeholder, setPlaceholder]   =   useState(this.builderFormData.props.placeholder)
            let [label, setLabel]               =   useState(this.builderFormData.props.label)
            let [pattern, setPattern]           =   useState(this.builderFormData.props.pattern)
            let [required, setRequired]         =   useState(this.builderFormData.props.required)
        
            let onPropsSave = () => {
                props.onPropsSave({
                    name,
                    placeholder,
                    label,
                    pattern,
                    required
                })
                dispatch(Actions.extraInfoSave())
            }
        
            useEffect(() => {
                console.log(name, placeholder, label, pattern, required)
                setName(props.name)
                setPlaceholder(props.placeholder)
                setLabel(props.label)
                setPattern(props.pattern)
                setRequired(props.required)
            }, [])
        
            useEffect(() => {
                console.log(name, placeholder, label, pattern, required)
                setName(name)
                setPlaceholder(placeholder)
                setLabel(label)
                setPattern(pattern)
                setRequired(required)
            }, [name, placeholder, label, pattern, required])

            let onChange = (key, value) => {
                switch(key){
                    case 'label':
                        setLabel(value)
                        break
                    case 'placeholder':
                        setPlaceholder(value)
                        break
                    case 'pattern':
                        setPattern(value)
                        break

                }
                if(!this.error){
                    this.error = true
                    dispatch(Actions.extraInfoChange())
                }
            }
        
            return(
                <Form name={index+'extra_info'} onSave={onPropsSave}>
                    <Input 
                        label           =   'Label' 
                        name            =   'label' 
                        placeholder     =   "Enter the Lable/Heading" 
                        onChange        =   {e => onChange('label', e.target.value)} value={label} 
                        required/>
                    <Input 
                        label           =   'Placeholder' 
                        name            =   'placeholder' 
                        placeholder     =   "Enter Placeholder" 
                        onChange        =   {e => onChange('placeholder', e.target.value)} value={placeholder} 
                        required/>
                    <Input 
                        label           =   'Validation' 
                        name            =   'pattern' 
                        placeholder     =   "Enter Regex Pattern for Validation" 
                        onChange        =   {e => onChange('pattern', e.target.value)} 
                        value           =   {pattern}/>
                    <Checkbox 
                        label       =   'Required' 
                        name        =   'required' 
                        onClick     =   {e => setRequired(e.target.checked)} 
                        checked     =   {required} />
                    <Button style_type="secondary">Save</Button>
                </Form>
            )
        }

        let ExtraView = connect()(extraView)

        return <ExtraView {...props.builderFormData.props} onPropsSave={this.onPropsSave}/>
    }
    
    renderView = (props = {})  => {
        return <Input 
                type            =   "text" 
                label           =   {this.builderFormData.props.label} 
                placeholder     =   {this.builderFormData.props.placeholder} 
                name            =   {this.builderFormData.props.name} 
                value           =   {props.value} 
                onChange        =   {props.onChange ? e => props.onChange(this.builderFormData.props.name, e.target.value) : this.onChange} 
                required        =   {this.builderFormData.props.required} />
    }
    
    renderBuilderView = (index, activeIndex) => {
        console.log(index, activeIndex)

        let builderView = props => {
            let { index, activeIndex } = props

            let removeElement = e => {
                let { dispatch } = window.AwesomeFormBuilderStore
                dispatch(Actions.removeElement(index))
            }

            return( 
                <div className={ `${(activeIndex==index) ? 'input-builder-view-active' : 'input-builder-view'} ${this.error ? 'error-case' : ''}`} data-type={index}>
                    <label  data-type={index}>{this.label || 'Input'}</label><br/>
                    <div className="input"  data-type={index}>{this.placeholder || 'Placeholder'}</div>
                    <Close onClick={() => removeElement(index)}/>
                </div>
            )
        }

        let BuilderView = connect()(builderView)

        return <BuilderView index={index} activeIndex={activeIndex}/>
    }


}

