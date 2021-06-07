import React, { useEffect } from 'react'
import './styles.scss'
import { goBack } from '../../../../utils/location'
import { adminGet, adminPatch } from '../../../../utils/api'
import config from '../../../../app-config/api-endpoint'
import { Failure } from '../../../../assets/components/Failure'
import { connect } from 'react-redux'
import { Button } from '../../../../assets/components/Buttons'

const PAGE_STATE = {
    LOADING: 1,
    ERROR: 2,
    SUCCESS: 3
}

const ModalBody = props => {
    console.log("ModalBody",props)

    useEffect(() => {
        console.log("useEffect")
    })

    const payOrder = () => {
        let params = `${props.selectedTable.id}/`
        adminPatch(config.routes.tables.order, {
            orders: Object.keys(props.tableOrder).map(key => key),
            state: 'inactive'
        }, params)
        .then(response => {
            props.history.push(goBack())
        })
        .catch(e => {
            dispatch({
                type: "OPEN_MODAL",
                modalBody: <div className="centre error-container"> <Failure height="200" width="200" {...this.props}/>Please Try Again </div>,
                modalType: "popup"
            })
        })
    }

    return <div className="order-container">
        <div className="flex flex-end">
            <h3>Items</h3>
            <h3>Quantity</h3>
        </div>
        <br/>
        {
            props && props.order && props.order && props.order.map((o, index) => o.items.map(item =>{
                console.log("ModalBody", item)
                return <div className="flex flex-end item-row">
                    <h5>{item.name}</h5>
                   <p>{item.quantity}</p>
                </div >
            }))
        }
        <div className={"flex flex-end button-row" + props.order.length > 0 ? "flex-align-center" : ""}>
            <Button style_type="primary" onClick={payOrder}>Pay</Button>
        </div>
    </div>
}

class OrderModal extends React.Component {

    state = {
        pageState: PAGE_STATE.SUCCESS,
        order: []
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
        let { dispatch } = window.rootStore
        if(!(this.props.selectedTable && this.props.selectedTable.id)){
            dispatch({
                type: "CLOSE_MODAL"
            })
            this.props.history.push(goBack())
        }

        console.log("this.props.tableOrder", this.props)
        if( this.props.tableOrder && this.props.selectedTable) {
                
            let order = Object.keys(this.props.tableOrder).map(key => this.props.tableOrder[key])
            console.log(order)
            let params = `${this.props.selectedTable.id}/`
            adminPatch(config.routes.tables.order, {
                orders: Object.keys(this.props.tableOrder).map(key => key),
                read: true
            }, params)
            .then(response => {
                this.setState({
                    order
                }, () => dispatch({
                    type: "OPEN_MODAL",
                    modalBody: <ModalBody {...this.props} {...this.state}/>,
                    modalType: "popup"
                }))
            })
            .catch(e => {
                dispatch({
                    type: "OPEN_MODAL",
                    modalBody: <ModalBody {...this.props} {...this.state}/>,
                    modalType: "popup"
                })
            })
        }
        
    }

    /* This method determines whether the component should be updated or not.
    By default, it’ll return true. 
    If at some point, if you want to re-render the component on a condition, then shouldComponentUpdate() method would be the correct choice */

    shouldComponentUpdate = (nextProps, nextState) => {
        console.log(nextProps, "shouldComponentUpdate",this.props)
        if(nextProps.selectedTable && this.props.selectedTable && nextProps.selectedTable.id!==this.props.selectedTable.id){
            let { dispatch } = window.rootStore
            // dispatch({
            //     type: "OPEN_LOADER"
            // })
            try {
            
                let order = Object.keys(nextProps.tableOrder).map(key => nextProps.tableOrder[key])
                this.setState({
                    order
                }, () => dispatch({
                    type: "OPEN_MODAL",
                    modalBody: <ModalBody {...nextProps} {...this.state}/>,
                    modalType: "popup"
                }))
            } catch(e){
                dispatch({
                    type: "OPEN_MODAL",
                    modalBody: <ModalBody {...nextProps} {...this.state}/>,
                    modalType: "popup"
                })
            }
        }
        
        return true
    }

    /* We call this method after the re-rendering our component.
    After the updated component gets updated on the DOM, the  componentDidUpdate() method executes. This method will receive arguments like prevProps and prevState */

    componentDidUpdate = (prevProps, prevState) => {
        return true
    }

    /* Before the removal of the component from the DOM, componentWillUnMount() will execute */

    componentWillUnmount = () => {
        let { dispatch } = window.rootStore
        dispatch({
            type: "CLOSE_MODAL"
        })
    }

    closeOrderModal = e => {
        new Promise((resolve, reject) => {
            let { dispatch } = window.rootStore
            dispatch({
                type: "CLOSE_MODAL"
            })
            resolve()
        })
        .then(() => {
            this.props.history.push(goBack())
        })
    }

    /* render is called to paint the dom */
    render = () => {
        return null
    }


}

export default connect(store => {
    return {
        selectedTable: store.selectedTable,
        tableOrder: store.tableOrder
    }
})(OrderModal)