import React from 'react'
import './styles.scss'
import { Edit } from 'react-feather'
import { TH } from '../TH'
import { openHeaderModal } from '../../actions'

export const HR = props => <tr className="tr-container" {...props} >  { props.children } <TH style={{width:'3%', cursor:"pointer"}} noFilter onClick={() => {
    let { dispatch } = window.tableStore
    dispatch(openHeaderModal())
}}> <Edit/> </TH> </tr>