import React from 'react'
import './styles.scss'

export const TD = (props) => {
  if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){
    if(props.showMobile){
      return(<td className="td-container showMobile" {...props}>
      {
        props.children
      }
      </td>)
    } else{
      return null;
    }
  } else {
    return(<td className="td-container" {...props}>
      {
        props.children
      }
      </td>
    )
  }
}