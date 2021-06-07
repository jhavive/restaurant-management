import React, { useState, useEffect } from 'react'
import './styles.scss'
import { FORM_ITEM_TYPE } from '../constant';
import { Button } from '../../../Buttons';
import Form from '../../Form';
import Input from '../../Form/FormItemView/Input'
import Checkbox from '../../../Checkbox';
import Dropdown from '../../Form/FormItemView/Dropdown'
import Close from '../../../../images/svg/close'
import connect from 'react-redux/lib/connect/connect';
import { deepCopyFunction } from '../../../../../utils/object'
import * as Actions from '../../redux/actions'

export default class FileFormItem {

    error = true
    builderFormData = {
        type: FORM_ITEM_TYPE.FILE.key,
        props:{
            name: '',
            label: '',
            accept: '',
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
        this.builderFormData.type = FORM_ITEM_TYPE.FILE.key
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
        this.error = false
        console.log(temp)
        this.builderFormData.props.label =  temp.label,
        this.builderFormData.props.required =  temp.required
        this.builderFormData.props.accept = temp.accept
        this.builderFormData.props.maximum = temp.maximum
    }

    renderExtraView = props => {
        console.log(this)
        let ExtraView = props => {

            let { dispatch } = window.AwesomeFormBuilderStore
            let [maximum, setMaximum] = useState(this.builderFormData.props.maximum)
            let [label, setLabel] = useState(this.builderFormData.props.label)
            let [accept, setAccept] = useState(this.builderFormData.props.accept)
            let [required, setRequired] = useState(this.builderFormData.props.required)
            
            let onPropsSave = () => {
                props.onPropsSave({
                    maximum,
                    label,
                    accept,
                    required,
                })
                dispatch(Actions.extraInfoSave())
            }
        
            useEffect(() => {
                setMaximum(maximum)
                setLabel(label)
                setRequired(required)
                setAccept(accept)
            }, [])
        
            useEffect(() => {
                setMaximum(maximum)
                setLabel(label)
                setRequired(required)
                setAccept(accept)
            }, [maximum, label, required, accept])

            let onChange = (key, value) => {
                switch(key){
                    case 'label':
                        setLabel(value)
                        break
                    case 'maximum':
                        setMaximum(value)
                        break
                    case 'accept':
                        setAccept(value)
                        break

                }
                if(!this.error){
                    this.error = true
                    dispatch(Actions.extraInfoChange())
                }
            }

            return(
                <Form name={index+'extra_info'} onSave={onPropsSave}>
                    <Input label='Label' name='label' onChange={e => onChange('label', e.target.value)} value={label}  placeholder="Enter the Lable/Heading" required/>
                    <Input label='Maximum Bulk Upload' name='maximum' type="number" onChange={e => onChange('maximum', e.target.value)} value={maximum}  placeholder="One File" />
                    <Input label='Acceptable Files' name='accept' onChange={e => onChange('accept', e.target.value)} value={accept}  placeholder="Acceptable Files (Optional)" />
                    <Checkbox label='Required' name='required' onClick={e => setRequired(e.target.checked)} checked={required} /><br/>
                    <Button style_type="secondary">Save</Button>
                </Form>
            )
        }

        return <ExtraView {...props.builderFormData.props} onPropsSave={this.onPropsSave}/>
    }
    
    renderView = (props={}) => {
        return <Input 
            type="file"
            label={this.builderFormData.props.label}
            name={this.builderFormData.props.name} 
            value={this.value} 
            onChange={props.onChange ? e => props.onChange(this.builderFormData.props.name, e.target.files) : this.onChange}
            accept={this.builderFormData.props.accept}
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
                <div  className={ `${(activeIndex==index) ? 'dropdown-builder-view-active' : 'dropdown-builder-view'} ${this.error ? 'error-case' : ''}`} data-type={index}>
                    <label  data-type={index}>{this.label || 'File Upload'}</label><br/>
                    <Dropdown disabled data-type={index}><option>Upload to</option><option>2</option></Dropdown>
                    <Close onClick={() => removeElement(index)}/>
                </div>
            )
        }

        let BuilderView = connect()(builderView)

        return <BuilderView index={index} activeIndex={activeIndex}/>
    }

}

