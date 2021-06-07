import React from 'react'
import './styles.scss'
import Modal from '../../../Modal'
import SelectedHeadersComponent from '../SelectedHeadersComponent'
// import { openHeaderModal, closeHeaderModal } from '../actions'
import { Edit } from 'react-feather'

export default class EditHeaderModal extends React.Component {

    state = {
        openHeaderModal: false
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

    openHeaderModal = () => {
        this.setState({
            openHeaderModal: true
        })
    }

    closeHeaderModal = () => {
        this.setState({
            openHeaderModal: false
        })
    }

    /* render is called to paint the dom */
    render = () => {
        return(
            <React.Fragment>
                 <Modal
                    open={this.state.openHeaderModal}
                    closeModal={() => this.closeHeaderModal()}
                    >
                        <div class="modal-header">
                            <span class="close" onClick={() => this.closeHeaderModal()}>&times;</span>
                            <h2>Headers</h2>
                        </div>
                        <div class="modal-body">
                        {
                            <SelectedHeadersComponent onSave={this.closeHeaderModal}/>
                        }
                        </div>
                </Modal>
                <Edit size={20} color="#212121" onClick={ () => this.openHeaderModal() } />
            </React.Fragment>
        )
    }


}