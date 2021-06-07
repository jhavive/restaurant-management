import React from 'react'
import './styles.scss'
import { post } from '../../../utils/api'
import Card from '../../../assets/components/Card'
import { connect } from 'react-redux'
import { Failure } from '../../../assets/components/Failure'
import { Success } from '../../../assets/components/Success'

class CartPage extends React.Component {

    state = {
        pageState: ''
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
        if(!this.props.cart.length)
            this.props.history.push("/")
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

    submitOrder = () => {
        let { dispatch } = window.rootStore
        dispatch({
            type: "OPEN_LOADER"
        })
        post('place-order', {
            table: 28,
            order_items:[  ...this.props.cart ]
        }, "")
        .then(response => {
            // let { dispatch } = window.customerStore
            // dispatch({
            //     type: "RESET_DATA"
            // })
            this.setState({
                pageState: 'success'
            }, () => {
                setTimeout(() => {
                    this.props.history.push('/')
                }, 1000)
            })
        })
        .catch(e => {
            dispatch({
                type: "OPEN_MODAL",
                modalBody: <div className="centre error-container"> <Failure height="200" width="200" {...this.props}/>Please Try Again </div>,
                modalType: "popup"
            })
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
        console.log(this.props.cart)
        switch(this.state.pageState){
            case 'success':
                return <div className="all-centre error-container"> <Success height="200" width="200" {...this.props}/>Order Placed Successfully </div>
            default:
                return  <div className="cart-container">
                    <div className="header" onClick={e => this.props.history.push(-1)}>
                        {/* <ChevronLeft size={32}/> <span>Go Back To Menu</span> */}
                    </div>
                    {
                        this.props.cart.map(item => <Card className="flex flex-end item-row">
                            <h5>{item.item.item_name} <br/><br/> <p> ₹ {item.item.price} X {item.quantity}</p></h5>
                            <h5>{item.quantity * item.item.price}</h5>
                        </Card>)
                    }
                    <div className="flex flex-end total-row">
                        <h5>Total</h5>
                        <h5> ₹ {this.getTotal()}</h5>
                    </div>
                    <div className="footer" onClick={this.submitOrder}>
                        <h4>Place Order</h4>
                    </div>
                </div>
        }
    }


}

export default connect(store => {
    return {
        cart: store.cart
    }
}, null)(CartPage)