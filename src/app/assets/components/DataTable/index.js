import React from 'react'
import './styles.scss'
import { Provider } from 'react-redux'
import { tableStore } from './store'
import { get } from '../../../utils/api'
import {Loader} from '../Loader'
import {Failure} from '../Failure'
import HeaderSection from './HeaderSection'
import TableSection from './TableSection' 
import { TableHeader } from './TableSection/TableHeader'
import { TableBody } from './TableSection/TableBody'
import { TD } from './TableSection/TD'
import { TR } from './TableSection/TR'
import { TH } from './TableSection/TH'
import { HR } from './TableSection/HR'
import SearchSection  from './SearchSection'
import FilterSection from './FilterSection'
import PaginationSection from './PaginationSection'
import { fetchModulesData } from './api'
import { resetData, closeHeaderModal, setModuleInfo, setUrlPath } from './actions'
import { TABLE_STATE } from './constants'
import { connect } from 'react-redux'


class Table extends React.Component {

    constructor(props){
        super(props)
    }

    /* This method is called just prior to component mounting on the DOM (or when the render method is called). Then our component gets mounted. */

    componentWillMount = () => {
        // fetchModulesData(this.props.dataSource)
    }

    /* This method is called after the component is mounted on the DOM. Like componentWillMount(), it is called only once in a lifecycle.
    Before its execution, the render method is called. We can make API calls and update the state with the API response */

    componentDidMount = () => {
        // let { dispatch } = window.tableStore
        // dispatch(setModuleInfo(this.props.moduleInfo))
        // if(this.props.dataTable){
        //     fetchModulesData(this.props.dataSource)
        // }
    }

    /* This method determines whether the component should be updated or not.
    By default, it’ll return true. 
    If at some point, if you want to re-render the component on a condition, then shouldComponentUpdate() method would be the correct choice */

    shouldComponentUpdate = (nextProps, nextState) => {
        // console.log(this.props.dataSource, "shouldComponentUpdate", nextProps.dataSource)
        // if(this.props.dataSource!==nextProps.dataSource){
        //     let { dispatch } = window.tableStore
        //     dispatch(resetData())
        //     fetchModulesData(nextProps.dataSource)
        // }
        // return true
    }

    /* We call this method after the re-rendering our component.
    After the updated component gets updated on the DOM, the componentDidUpdate() method executes. This method will receive arguments like prevProps and prevState */

    componentDidUpdate = (prevProps, prevState) => {
        return true
    }

    /* Before the removal of the component from the DOM, componentWillUnMount() will execute */

    componentWillUnmount = () => {

    }

    

    /* render is called to paint the dom */
    render = () => {
        console.log(this.props)
        return(
            <Provider store={tableStore(this.props)}>
                <div className="data-table-container"><RenderStateView {...this.props}/></div>
            </Provider>
        )
    }


}

const renderStateView = (props) => <React.Fragment>
    <HeaderSection extraInfo={props.moduleInfo}/>
    <TableSection/>  
</React.Fragment>

const RenderStateView = connect(
    ({ table_state, open_header_modal,selected_header, actual_data }) => ({
        tableState: table_state,
        openHeaderModal: open_header_modal,
        selectedHeaders: selected_header,
        actualData: actual_data[0]
    }),
    null
)(renderStateView)



export {
    Table,
    TableHeader,
    TableBody,
    TD,
    TR,
    TH,
    HR
}
