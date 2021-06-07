import React, { useState, useEffect } from 'react'
import './styles.scss'
import { FORM_ITEM_TYPE } from '../constant';
import { Button } from '../../../Buttons';
import Form from '../../Form';
import Input from '../../Form/FormItemView/Input'
import Checkbox from '../../../Checkbox';
import { MinusCircle, PlusCircle } from 'react-feather'
import { spaceToUnderscore } from '../../../../../utils/string'
import { deepCopyFunction } from '../../../../../utils/object'
import Close from '../../../../images/svg/close'
import connect from 'react-redux/lib/connect/connect';
import * as Actions from '../../redux/actions'

export default class CheckboxFormItem {

    error = true
    value = []
    builderFormData = {
        type: FORM_ITEM_TYPE.CHECKBOX.key,
        props:{
            name: '',
            options: [''],
            label: '',
            validation: '',
            required: false,
            tooltip: false
        }
    }

    onChange = value => {
        this.value = value
    }
    
    getJSON = ()  => {
        return({ [this.name]: this.value })
    }

    getObjectFromJSON = jsonObj => {
        this.builderFormData.type = FORM_ITEM_TYPE.CHECKBOX.key
        this.value = jsonObj.value || []
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
        console.log(temp)
        this.error = false
        this.builderFormData.props.name =  spaceToUnderscore(temp.label),
        this.builderFormData.props.options =  temp.options,
        this.builderFormData.props.label =  temp.label,
        this.builderFormData.props.validation =  temp.validation,
        this.builderFormData.props.required =  temp.required
        this.builderFormData.props.tooltip = temp.tooltip
    }

    renderExtraView = props => {
        console.log(this)
        let ExtraView = props => {
            
            let { dispatch } = window.AwesomeFormBuilderStore
            let [name, setName] = useState(this.builderFormData.props.name)
            let [options, setOptions] = useState(this.builderFormData.props.options)
            let [label, setLabel] = useState(this.builderFormData.props.label)
            let [validation, setValidation] = useState(this.builderFormData.props.validation)
            let [required, setRequired] = useState(this.builderFormData.props.required)
            let [tooltip, setTooltip] = useState(this.builderFormData.props.tooltip)
        
            let onPropsSave = () => {
                props.onPropsSave({
                    name,
                    options,
                    label,
                    validation,
                    required,
                    tooltip
                })
                dispatch(Actions.extraInfoSave())
            }
        
            useEffect(() => {
                setName(name)
                setOptions(options)
                setLabel(label)
                setValidation(validation)
                setRequired(required)
                setTooltip(tooltip)
            }, [])
        
            useEffect(() => {
                setName(name)
                setOptions(options)
                setLabel(label)
                setValidation(validation)
                setRequired(required)
                setTooltip(tooltip)
            }, [name, options, label, validation, required, tooltip])


            let removeOption = id => {
                let t = JSON.parse(JSON.stringify(options))
                if(t.length > 1){
                    t.splice(id, 1)
                    setOptions(t)
                }
            }

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
                if(!this.error){
                    this.error = true
                    dispatch(Actions.extraInfoChange())
                }
            }

            let addOptions = () => {
                setOptions([...options, ''])
                if(!this.error){
                    this.error = true
                    dispatch(Actions.extraInfoChange())
                }
            }
        
            return(
                <Form name={index+'extra_info'} onSave={onPropsSave}>
                    <Input label='Label' name='label' onChange={e => onChange('label', e.target.value)} value={label}  placeholder="Enter the Lable/Heading" required/>
                    <label>Checkbox Options</label>
                    {
                        options.map((option, i) => <div style={{'display':'flex'}}>
                            <Input value={option} name="options" onChange={(e) => onChange('options', e.target.value, i)} required style={{marginBottom:"0px"}} placeholder={`Choice ${i+1}`}/>
                            { 
                                i === 0 && options.length == 1 ? <PlusCircle onClick={e => addOptions()}/> : null
                            }
                            { 
                                i > 0 && i === options.length -1 ? <React.Fragment><PlusCircle onClick={e => addOptions()}/><MinusCircle onClick={e => removeOption(i)}/></React.Fragment> : <MinusCircle onClick={e => removeOption(i)}/>
                            }
                        </div>)
                    }
                    <br/>
                    <Checkbox label='Required' name='required' onClick={e => setRequired(e.target.checked)} checked={required} /><br/>
                    {/* <Checkbox label='Tooltip' name='tooltip' onClick={e => setTooltip(e.target.checked)} checked={tooltip} /> */}
                    <Button style_type="secondary">Save</Button>
                </Form>
            )
        }

        return <ExtraView {...props.builderFormData.props} onPropsSave={this.onPropsSave}/>
    }
    
    renderView = (props={}) => {

        const CheckboxView = props => {
            
            let [value, setValue] = useState(props.value)

            const onChange = event => {
                event.preventDefault()
                console.log(props,"deepCopyFunction",event.target.innerHTML)
                let temp = JSON.parse(JSON.stringify(value))
                if (value.includes(event.target.innerHTML)){
                    let index = value.indexOf(event.target.innerHTML)
                    temp.splice(index, 1)
                } else {
                    temp.push(event.target.innerHTML)
                }
                console.log("deepCopyFunction",temp)
                setValue(temp)
                props.onChange ? props.onChange(this.builderFormData.props.name, temp) : this.onChange(temp)
            }
            return (
                <div onClick={onChange}>
                { 
                    this.builderFormData.props.options.map((option,index) => <React.Fragment>
                        <Checkbox id={this.builderFormData.props.name+""+index} key={index} label={option} value={option} name={this.builderFormData.props.name} checked={props.value && props.value.includes(option)}/>
                    </React.Fragment>)
                }
                </div>
            )
        }

        return <React.Fragment><br/><label className="checkbox-main-label">{this.builderFormData.props.label}<br/><CheckboxView {...props}/></label><br/></React.Fragment>
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
                <div className={ `${(activeIndex==index) ? 'checkbox-builder-view-active' : 'checkbox-builder-view'} ${this.error ? 'error-case': ''}`} data-type={index}>
                    <label  data-type={index}>{this.label || 'Checkbox'}</label><br/>
                    <div className="checkbox-container" data-type={index}>
                        <input className="input" type="checkbox" checked data-type={index}/><label>Checkbox</label>
                    </div>
                    <div className="checkbox-container" data-type={index}>
                        <input className="input" type="checkbox" data-type={index} /><label>Checkbox</label>
                    </div>
                    <Close onClick={() => removeElement(index)}/>
                </div>
            )
        }

        let BuilderView = connect()(builderView)

        return <BuilderView index={index} activeIndex={activeIndex}/>
    }
}

