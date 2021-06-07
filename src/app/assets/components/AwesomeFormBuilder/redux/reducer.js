import * as Constants from './constants'
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
import CSATEmoFormItem from '../Models/CSATEmo'
import CSATScaleFormItem from '../Models/CSATScale'


   
const reducer = props => {

    console.log("getFormItem")
    const defaultState = {
        moduleName: '',
        moduleNameError: false,
        formItems: [],
        selectedItem: 0,
        enableSubmit: false,
        ...props
    }

    const getFormItem = key => {


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
            case FORM_ITEM_TYPE.CSAT_EMO.key: return new CSATEmoFormItem()
            case FORM_ITEM_TYPE.CSAT_SCALE.key: return new CSATScaleFormItem()
            default: return new InputFormItem()
        }
    }
    
    const getJSONFromObject = formItems => {
        return formItems.map(formItem => formItem.getBuilderJSON())
    }
    
    const getObjectFromJSON = response => {
        return response.map(formItem => formItem.getBuilderJSON())
    }

    const checkFormItemsError = formItems => {
        for( let i = 0 ; i < formItems.length ; i++ ){
            if(formItems[i].error){
                return false
            } 
        }
        return true
    }

    return (state = defaultState, action) => {

        switch (action.type) {
            case Constants.CHANGE_NAME:
                return {
                    ...state,
                    moduleName: action.data,
                    moduleNameError: false
                }
            case Constants.ADD_FORM_ITEM:
                return {
                    ...state,
                    formItems: [...state.formItems, getFormItem(action.data)],
                    enableSubmit: false
                }
            case Constants.EXTRA_INFO_CHANGE:
                return {
                    ...state,
                    enableSubmit: false
                }
            case Constants.EXTRA_INFO_SAVE:
                let temp = state.formItems
                temp[state.selectedItem].error = false
                console.log(state.formItems)
                return {
                    ...state,
                    enableSubmit: checkFormItemsError(temp),
                    formItems: temp,
                    selectedItem: -1
                }
            case Constants.SELECT_FORM_ITEM:
                return {
                    ...state,
                    selectedItem: action.data
                }
            case Constants.SAVE_JSON:
                if(state.moduleName){

                    let json = getJSONFromObject(state.formItems)
                    console.log("getFormItem",json)
                    props.saveJSON(state.moduleName, json)
                    return {
                        ...state,
                        json
                    }
                } else {
                    return {
                        ...state,
                        moduleNameError: true
                    }
                }

            case Constants.REMOVE_ELEMENT:
                console.log(state.formItems, "remove", action.data)
                let new_arr = state.formItems
                new_arr.splice(action.data, 1)
                console.log(new_arr, "remove", action.data)
                return {
                    ...state,
                    formItems: new_arr
                } 
            default:
                return state
        }
    }
}
  
export { reducer }
  