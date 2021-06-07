import React, { useState, useEffect } from 'react'
import './styles.scss'
import { FORM_ITEM_TYPE } from '../constant';
import { Button } from '../../../Buttons';
import Form from '../../Form'
import Input from '../../Form/FormItemView/Input'
import { deepCopyFunction } from '../../../../../utils/object'
import Checkbox from '../../../Checkbox';
import { spaceToUnderscore } from '../../../../../utils/string'
import Phone from '../../Form/FormItemView/PhoneInput'
import Close from '../../../../images/svg/close'
import connect from 'react-redux/lib/connect/connect';
import * as Actions from '../../redux/actions'

export default class PhoneFormItem {

    error = true
    builderFormData = {
        type: FORM_ITEM_TYPE.PHONE.key,
        props:{
            label: '',
            placeholder: '',
            required: false,
            countryCode: '91'
        }
    }

    onChange = event  => {
        this.value = event.target.value
    }

    onCountryCodeChange = event => {
        this.countryCode = event.target.value
    }
    
    getJSON = ()  => {
        return({ [this.name]: this.value })
    }

    getObjectFromJSON = jsonObj => {
        this.builderFormData.type = FORM_ITEM_TYPE.PHONE.key
        this.value = jsonObj.value || ''
        this.error = false
        this.builderFormData.props = jsonObj.props
    }
    
    getBuilderJSON = ()  => {
        return this.builderFormData
    }
    
    getMeta = ()  => {
        return this.builderFormData.props
    }

    onPropsSave = temp => {
        this.error = false
        this.builderFormData.props.label =  temp.label,
        this.builderFormData.props.name =  spaceToUnderscore(temp.label),
        this.builderFormData.props.placeholder = temp.placeholder
        this.builderFormData.props.required =  temp.required
    }

    renderExtraView = props => {
        let ExtraView = props => {
            
            let { dispatch } = window.AwesomeFormBuilderStore
            let [label, setLabel] = useState(this.builderFormData.props.label)
            let [placeholder, setPlaceholder] = useState(this.builderFormData.props.placeholder)
            let [required, setRequired] = useState(this.builderFormData.props.required)
        
            let onPropsSave = () => {
                props.onPropsSave({
                    label,
                    placeholder,
                    required
                })
                dispatch(Actions.extraInfoSave())
            }
        
            useEffect(() => {
                setLabel(props.label)
                setPlaceholder(props.placeholder)
                setRequired(props.required)
            }, [])
        
            useEffect(() => {
                setLabel(label)
                setPlaceholder(placeholder)
                setRequired(required)
            }, [label, placeholder, required])

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
                    <Input label='Label' name='label' placeholder="Enter the Lable/Heading" onChange={e => onChange('label', e.target.value)} value={label} required/>
                    <Input label='Placeholder' name='placeholder' placeholder="Enter Placeholder" onChange={e => onChange('placeholder', e.target.value)} value={placeholder} required/>
                    <Checkbox label='Required' name='required' onClick={e => setRequired(e.target.checked)} checked={required} /><br/>
                    <Button style_type="secondary">Save</Button>
                </Form>
            )
        }

        return <ExtraView {...props.builderFormData.props} onPropsSave={this.onPropsSave}/>
    }
    
    renderView = (props={}) => {
        return <Phone 
                    label={this.builderFormData.props.label} 
                    name={this.builderFormData.props.name} 
                    value={props.value} 
                    onChange={props.onChange ? e => props.onChange(this.builderFormData.props.name, e.target.value) : this.onChange} 
                    onCountryCodeChange={this.onCountryCodeChange}/>
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
                    <label  data-type={index}>{this.label || 'Phone'}</label><br/>
                    <div className="input"  data-type={index}><div className="country-code">+91</div>{this.placeholder || 'Placeholder'}</div>
                    <Close onClick={() => removeElement(index)}/>
                </div>
            )
        }

        let BuilderView = connect()(builderView)

        return <BuilderView index={index} activeIndex={activeIndex}/>
    }

}

