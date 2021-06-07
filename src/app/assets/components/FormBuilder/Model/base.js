export class BaseFormItem {
    constructor(props) {
        if(props.type)
            this.type = props.type
        else
            throw new Error('Form Type Required')
        this.value = props.value
        props.name ? this.name = props.name : ''
        props.label ? this.label = props.label : ''
    }

}

BaseFormItem.prototype.changeValue = (value) => {
    this.value = value
}