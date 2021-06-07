import { FORM_ITEM_TYPE } from '../Models/constant'
import InputFormItem from '../Models/Input'
import InputMultiLineFormItem from '../Models/InputMultiLine'
import CheckboxFormItem from '../Models/Checkbox'
import DropdownFormItem from '../Models/DropDown'
import NumberFormItem from '../Models/InputNumber'
import EmailFormItem from '../Models/InputEmail'
import DateFormItem from '../Models/InputDate'
import PhoneFormItem from '../Models/InputPhone'
import MulitSelectFormItem from '../Models/MultiSelect'
import FileFormItem from '../Models/File'
import NPSScaleFormItem from '../Models/NPSScale'
import CSATScaleFormItem from '../Models/CSATScale'
import CSATEmoFormItem from '../Models/CSATEmo'
import { deepCopyFunction } from '../../../../utils/object'

export const getFormItem = key => {
    switch(key){
        case FORM_ITEM_TYPE.TEXT_INPUT.key: return new InputFormItem()
        case FORM_ITEM_TYPE.MULTI_LINE_INPUT.key: return new InputMultiLineFormItem()
        case FORM_ITEM_TYPE.NUMBER.key: return new NumberFormItem()
        case FORM_ITEM_TYPE.DROPDOWN.key:  return new DropdownFormItem()
        case FORM_ITEM_TYPE.MULTI_SELECT.key: return new MulitSelectFormItem()
        case FORM_ITEM_TYPE.CHECKBOX.key: return new CheckboxFormItem()
        case FORM_ITEM_TYPE.EMAIL.key: return new EmailFormItem()
        case FORM_ITEM_TYPE.PHONE.key: return new PhoneFormItem()
        case FORM_ITEM_TYPE.DATE.key: return new DateFormItem()
        case FORM_ITEM_TYPE.FILE.key: return new FileFormItem()
        case FORM_ITEM_TYPE.NPS.key: return new NPSScaleFormItem()
        case FORM_ITEM_TYPE.CSAT_EMO.key: return new CSATEmoFormItem()
        case FORM_ITEM_TYPE.CSAT_SCALE.key: return new CSATScaleFormItem()
        default: return new InputFormItem()
    }
}

export const getJSONFromObject = formItems => {
    return formItems.map(formItem => formItem.getBuilderJSON())
}

export const getObjectFromJSON = response => {
    return response.map(formItem => {
        console.log(3, formItem)
        let item = getFormItem(formItem.type)
        console.log(4)
        item.getObjectFromJSON(formItem)
        item.error = false
        item.builderFormData.props = formItem.props
        console.log(item)
        return item
    })
}

export const getResponseJSON = formItems => {
    let response = {}
    formItems.forEach(formItem => {
        console.log(formItem)
        response[formItem.builderFormData.props.name] = formItem.name
    })
    return response
}