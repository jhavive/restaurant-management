import InputFormItem from '../Model/Input'
import InputMultiLineFormItem from '../Model/InputMultiLine'
import CheckboxFormItem from '../Model/Checkbox'
// import InputFormItem from '../Model/Input'
// import InputFormItem from '../Model/Input'
// import InputFormItem from '../Model/Input'
// import InputFormItem from '../Model/Input'
// import InputFormItem from '../Model/Input'
// import InputFormItem from '../Model/Input'
import { FORM_ITEM_TYPE } from '../constants'
import { deepCopyFunction } from '../../../../utils/object'

export default class FormFactory {
    createFormItem = (type, name) => {
        console.log('createFormItem',type)
        switch(type) {
                case FORM_ITEM_TYPE.TEXT_INPUT.key:
                    return(
                        new InputFormItem({type:""})
                    )
                case FORM_ITEM_TYPE.MULTI_LINE_INPUT.key:
                    return(
                        new InputMultiLineFormItem({type:""})
                    )
                case FORM_ITEM_TYPE.NUMBER.key:
                    return(
                        new InputFormItem()
                    )
                case FORM_ITEM_TYPE.DROPDOWN.key:
                    return(
                        new InputFormItem()
                    )
                case FORM_ITEM_TYPE.MULTI_SELECT.key:
                    return(
                        new InputFormItem()
                    )
                case FORM_ITEM_TYPE.CHECKBOX.key:
                    return(
                        new CheckboxFormItem({type:""})
                    )
                case FORM_ITEM_TYPE.EMAIL.key:
                    return(
                        new InputFormItem()
                    )
                case FORM_ITEM_TYPE.PHONE.key:
                    return(
                        new InputFormItem()
                    )
                case FORM_ITEM_TYPE.DATE.key:
                    return(
                        new InputFormItem()
                    )
                case FORM_ITEM_TYPE.FILE.key:
                    return(
                        new InputFormItem()
                    )
                default:
                    return(
                        new InputFormItem()
                    )
        }
    }
}