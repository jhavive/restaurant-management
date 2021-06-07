import React from 'react'
import './styles.scss'
import { goBack } from '../../../../utils/location'
import config from '../../../../app-config/api-endpoint'
import AwesomeFormBuilder from '../../../../assets/components/AwesomeFormBuilder'
import { adminPost } from '../../../../utils/api'

const PAGE_STATE = {
    LOADING: 1,
    ERROR: 2,
    SUCCESS: 3
}

const form = [
    {
        "type": "NUMBER",
        "props": {
            "name": "number_of_table",
            "placeholder": "Number of Tables",
            "label": "Number of Tables",
            "pattern": "",
            "required": true,
            "tooltip": false
        }
    },
    {
        "type": "NUMBER",
        "props": {
            "name": "table_quantity",
            "placeholder": "Quantity Per Table",
            "label": "Quantity Per Table",
            "pattern": "",
            "required": true,
            "tooltip": false
        }
    }
]


export default class NewTableModal extends React.Component {

    ModalBody = props => <div className="order-container">
        <React.Fragment>
            <h2>New Table</h2>
            <AwesomeFormBuilder 
                name        =   "table" 
                formItems   =   {form} 
                path        =   {config.routes.tables.tables} 
                onSave      =   {this.onSave}/>
        </React.Fragment>
    </div>

    state = {
        pageState: PAGE_STATE.SUCCESS,
        order: {
            items:[
                {
                    "name": "Paneer Butter Masala",
                    quantity: 2,
                }
            ]
        }
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
        dispatch({
            type: "OPEN_MODAL",
            modalBody: <this.ModalBody {...this.props}/>,
            modalType: "popup"
        })        
    }

    /* This method determines whether the component should be updated or not.
    By default, it’ll return true. 
    If at some point, if you want to re-render the component on a condition, then shouldComponentUpdate() method would be the correct choice */

    shouldComponentUpdate = (nextProps, nextState) => {
        return true
    }

    /* We call this method after the re-rendering our component.
    After the updated component gets updated on the DOM, the  componentDidUpdate() method executes. This method will receive arguments like prevProps and prevState */

    componentDidUpdate = (prevProps, prevState) => {
        return true
    }

    /* Before the removal of the component from the DOM, componentWillUnMount() will execute */

    componentWillUnmount = () => {

    }

    closeOrderModal = e => {
        this.props.history.push(goBack())
    }

    onSave = json => {
        console.log(json)
        adminPost(config.routes.tables.tables, {...json, hotel: 1})
        .then(response => {
            console.log(response)
        })
        .catch(e => {
            console.log(e)
        })
    }

    /* render is called to paint the dom */
    render = () => {
        return null
    }


}