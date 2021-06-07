import React from 'react'
import './styles.scss'
import FormBuilder from '../../../FormBuilder'
import Modal from '../../../Modal'
import { Button } from '../../../Buttons'
import AwesomeFormBuilder from '../../../AwesomeFormBuilder'

export default class NewItemModal extends React.Component {

    state = {
        openModal: false
    }

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

    /* render is called to paint the dom */
    render = () => {
        console.log(this.props.moduleInfo)
        return(
            <React.Fragment>
                 <Modal
                    open={this.state.openModal}
                    closeModal={() => {
                        this.setState({
                            openModal: false
                        })
                    }}
                    >
                        <div class="modal-header">
                            <span class="close" onClick={() => {
                                this.setState({
                                    openModal: false
                                })
                            }}>&times;</span>
                            <h2>{this.props.moduleInfo.name}</h2>
                        </div>
                        <div class="modal-body">
                        {
                            // <FormBuilder name={this.props.moduleInfo.name} formData={this.props.moduleInfo.form_data} path={this.props.path}/>
                            <AwesomeFormBuilder name={this.props.moduleInfo.name} formItems={this.props.moduleInfo.form_data} path={this.props.path}/>
                        }
                        </div>
                </Modal>
                <Button style_type="dark" onClick={(e) => this.setState({ openModal:true })}>+ New {this.props.moduleInfo.name}</Button>
            </React.Fragment>
        )
    }


}