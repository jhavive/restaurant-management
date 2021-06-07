import React from 'react'
import './styles.scss'
import { BaseFormItem } from "../base";
import { FORM_ITEM_TYPE } from '../../constants';
import InputFormItem from '../Input'

const Checkbox = (props) => <div className="checkbox-container">{ props.options.map(option => <Option {...props} label={option.label} checked={option.checked}/>) }</div>

const Option = props => <div className="options-container"><input type="checkbox" {...props} disabled/><label>{props.label}</label><br/></div>

export default class CheckboxFormItem extends BaseFormItem {

    props = []
    options = []

    constructor(options) {
        console.log(options)
        options.type = FORM_ITEM_TYPE.CHECKBOX.key
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

    onClick = event => {
        this.checked = event.target.checked
    }

    getJSON = () => {
        return({ [this.name]: this.value })
    }

    getBuilderJSON = () => {
        return this
    }

    getMeta = () => {
        return this.props
    }

    renderView = options => {
        // return <Input {...options} label={this.label} name={this.name} value={this.value} onChange={this.onChange.bind(this)}/>
        return <Checkbox name={this.name} options={this.options} onClick={this.onClick.bind(this)}/>
    }

    renderBuilderView = (index, activeIndex) => {
        return( 
            <div className={(activeIndex==index) ? 'input-builder-view-active' : `input-builder-view`} data-type={index}>
                <label className="unset" data-type={index}>{this.label || 'Label'}</label><br/>
                {/* <div className="input"  data-type={index}>{this.placeholder || 'Placeholder'}</div> */}
                {/* <textarea className="input" rows="4" cols="50" data-type={index} disabled>{this.placeholder || 'Placeholder'}</textarea> */}
                <Checkbox name={this.name} options={[{label: 'Checkbox',checked: false},{label: 'Checkbox',checked: true}]}/>
            </div>
        )
    }
}
