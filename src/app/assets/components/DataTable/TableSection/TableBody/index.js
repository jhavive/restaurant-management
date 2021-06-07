import React from 'react'
import './styles.scss'

export const TableBody = (props) => (  
  <tbody {...props}>
  {
    props.children
  }
  </tbody>
)