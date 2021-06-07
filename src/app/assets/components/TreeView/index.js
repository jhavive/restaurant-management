import React from 'react'
import './styles.scss'
import EditTreeView from './Edit'
import ViewTree from './View'

const TreeView = props => props.view ? <ViewTree {...props}/> : <EditTreeView {...props}/>

export default TreeView