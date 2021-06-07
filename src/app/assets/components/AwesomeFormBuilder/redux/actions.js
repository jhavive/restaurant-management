import *as Constants from './constants'

export const addFormItem = data =>  ({
    type: Constants.ADD_FORM_ITEM,
    data
})

export const selectElement = data => ({
    type: Constants.SELECT_FORM_ITEM,
    data
})

export const saveJSON = data => ({
    type: Constants.SAVE_JSON,
    data
})

export const removeElement = data => ({
    type: Constants.REMOVE_ELEMENT,
    data
})

export const extraInfoChange = data => ({
    type: Constants.EXTRA_INFO_CHANGE
})

export const extraInfoSave = data => ({
    type: Constants.EXTRA_INFO_SAVE
})

export const changeName = data => ({
    type: Constants.CHANGE_NAME,
    data
})