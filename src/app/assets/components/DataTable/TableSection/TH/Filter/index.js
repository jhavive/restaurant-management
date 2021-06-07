import React from 'react'
import Input from '../../../../Input'
import './styles.scss'
import { connect } from 'react-redux'
import { filterData } from '../../../actions'

export default class Filter extends React.Component{

    onChange = e => {
        let { dispatch } = window.tableStore
        console.log(this.props)
        dispatch(filterData({
            [this.props.searchKey]: e.target.value 
        }))
    }

    render = () => {
        return(
            <div className="filter-container"><Input name="filter" placeholder="Filter" onChange={this.onChange}/></div>
        )
    }

}

// export default connect(({ filter_data }) => ({ filter_data }), null)(Filter)