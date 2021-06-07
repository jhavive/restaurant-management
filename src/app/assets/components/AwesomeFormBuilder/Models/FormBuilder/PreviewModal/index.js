import React from 'react'
import './styles.scss'
import { Button } from '../../../../Buttons'
import Modal from '../../../../Modal'
import { connect } from 'react-redux'
import Form from '../../../Form'

class PreviewModal extends React.Component {

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

    closeModal = () => {
        this.setState({
            openModal: false
        })
    }

    /* render is called to paint the dom */
    render = () => {
        console.log(this.props.formItems)
        return(
            <div className="preview-container">
                <Button 
                    className   =   "preview-button" 
                    style_type  =   {`${this.props.enableSubmit ? 'secondary' : 'disabled'}`} 
                    onClick     =   {e => {
                                        if(this.props.enableSubmit) 
                                            this.setState({ openModal: true })
                                        else{

                                        }
                                    }}>
                        Preview
                    </Button>
                <Modal
                    open        =   {this.state.openModal}
                    closeModal  =   {this.closeModal}
                    >
                        <div class="modal-header">
                            <span 
                                class   =   "close" 
                                onClick =   {(e) => { this.closeModal(e) }}
                                >
                                    &times;
                            </span>
                            <h2>Preview</h2>
                        </div>
                        <div class="modal-body">
                           <Form 
                                preview 
                                formItems   =   {this.props.formItems}
                                />
                        </div>
                </Modal>
            </div>
        )
    }


}

export default connect(store => {
    console.log("store", store)
    return {
        formItems: store.formItems,
        enableSubmit: store.enableSubmit
    }
}, null)(PreviewModal)