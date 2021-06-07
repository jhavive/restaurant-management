import React from 'react'
import Loadable from 'react-loadable'
import { Users, Box, ThumbsUp, Clipboard, PieChart } from 'react-feather'

export const SET_ROUTES = "SET_ROUTES"
export const CUSTOM_FOOTER = "CUSTOM_FOOTER"
export const REMOVE_CUSTOM_FOOTER = "REMOVE_CUSTOM_FOOTER"
export const HIDE_FOOTER = "HIDE_FOOTER"
export const SHOW_FOOTER = "SHOW_FOOTER"

export const OPEN_MODAL = "OPEN_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"

export const OPEN_LOADER = "OPEN_LOADER"
export const CLOSE_LOADER = "CLOSE_LOADER"

export const CHANGE_ROUTE = "CHANGE_ROUTE"

export const SELECT_TABLE = "SELECT_TABLE"

const loading = () => ( <div className='padding-loader'> {/* <Loader height='40px' width='40px' borderWidth='10px' /> */} </div> )
const render = (loaded, props) => { let Component = loaded.default; return <Component {...props} /> }


const LoadableMenu = Loadable({ loader: () => import('../menu/index.js'), render, loading })
const LoadableTable = Loadable({ loader: () => import('../tables/index.js'), render, loading })

export const APPS = () => {
    return{
        table: {
            icon: <Users/>,
            path: '/admin/tables',
            label: 'Tables',
            component: props => <LoadableTable {...props}/>
        },
        menu: {
            icon: <Users/>,
            path: '/admin/menu',
            label: 'Menu',
            component: props => <LoadableMenu {...props}/>
        },
    }
}

