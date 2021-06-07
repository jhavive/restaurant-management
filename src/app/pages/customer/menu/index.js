import React from 'react'
import './styles.scss'
import { get } from '../../../utils/api'
import Card from '../../../assets/components/Card'
import { PlusCircle, MinusSquare, PlusSquare } from 'react-feather'
import { Button } from '../../../assets/components/Buttons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class MenuPage extends React.Component {

    state = {
        sections: [],
        cart: []
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
        console.log(this.props.match.params)
        get("fetch-menu?hotel=1&")
        .then(response => {
            console.log("response",response)
            this.setState({
                sections: response
            })
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

    getQuantity = item => {
        console.log(item.id," item.id ",this.props.cart)
        let filter = this.props.cart.find(i => i.item.id === item.id)
        console.log(filter)
        return filter ? filter.quantity : 0
    }

    addItem = item => {
        console.log(item)
        let { dispatch } = window.customerStore
        dispatch({
            type: "ADD_ITEM",
            data: {
                item
            }
        })
    }

    removeItem = item => {
        let { dispatch } = window.customerStore
        dispatch({
            type: "REMOVE_ITEM",
            data: {
                item
            }
        })
    }

    getTotal = () => {
        return this.props.cart.reduce((total, item) => {
            console.log(item.item.price, " getTotal ", item.quantity)
            total += item.item.price * item.quantity
            return total
        }, 0)
    }


    /* render is called to paint the dom */
    render = () => {
        console.log("cartlength", this.props.cart)
        return <div className="menu-container" style={{height: this.props.cart.length ? "90vh":"100vh"}}>

            {
                this.state.sections.map(section => <Card>
                    <h2>{section.section_name}</h2>
                    {
                        section.items.map(item => <React.Fragment>
                            <div className="flex flex-end item-row">
                                <div>
                                    <h5 className="item-name">{item.item_name}</h5>
                                    <p className="description">{item.description}{item.description}{item.description}{item.description}{item.description}{item.description}</p>
                                </div>
                                <div>
                                    <h5 className="item-name"> ₹ {item.price}</h5>
                                    {/* <button className="custom-button secondary"></button> */}
                                </div>                        
                            </div>
                            <div className="flex action-row ">
                                    <div><PlusSquare size={40} onClick={e => this.addItem(item)}/><br/></div>
                                    <input type="number" disabled value={this.getQuantity(item)}/>
                                    <div><MinusSquare size={40} onClick={e => this.removeItem(item)}/></div>
                            </div>
                        </React.Fragment>
                        )
                    }
                </Card>)
            }
            {
                this.props.cart.length ? <Link to="/cart">
                    <div className="footer">
                        <h4>Place Order</h4>
                        <h5>Total  ₹ {this.getTotal()}</h5>
                    </div>
                </Link> : null
            }
            
        </div>
    }

}

export default connect(store => {
    return {
        cart: store.cart
    }
}, null)(MenuPage)