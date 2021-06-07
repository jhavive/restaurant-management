// import { showSnackBar, showLoginTenant } from "../actions";
// import {  showLoginTenant } from '../'

import config from '../app-config/api-endpoint'
import { ERROR_CODES } from './constants'

export const jsonHandling = (response) => {
    if(response.status/100!==2 && response.status/100!==3){
        throw Error(response.statusText);
    }
    try{
        return response.json()
    } catch(e){
        response
    }
}

const createConfig = (type, headers={}, body={}) => {
    let config = {
        method: type,
        headers
    }
    if( type === 'post' || type === 'put' || type === 'patch' ){
        config.body = JSON.stringify(body)
        if(!headers['Content-Type'])
        headers['Content-Type'] = 'application/json'
    }
    return config
}

const getHeader = () => ({
    "Authorization": 'Token ' + window.localStorage.getItem('token'),
    "X-Org-Id": window.localStorage.getItem('organization-id')
}) 

const request = (url, config) => {
    console.log(url)
    return fetch(url, config)
    .then(response => {
        if(window.rootStore) {
            let { dispatch } = window.rootStore
            dispatch({
                type: 'CLOSE_LOADER'
            })
        }
        switch(response.status){
        case 401:
        case 403: 
            break
        case 400:
            throw new Error(response.status)
        case 500:
            // dispatch(showSnackBar("OOPS!! Some error occured"))
            throw new Error(response.status)
        default: 
            return response.json()
        }
    })
    .catch(e => {
        console.log(e)
        throw new Error(ERROR_CODES.NO_INTERNET.code)
    })
}

const appendUrl = (endpoints, queryParams) => {
    return config.baseURL+'/'+endpoints+'/'+queryParams
} 

export const login = () => {
    return request(url, createConfig(post, header))
}

export const get = (endpoint, queryParams="",headers={}) => {
    return request(appendUrl(endpoint, queryParams), createConfig('get', headers))
}

export const post = (endpoint, body, queryParams="", headers={}) => {
    return request(appendUrl(endpoint, queryParams), createConfig('post', headers, body))
}

export const putRequest = (endpoint, body, headers={}) => {
    return request(appendUrl(endpoint), createConfig('put', headers, body))
}

export const deleteRequest = (endpoint, headers={}) => {
    return request(appendUrl(endpoint), createConfig('delete', headers))
}

export const adminGet = (url, queryParams="") => {
    console.log("adminGet",url)
    if(url.methods.includes('GET'))
        return request( appendUrl( ( url.app ? url.app+"/" : '' ) + url.path,queryParams ), createConfig('get', getHeader()))
    else
        return new Promise((success, error) => error(ERROR_CODES.PERMISSION_DENIED.code))
}

export const adminPost = (url, body, queryParams="") => {
    console.log(url)
    if(url.methods.includes('POST'))
        return request( appendUrl( ( url.app ? url.app+"/" : '' ) + url.path,queryParams ), createConfig('post', getHeader(), body))
    else
        return new Promise((success, error) => error(ERROR_CODES.PERMISSION_DENIED.code))
}

export const adminPut = (url, body, queryParams="") => {
    if(url.methods.includes('PUT'))
        return request( appendUrl( ( url.app ? url.app+"/" : '' ) + url.path,queryParams ), createConfig('put', getHeader(), body))
    else
        return new Promise((success, error) => error(ERROR_CODES.PERMISSION_DENIED.code))
}

export const adminPatch = (url, body, queryParams="") => {
    if(url.methods.includes('PUT'))
        return request( appendUrl( ( url.app ? url.app+"/" : '' ) + url.path,queryParams ), createConfig('patch', getHeader(), body))
    else
        return new Promise((success, error) => error(ERROR_CODES.PERMISSION_DENIED.code))
}

export const adminDelete = (url, queryParams="") => {
    if(url.methods.includes('DELETE'))
        return request( appendUrl( ( url.app ? url.app+"/" : '' ) + url.path,queryParams ), createConfig('delete', getHeader()))
    else
        return new Promise((success, error) => error(ERROR_CODES.PERMISSION_DENIED.code))
}

// export const logoutAdmin = () => {
//   let auth = window.gapi.auth2.getAuthInstance();
//   auth.signOut().then(function () {
//     auth.disconnect();
//     window.location.reload()
//   });
// }