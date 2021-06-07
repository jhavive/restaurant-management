import React from 'react'
import './styles.scss'
import { changePageSize, changePage } from '../actions'
import { connect } from 'react-redux'

const PAGE_SIZES = [ 10, 25, 50, 100 ]

class Pagination extends React.Component {

    dispatch = window.tableStore.dispatch

    constructor(props){
        super(props)
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
    After the updated component gets updated on the DOM, the componentDidUpdate() method executes. This method will receive arguments like prevProps and prevState */

    componentDidUpdate = (prevProps, prevState) => {
        return true
    }

    /* Before the removal of the component from the DOM, componentWillUnMount() will execute */

    componentWillUnmount = () => {

    }

    changePageSize = e => {
        let element = e.target
        this.dispatch(changePageSize(element.value))
    }

    getPageButtons = () => {
        let pages = Math.ceil(this.props.itemCount / this.props.itemPerPage)
        let buttons = []
        for(let i = 1; i <= pages ; i++) {
            buttons.push(<div className="button">{i}</div>)
        }
        return buttons
    }

    pageClick = e => {
        let element = e.target
        let value = element.innerHTML.trim()
        console.log("*****",value,"**********")
        this.dispatch(changePage(value))
    }

    /* render is called to paint the dom */
    render = () => <div className="pagination-section">
        <select onChange={this.changePageSize}>{
            PAGE_SIZES.map(size => <option selected={(size===this.props.itemPerPage)}>{size}</option>)
        }
        </select>
        <div className="navigation-section" onClick={this.pageClick}>
            <div className="button">{'|<<'}</div>
            <div className="button">{'\<'}</div>
            {
                this.getPageButtons()
            }
            <div className="button">></div>
            <div className="button">>>|</div>
        </div>
    </div>


}

export default connect(({ item_per_page, item_count }) => ({ 
    itemPerPage: item_per_page,
    itemCount: item_count
}), null)(Pagination)