import React from 'react'
import './styles.scss'
import Card from '../../../assets/components/Card'
import Link from 'react-router-dom/Link'
import OrderModal from './OrderModal'
import NewTableModal from './NewTableModal'
import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Switch
} from 'react-router-dom'
import { Button } from '../../../assets/components/Buttons'
import { adminGet } from '../../../utils/api'
import config from '../../../app-config/api-endpoint'

const TABLE_STAGES = {
    BLANK: 0,
    UNREAD: 1,
    ACTIVE: 2
}

const COLOR = [
    '#fff',
    '#BE1E2D',
    '#11A861'
]


export default class TablePage extends React.Component {

    state = {
        tables: [],
        orders: []
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
        let request = Promise.all([adminGet(config.routes.tables.tables, "?hotel=1"), adminGet(config.routes.tables.order)])
        request.then(response => {
            console.log("response", response[0])
            this.setState({
                tables: response[0],
                order: response[1]
            })
        })

        setInterval(() => {
            adminGet(config.routes.tables.order)
            .then(response => {
                console.log(response)
                this.setState({
                    order: response
                })
            })
        }, 20000)
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

    onChange = e => {
        let formData = { ...this.state.formData}
        formData.name = e.target.value
        this.setState({
            formData
        })
    }

    onClick = (table, order) => {
        console.log(table," SELECT_TABLE ",order)
        let {dispatch} = window.adminStore
        dispatch({
            type: "SELECT_TABLE",
            selectedTable: table,
            tableOrder: order
        })
    }
    
    getColor = (tableId, orderid) => {
        if(!this.state.order[tableId][orderid].read){
            return "#BE1E2D"
        } else {
            return '#11A861'
        }
    }

    /* render is called to paint the dom */
    render = () => <div className="table-page-container">
        <Router history={browserHistory}>
            <React.Fragment>
                <Switch>
                    <Route path="/admin/tables/new" component={NewTableModal} />
                    <Route path="/admin/tables/:id" component={OrderModal} />
                </Switch>
                <div className="flex flex-end button-row">
                    <Link to={"/admin/tables/new"}><Button style_type="primary">Add Tables</Button></Link>
                    {
                        this.state.tables.length ? <Button 
                            style_type  =   "secondary" 
                            onClick     =   { e => 
                                                window.open(
                                                    config.baseURL+
                                                    '/qr-pdf?hotel='+localStorage.getItem('organization-id')
                                                    , '_blank'
                                                )
                                            }>
                                Print All QR Codes
                        </Button> : null
                    }
                </div>
                <div className="table-list">
                    {
                        this.state.tables.map((table, index) => {
                            if(this.state.order && this.state.order[table.id]){
                                let orderid = Object.keys(this.state.order[table.id])[0]
                                let color = ""
                                if(orderid)
                                    color = this.getColor(table.id, orderid)
                                else
                                    color = "white"

                                
                                console.log(color, "TABLE_STAGES  ")
                                return  <Card 
                                    className       =   "table-card-container"
                                    index           =   { index } 
                                    onClick         =   { e => this.onClick(table, this.state.order[table.id]) }
                                    background      =   { color }
                                    >
                                    {
                                        <h5 data-index={index} >Table # {table.number}</h5>
                                    }
                                    <div className="flex flex-end">
                                       
                                        {
                                            Object.keys(this.state.order[table.id]).length ? <Link to={"/admin/tables/"+table.id}>
                                                <Button style_type="secondary">Order</Button>
                                            </Link> 
                                             :  <Button 
                                                    style_type  =   "secondary"
                                                    onClick     =   { e => 
                                                                        window.open(
                                                                            config.baseURL+
                                                                            '/qr?file='+table.id+'&'+
                                                                            'hotel='+localStorage.getItem('organization-id')
                                                                            , '_blank'
                                                                        )
                                                                    }
                                                    >
                                                    QR Code
                                                </Button>
                                        }
                                    </div>
                                </Card>
                            } else 
                                return null
                        })
                    }
                    
                </div>
            </React.Fragment>
        </Router>
    </div>  


}