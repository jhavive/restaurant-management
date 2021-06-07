import React from 'react'
import './styles.scss'

export const TableHeader = (props) => (
  <div className="table-header-container">
    {/* // <thead className="table-header-container" {...props}> */}
    {
      props.children
    }
    {/* </thead> */}
  </div>
)