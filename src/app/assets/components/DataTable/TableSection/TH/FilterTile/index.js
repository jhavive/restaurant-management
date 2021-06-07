import React from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { clearFilter } from '../../../actions'

const FilterTile = (props) => {
    if(Object.keys(props.filterData).includes(props.searchKey))
        return <div className="tile-container">
            <p>{props.filterData[props.searchKey]}</p> 
            <p onClick={() => { windows.tableStore.dispatch(this.clearFilter(key, value)) }}>X</p></div>
    else 
        return null
}

export default connect(({ filter_data }) => ({ filterData: filter_data }), null)(FilterTile)