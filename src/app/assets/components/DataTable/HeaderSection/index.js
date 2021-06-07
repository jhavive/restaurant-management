import React from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { Filter, ChevronRight, ChevronLeft } from 'react-feather'
import NewItemModal from './NewItemModal'
import EditHeaderModal from './EditHeadersModal'

class headerSection extends React.Component {

    constructor(props){
        super(props)
        this.dispatch = window.tableStore
    }

    /* This method is called just prior to component mounting on the DOM (or when the render method is called). Then our component gets mounted. */

    componentWillMount = () => {

    }

    /* This method is called after the component is mounted on the DOM. Like componentWillMount(), it is called only once in a lifecycle.
    Before its execution, the render method is called. We can make API calls and update the state with the API response */

    componentDidMount = () => {

    }

    /* This method determines whether the component should be updated or not.
    By default, it’ll return true. 
    If at some point, if you want to re-render the component on a condition, then shouldComponentUpdate() method would be the correct choice */

    shouldComponentUpdate = (nextProps, nextState) => {
        return true
    }

    /* We call this method after the re-rendering our component.
    After the updated component gets updated on the DOM, the  componentDidUpdate() method executes. This method will receive arguments like prevProps and prevState */

    componentDidUpdate = (prevProps, prevState) => {
        return true
    }

    /* Before the removal of the component from the DOM, componentWillUnMount() will execute */

    componentWillUnmount = () => {

    }

    /* render is called to paint the dom */
    render = () => {
        let props = this.props
        console.log(props.openHeaderModal)
        return(
            <div className="table-header">
               
                <div className="left">
                    
                    <p>0-20 of 1,453 <ChevronLeft size={24} onClick={() => this.dispatch(changePage('&lt;'))}/><ChevronRight size={24} onClick={() => this.dispatch(changePage('&gt;'))}/></p>
                    
                </div>
                <div className="right">
                    <p>
                        {/* <Button style_type="dark" onClick={(e) => {this.dispatch(openHeaderModal())}}>{this.props.extraInfo}</Button> */}
                        {/* <NewItemModal moduleInfo={props.moduleInfo} path={this.props.path}/> */}
                        {
                            props.extraInfo
                        }
                        
                        {
                            props.actualData && props.actualData.length ? <React.Fragment><Filter size={20} color="#212121"/><EditHeaderModal/></React.Fragment> : null
                        }
                    </p>
                </div>
            </div>
        )
    }


}

export default connect(
    ({ table_state, open_header_modal,selected_header, actual_data, module_info, urlPath }) => ({
        tableState: table_state,
        openHeaderModal: open_header_modal,
        selectedHeaders: selected_header,
        actualData: actual_data[0],
        moduleInfo: module_info,
        path: urlPath
    }),
    null
)(headerSection)