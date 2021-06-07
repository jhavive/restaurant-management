import React from 'react'
import './styles.scss'

import Filter from './Filter'
import FilterTile from './FilterTile'

export const TH = (props) => {
  if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){
    if(props.showMobile){
      return(<th className="th-container showMobile" {...props}>
      {
        props.children
      }
      </th>)
    } else{
      return null;
    }
  } else {
    let key = undefined
    try{ 
      key = typeof(props.children)==='string'? props.children : undefined
    } catch(e){

    }
    console.log(key)
    return(
      <th className="th-container" {...props}>
        <div>
          {/* { !props.noFilter ? <FilterTile searchKey={key.toLowerCase()}/> : null } */}
          <div className="">

          </div>
          <p className="heading">
          {
            props.children
          }
          </p>
          {/* { !props.noFilter ? <Filter searchKey={ key.toLowerCase() }/> : null } */}
        </div>
      </th>
    )
  }
}