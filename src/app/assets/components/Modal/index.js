import React from 'react'
import './styles.scss'
import { goBack } from '../../../utils/location'

export default class Modal extends React.Component {

    state = {
        open: false,
        type: '',
        first: true
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

        let modal = document.getElementById("myModal");

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = event => {
            if (event.target == modal) {
                this.setState({
                    open: false
                })
            }
        }
        this.setState({
            open: this.props.open
        })
    }

    /* This method determines whether the component should be updated or not.
    By default, it’ll return true. 
    If at some point, if you want to re-render the component on a condition, then shouldComponentUpdate() method would be the correct choice */

    shouldComponentUpdate = (nextProps, nextState) => {
        if(nextProps.open != this.props.open){
            this.setState({
                first: false
            })
        }
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

    closeModal = (e) => {
        let span = e.target
        let modal = span.parentNode.parentNode
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.classList.toggle("exit")
        }
        // this.props.closeModal()
    }

    /* render is called to paint the dom */
    render = () => {

        if(this.props.open) {
            let header = document.getElementsByClassName('navbar-component')[0]
            header.style.zIndex = "0";
        } else {
            let header = document.getElementsByClassName('navbar-component')[0]
            header.style.zIndex = "0";
        }

        return <div id="myModal" class={`modal ${this.props.open ? 'entry':'exit'} ${this.state.first ? 'first': ''}`}>
            <div class={`modal-content  ${this.props.type ? this.props.type : 'default'}`}>
                {
                    this.props.children
                }
            </div>
        </div>
    }

}