import { adminGet } from '../../../utils/api'
import config from '../../../app-config/api-endpoint'
import * as Constants from './constants'
import * as Actions from './actions'

const { dispatch } = window.tableStore

export const fetchModulesData = url => {
    adminGet(url)
    .then(response => {
        console.log(typeof(response))
        let resp = JSON.parse(response)
        dispatch(Actions.saveData(resp, url))
    })
    .catch(e => {
        console.log(e)
        dispatch(Actions.errorData())
    })
}

export const createUrl = () => {
    return 
}