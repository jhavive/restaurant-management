import React from 'react'
import './styles.scss'
import connect from 'react-redux/lib/connect/connect'
import { Loader } from '../Loader'

class Modal extends React.Component {

    constructor(props){
        super(props)
    }

    /* This method is called just prior to component mounting on the DOM (or when the render method is called). Then our component gets mounted. */

    componentWillMount = () => {

    }

    /* This method is called after the component is mounted on the DOM. Like componentWillMount(), it is called only once in a lifecycle.
    Before its execution, the render method is called. We can make API calls and update the state with the API response */

    traverseToParent = (elm, parent) => {
        console.log("traverseToParent",elm)
        if(elm.className.includes && elm.className.includes(parent)){
            return elm
        }
        return traverseToParent(elm.parentElement, parent)
    }

    myHandler = e => {
        console.log(e.target)
        if(e.target.parentNode.id==='myModal' || e.target.id==='myModal')
            this.closeModal()
    }

    // componentDidMount = () => {
    //     document.body.addEventListener('click', this.myHandler);
    // }

    componentDidMount = () => {

        let modal = document.getElementById("myModal");

        // When the user clicks anywhere outside of the modal, close it
        document.body.addEventListener('click', this.myHandler, true);
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
        document.body.removeEventListener('click', this.myHandler);
    }

    closeModal = () => {
        let { dispatch } = window.rootStore
        dispatch({
            type: "CLOSE_MODAL"
        })
    }

    /* render is called to paint the dom */
    render = () => {
        return <div 
            id      =   "myLoader" 
            class   =   {`modal ${this.props.openLoader ? 'entry':'exit'}`}>
            
            <div className={`loader-container ${this.props.modalType}`}>
                <Loader
                    height="50"
                    width="10"
                    fill="#3f4d67"
                    />
            </div>
        </div>
    }

}

export default connect(store => {
    return {
        openLoader: store.open_loader
    }
})(Modal)