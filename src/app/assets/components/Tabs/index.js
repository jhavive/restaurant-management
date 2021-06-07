import React from 'react'
import './styles.scss'

export default class Tabs extends React.Component {

    state = {
        activeTab: 0
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

    changeTab = e => {
        this.setState({
            activeTab: e.target.getAttribute('data-index')
        })
    }

    /* render is called to paint the dom */
    render = () => {
        return <div className="tabs-container">
            <div className="header-container">
                <div className="tabs-header"> 
                {
                    this.props.header && this.props.header.map((head, index) => <div 
                        className   =   {   
                                            'tab-box'+' '+
                                            ( index == this.state.activeTab ? 'active' : '' ) +' '
                                        }
                        onClick     =   { this.changeTab }
                        data-index  =   { index }
                        >
                            { head }
                    </div>)
                }
                </div>
                
            </div>
            <div className="tabs-body">{ this.props.body && this.props.body[ this.state.activeTab ] }</div>
        </div>
    }


}