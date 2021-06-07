import * as Actions from './actions'
import { adminGet } from '../../../utils/api'
import config from '../../../app-config/api-endpoint'

export const getRoute = () => {
    adminGet(config.getRoutes)
    .then(response => {
        console.log(response)
        let routes = Object.keys(response)
        let { dispatch } = window.rootStore
        console.log("config",config)
        config.constructor.prototype.routes = response
        console.log("config",config)
        dispatch(Actions.setRoutes(routes))
    })
    .catch(e => {
        console.log(e)
    })
}
