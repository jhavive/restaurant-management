import React, { useState, useEffect } from 'react'
import './styles.scss'
import { FORM_ITEM_TYPE } from '../constant';
import { Button } from '../../../Buttons';
import Form from '../../Form';
import { deepCopyFunction } from '../../../../../utils/object'
import { spaceToUnderscore } from '../../../../../utils/string'
import Checkbox from '../../../Checkbox';
import Input from '../../Form/FormItemView/Input'
import Close from '../../../../images/svg/close'
import connect from 'react-redux/lib/connect/connect';
import * as Actions from '../../redux/actions'

export default class NumberFormItem {

    error = true
    builderFormData = {
        type: FORM_ITEM_TYPE.NUMBER.key,
        props:{
            max: '',
            min: '',
            label: '',
            float: '',
            required: false,
        }
    }

    onChange = event  => {
        this.value = event.target.value
    }
    
    getJSON = ()  => {
        return({ [this.name]: this.value })
    }

    getObjectFromJSON = jsonObj => {
        this.builderFormData.type = FORM_ITEM_TYPE.NUMBER.key
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
        this.builderFormData.props.max =  temp.max,
        this.builderFormData.props.min =  temp.min,
        this.builderFormData.props.label =  temp.label,
        this.builderFormData.props.float =  temp.float,
        this.builderFormData.props.required =  temp.required
    }

    renderExtraView = props => {
        let ExtraView = props => {
            
            let { dispatch } = window.AwesomeFormBuilderStore
            let [max, setMax] = useState(this.builderFormData.props.max)
            let [min, setMin] = useState(this.builderFormData.props.min)
            let [label, setLabel] = useState(this.builderFormData.props.label)
            let [float, setFloat] = useState(this.builderFormData.props.float)
            let [required, setRequired] = useState(this.builderFormData.props.required)
        
            let onPropsSave = () => {
                props.onPropsSave({
                    max,
                    min,
                    label,
                    float,
                    required
                })
                dispatch(Actions.extraInfoSave())
            }
        
            useEffect(() => {
                setMax(props.max)
                setMin(props.min)
                setLabel(props.label)
                setFloat(props.float)
                setRequired(props.required)
            }, [])
        
            useEffect(() => {
                setMax(max)
                setMin(min)
                setLabel(label)
                setFloat(float)
                setRequired(required)
            }, [max, min, label, float, required])

            let onChange = (key, value) => {
                switch(key){
                    case 'label':
                        setLabel(value)
                        break
                    case 'max':
                        setMax(value)
                        break
                    case 'min':
                        setMin(value)
                        break

                }
                if(!this.error){
                    this.error = true
                    dispatch(Actions.extraInfoChange())
                }
            }
        
            return(
                <Form name={index+'extra_info'} onSave={onPropsSave}>
                    <Input label='Label' name='label'  placeholder="Enter the Lable/Heading" onChange={e => onChange('label', e.target.value)}  value={label} required/>
                    <Input type="number" label='Max' name='max'  placeholder="Enter Minimum value Accepted(Optional)" onChange={e => onChange('max', e.target.value)}  value={max}/>
                    <Input type="number" label='Min' name='min'  placeholder="Enter Maximum value Accepted(Optional)" onChange={e => onChange('min', e.target.value)}  value={min}/>
                    <Checkbox label='Required' name='required' onClick={e => setRequired(e.target.checked)} checked={required} /><br/>
                    <Checkbox label='Floating Point' name='float' onClick={e => setFloat(e.target.checked)} checked={float} />
                    <Button style_type="secondary">Save</Button>
                </Form>
            )
        }

        return <ExtraView {...props.builderFormData.props} onPropsSave={this.onPropsSave}/>
    }
    
    renderView = (props={}) => {
        return <Input 
                    type="number"
                    label={this.builderFormData.props.label} 
                    // placeholder={this.builderFormData.props.placeholder} 
                    name={this.builderFormData.props.name} 
                    value={props.value} 
                    onChange={props.onChange ? e => props.onChange(this.builderFormData.props.name, e.target.value) : this.onChange} 
                    required={this.builderFormData.props.required}
                    min={this.builderFormData.props.min}
                    max={this.builderFormData.props.max}
                    />
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
                    <label  data-type={index}>{this.label || 'Number'}</label><br/>
                    <div className="input"  data-type={index}>{this.placeholder || 'Placeholder'}</div>
                    <Close onClick={() => removeElement(index)}/>
                </div>
            )
        }

        let BuilderView = connect()(builderView)

        return <BuilderView index={index} activeIndex={activeIndex}/>
    }

}

