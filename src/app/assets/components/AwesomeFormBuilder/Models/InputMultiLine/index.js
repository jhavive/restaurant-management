import React, { useState, useEffect } from 'react'
import './styles.scss'
import { FORM_ITEM_TYPE } from '../constant';
import { Button } from '../../../Buttons';
import Form from '../../Form';
import { deepCopyFunction } from '../../../../../utils/object'
import { spaceToUnderscore } from '../../../../../utils/string'
import Checkbox from '../../../Checkbox';
import Textarea from '../../Form/FormItemView/TextArea'
import Close from '../../../../images/svg/close'
import connect from 'react-redux/lib/connect/connect';
import * as Actions from '../../redux/actions'

const Input = (props) => (
    <label>{props.label}<input type="text" {...props}/></label>
)

export default class InputMultiLineFormItem {

    error = true
    builderFormData = {
        type: FORM_ITEM_TYPE.MULTI_LINE_INPUT.key,
        props:{
            name: '',
            placeholder: '',
            label: '',
            pattern: '',
            required: false,
            maxlength: 100
        }
    }

    onChange = event  => {
        this.value = event.target.value
    }
    
    getJSON = ()  => {
        return({ [this.name]: this.value })
    }

    getObjectFromJSON = jsonObj => {
        this.builderFormData.type = FORM_ITEM_TYPE.MULTI_LINE_INPUT.key
        this.value = jsonObj.value || ''
        this.error = false
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
        this.builderFormData.props.name =  spaceToUnderscore(temp.label),
        this.builderFormData.props.placeholder =  temp.placeholder,
        this.builderFormData.props.label =  temp.label,
        this.builderFormData.props.pattern =  temp.pattern,
        this.builderFormData.props.required =  temp.required
        this.builderFormData.props.maxlength = temp.maxlength
    }

    renderExtraView = props => {
        let ExtraView = props => {
            
            let { dispatch } = window.AwesomeFormBuilderStore
            let [maxlength, setMaxlength] = useState(this.builderFormData.props.maxlength)
            let [placeholder, setPlaceholder] = useState(this.builderFormData.props.placeholder)
            let [label, setLabel] = useState(this.builderFormData.props.label)
            let [pattern, setPattern] = useState(this.builderFormData.props.pattern)
            let [required, setRequired] = useState(this.builderFormData.props.required)
        
            let onPropsSave = () => {
                props.onPropsSave({
                    maxlength,
                    placeholder,
                    label,
                    pattern,
                    required
                })
                dispatch(Actions.extraInfoSave())
            }
        
            useEffect(() => {
                console.log(maxlength, placeholder, label, pattern, required)
                setMaxlength(props.maxlength)
                setPlaceholder(props.placeholder)
                setLabel(props.label)
                setPattern(props.pattern)
                setRequired(props.required)
            }, [])
        
            useEffect(() => {
                console.log(maxlength, placeholder, label, pattern, required)
                setMaxlength(maxlength)
                setPlaceholder(placeholder)
                setLabel(label)
                setPattern(pattern)
                setRequired(required)
            }, [maxlength, placeholder, label, pattern, required])
        
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
                    case 'maxlength':
                        setMaxlength(value)

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
                    <Input label='Validation' name='pattern' placeholder="Enter Regex Pattern for Validation" onChange={e => onChange('pattern', e.target.value)} value={pattern}/>
                    <Input label='Maximum Characters' name='maxlength' placeholder="Maximum Characters(Optional)" onChange={e => onChange('maxlength', e.target.value)} value={maxlength}/>
                    <Checkbox label='Required' name='required' onClick={e => setRequired(e.target.checked)} checked={required} />
                    <Button style_type="secondary">Save</Button>
                </Form>
            )
        }

        return <ExtraView {...props.builderFormData.props} onPropsSave={this.onPropsSave}/>
    }
    
    renderView = (props={}) => {
        return <Textarea 
                    label={this.builderFormData.props.label} 
                    name={this.builderFormData.props.name} 
                    value={props.value} 
                    // onChange={e => console.log("hello")} 
                    onChange={props.onChange ? e => props.onChange(this.builderFormData.props.name, e.target.value) : this.onChange} 
                    placeholder={this.builderFormData.props.placeholder} 
                    maxlength={this.builderFormData.props.maxlength}
                    rows="4" cols="50"
                    />
    }
    
    renderBuilderView = (index, activeIndex) => {
        let builderView = props => {
            let { index, activeIndex } = props

            let removeElement = e => {
                let { dispatch } = window.AwesomeFormBuilderStore
                dispatch(Actions.removeElement(index))
            }

            
            return( 
                <div className={ `${(activeIndex==index) ? 'input-builder-view-active' : 'input-builder-view'} ${this.error ? 'error-case' : ''}`} data-type={index}>
                    <label  data-type={index}>{this.label || 'Multi Line'}</label><br/>
                    {/* <div className="input"  data-type={index}>{this.placeholder || 'Placeholder'}</div> */}
                    <textarea className="input" rows="4" cols="50" data-type={index} disabled>{this.placeholder || 'Placeholder'}</textarea>
                    <Close onClick={() => removeElement(index)}/>
                </div>
            )
        }

        let BuilderView = connect()(builderView)

        return <BuilderView index={index} activeIndex={activeIndex}/>
    }
    
}