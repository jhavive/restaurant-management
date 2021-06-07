import React from 'react'
import './styles.scss'
import Warehouse from '../../../images/svg/warehouse'
import { ChevronDown, PlusCircle, ChevronUp } from 'react-feather'
import QRCode from '../../../images/svg/qrcodes'
import config from '../../../../app-config/api-endpoint'

export default class ViewTreeView extends React.Component {

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

    toggleChild = e => {
        e.stopPropagation()
        let element = e.currentTarget.parentNode.parentNode
        element.classList.toggle('hide-child')
        console.log(e.currentTarget)
    }

    traverseObject = obj => {
        if(obj.sub_division.length === 0){
            return  <div className="child">
                <div className="tree-container">
                    {/* <ChevronDown/> */}
                    <Warehouse className="icon" size={24}/>
                    {obj.division_name} 
                    <QRCode 
                        height      =   "40px"
                        width       =   "40px"
                        style       =   {{cursor:"pointer"}} 
                        onClick     =   { e => 
                                            window.open(
                                                config.baseURL+
                                                '/qr?file=' +obj.uuid+
                                                "&warehouse="+this.props.warehouseId+
                                                "&organization="+localStorage.getItem('organization-id')
                                                , '_blank')
                                        }
                        />
                </div>
            </div>
        } else {
            return <div className="child" >
                <div className="tree-container">
                        <ChevronDown className="hide-icon" onClick={this.toggleChild}/> 
                        <ChevronUp className="show-icon" onClick={this.toggleChild}/> 
                    <Warehouse className="icon" size={24}/>
                    {obj.division_name}
                </div> 
                {/* <div className="show"> */}
                {
                    obj.sub_division.map(division => this.traverseObject(division))
                }
                {/* </div> */}
            </div>
                
        }
    }

    /* render is called to paint the dom */
    render = () => <div 
        name        =   "form-tree" 
        className   =   "tree-container-parent"
        >
            <div className="tree-container">

                    <div id={"child"+this.props.tree.uuid} className="toggle-show">
                        <ChevronDown className="hide-icon" onClick={this.toggleChild}/> 
                        <ChevronUp className="show-icon" onClick={this.toggleChild}/> 
                    </div>
                <Warehouse 
                    className   =   "icon" 
                    size        =   {24}
                    />
                <h4>
                    { this.props.tree.division_name }
                </h4>

            </div>
            <br/>
            {/* <div className="child"> */}
            {
                this.props.tree.sub_division.map(division => this.traverseObject(division))
            }
            {/* </div> */}
    </div>


}