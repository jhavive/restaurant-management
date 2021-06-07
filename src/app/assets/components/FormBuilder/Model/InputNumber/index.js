import React from 'react'
import './styles.scss'
import { BaseFormItem } from "../base";
import { FORM_ITEM_TYPE } from '../../constants';
import InputFormItem from '../Input'

const Input = (props) => (
    <label>{props.label}<input type="text" {...props}/></label>
)

export default class InputMultiLineFormItem extends BaseFormItem {

    props = []

    constructor(options) {
        console.log(options)
        options.type = FORM_ITEM_TYPE.MULTI_LINE_INPUT.key
        super(options)
        if(!options.metaLock){
            let name = new InputFormItem({
                name: 'name',
                placeholder: 'Name',
                label: 'Name',
                metaLock: true
            })
            this.props.push(name)

            let placeholder = new InputFormItem({
                name: 'placeholder',
                placeholder: 'Placeholder',
                label: 'Placeholder',
                metaLock: true
            })
            this.props.push(placeholder)
            
            let Label = new InputFormItem({
                name: 'label',
                placeholder: 'Label',
                label: 'Label',
                metaLock: true
            })
            this.props.push(Label)
        }
    }
}

InputMultiLineFormItem.prototype.onChange = function(event) {
    this.value = event.target.value
}

InputMultiLineFormItem.prototype.getJSON = function() {
    return({ [this.name]: this.value })
}

InputMultiLineFormItem.prototype.getBuilderJSON = function() {
    return this
}

InputMultiLineFormItem.prototype.getMeta = function() {
    return this.props
}

InputMultiLineFormItem.prototype.renderView = function(options) {
    return <Input {...options} label={this.label} name={this.name} value={this.value} onChange={this.onChange.bind(this)}/>
}

InputMultiLineFormItem.prototype.renderBuilderView = function(index, activeIndex){
    return( 
        <div className={(activeIndex==index) ? 'input-builder-view-active' : `input-builder-view`} data-type={index}>
            <label  data-type={index}>{this.label || 'Label'}</label><br/>
            {/* <div className="input"  data-type={index}>{this.placeholder || 'Placeholder'}</div> */}
            <textarea className="input" rows="4" cols="50" data-type={index} disabled>{this.placeholder || 'Placeholder'}</textarea>
        </div>
    )
}