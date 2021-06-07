import React from 'react'
// import './styles.scss'
import Input from '../../../Input'
import { Button } from '../../../Buttons'
import { changeHeader } from '../../actions'
import { connect } from 'react-redux'
import Checkbox from '../../../Checkbox'

class SelectedHeadersComponent extends React.Component {

    state = {}

    constructor(props){
        super(props)
    }

    /* This method is called just prior to component mounting on the DOM (or when the render method is called). Then our component gets mounted. */

    componentWillMount = () => {

    }

    /* This method is called after the component is mounted on the DOM. Like componentWillMount(), it is called only once in a lifecycle.
    Before its execution, the render method is called. We can make API calls and update the state with the API response */

    componentDidMount = () => {
        this.setState({
            selectedHeaders: this.props.selectedHeaders,
            allHeaders: Object.keys(this.props.actualData)
        })
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

    addHeader = e => {
        let element = e.target
        let newHeader = element.getAttribute('data-type')
        let inde
        console.log(element.value)
        if(this.state.selectedHeaders.includes(newHeader)){
            let index = this.state.selectedHeaders.indexOf(newHeader) - 1
            this.setState({
                selectedHeaders: this.state.selectedHeaders.splice(index, 1)
            })
        } else {
            this.setState({
                selectedHeaders: [...this.state.selectedHeaders, newHeader]
            })
        }
        
    }

    /* render is called to paint the dom */
    render = () => {
        return(
            <div className="selected-headers-component">{
                this.state.allHeaders && this.state.allHeaders.map(item => <label style={{display: "flex", margin: "20px 0px"}}><Checkbox type="checkbox" name={item} checked={this.state.selectedHeaders.includes(item)} onClick={this.addHeader} data-type={item}/>{item}</label>)
            }
                <div class="modal-footer">
                    <Button onClick={() => {
                        let { dispatch } = window.tableStore
                        dispatch(changeHeader(this.state.selectedHeaders))
                        this.props.onSave()
                    }}>Save Headers</Button>
                </div>
            </div>
        )
    }


}

export default connect(
    ({ selected_header, actual_data }) => ({
        selectedHeaders: selected_header,
        actualData: actual_data[0]
    }),
    null
)(SelectedHeadersComponent)