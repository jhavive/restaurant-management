import React from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import Checkbox from '../../Checkbox'

const getObjectCell = (props, item) => Object.keys(item).map(i => {

        if(typeof item[i] === 'string')

            return <div 
                className   =   "header" 
                onClick     =   { () => { 
                    console.log("hello"); 
                    props.onItemClick(item)
                }}
                >
                {
                    item[i]
                }
            </div>

        else 
            return null
            return <div 
                className   =   "header" 
                onClick     =   { () => props.onItemClick(item)}
                >
                {
                    item[i]["$oid"]
                }
            </div>
    })

const selection = (props, row_data) => {
    let display_obj = {}

    if(props.selected_header && props.selected_header.length){
        display_obj = Object.keys(row_data).reduce((accumulator, currentValue) => {
            if(props.selected_header.includes(currentValue)){
                try{
                    accumulator[currentValue] = row_data[currentValue]
                } catch(e){
                    console.log(e)
                }
                return accumulator
            } else {
                return accumulator
            }
        },{})
    } else {
        display_obj = row_data
    }
    return getObjectCell(props, display_obj)
}

const getHeader = props => {
    let headers = []
    console.log("headers", props)
    if(props.selected_header && props.selected_header.length){
        console.log("headers1", props.data[0])
        headers = Object.keys(props.data[0]).reduce((accumulator=[], key) => { 
            try{
                if(props.selected_header.includes(key))
                    accumulator.push(<div className="header">{key.toUpperCase()}</div>)
                
            } catch(e){
               
            }
            return accumulator
    }, [])
    } else {
        console.log("headers2", props.data[0])
        headers = Object.keys(props.data[0]).map(key => <div className="header">{key.toUpperCase()}</div>)
    }
    return headers
}

const Table = props => {
    console.log("this.props")
    if(props.data.length)
        return <div className="flex-table">
            <div className="flex-header-container"> 
                <div className="checkbox-column"><Checkbox name="heading-checkbox"/></div>
                {
                    props.data && props.data.length && getHeader(props)
                }
            </div>
            <div className="flex-body-container">
                {
                    props.data && props.data.length &&  props.data.map((item, index) => <div className="flex-row"><div className="checkbox-column"><Checkbox name={index+''} /></div>{selection(props, item)}</div>  )
                }
            </div>
        </div>
    else
        return <div style={{width: "100%", padding: "20px 0px",textAlign:"center", color:"#17a419", border:"1px solid #17a419"}}>Sorry No Entries</div>
}

export default connect(
    ({ display_data, selected_header, onItemClick }) => ({
        data: display_data,
        selected_header,
        onItemClick
    }),
    null
)(Table)

// export default Table