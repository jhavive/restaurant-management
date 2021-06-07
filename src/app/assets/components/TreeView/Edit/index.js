import React from 'react'
import './styles.scss'
import Warehouse from '../../../images/svg/warehouse'
import { ChevronDown, PlusCircle, ChevronUp, Trash } from 'react-feather'
import Input from '../../AwesomeFormBuilder/Form/FormItemView/Input'
import { generateUUID } from '../../../../utils/string'
import Form from '../../AwesomeFormBuilder/Form'
import { Button } from '../../Buttons'

class Tree{
    division_name = ''
    sub_division = []

    constructor(division_name='', sub_division=[]){
        this.uuid = generateUUID()
        this.division_name = division_name
        this.sub_division = sub_division
    }
}

export default class EditTreeView extends React.Component {

    // stack = []

    
    constructor(props){
        super(props)
        this.state = {
            tree: props.tree || new Tree('Warehouse', [new Tree()])
        }
    
    }

    /* This method is called just prior to component mounting on the DOM (or when the render method is called). Then our component gets mounted. */

    componentWillMount = () => {

    }

    /* This method is called after the component is mounted on the DOM. Like componentWillMount(), it is called only once in a lifecycle.
    Before its execution, the render method is called. We can make API calls and update the state with the API response */

    componentDidMount = () => {
        // if(this.props.formData){
        //     this.setState({
        //         tree: this.props.tree
        //     })
        // }
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

    changeTreeObj = (task, uuid, obj, data=new Tree()) => {

        switch(task){

            case 'push':
                console.log("case push", uuid, " ", obj)
                if( obj.uuid == uuid ){
                    obj.sub_division.push(data)
                    break
                }

            case 'change':
                console.log("case change", uuid, " ", obj)

                if( obj.uuid == uuid ){

                    obj.division_name = data
                    break
                }

            case 'delete':
                console.log("case delete", uuid, " ", obj)
                if (task==='delete'){
                    
                    let find_index = -1
                    obj.sub_division.find((item, index) => { item.uuid==uuid ? find_index = index : null; return item.uuid==uuid })
                    
                    if( find_index >= 0 ){
                        
                        obj.sub_division.splice(find_index, 1)
                        break
                    }
                }

            default:
                console.log("case default", uuid, " ", obj)

                obj.sub_division.map(div => this.changeTreeObj(task, uuid, div, data))
        }
    }

    toggleChild = e => {
        e.stopPropagation()
        let element = e.currentTarget
        let parent = element.parentNode.parentNode
        parent.classList.toggle('hide-child')
        console.log(e.currentTarget)
    }

    addChild = obj => {
        let temp = this.state.tree
        console.log("case push", obj)
        this.changeTreeObj('push', obj.uuid, temp)
        this.setState({
            tree: temp
        })
    }
    
    inputChange = e => {
        if(e.target.tagName.toLowerCase()==='input'){
            let uuid        = e.target.name
            let value       = e.target.value
            let temp        = this.state.tree
            this.changeTreeObj('change', uuid, temp, value)
            this.setState({
                tree: temp
            })
        }
    }

    deleteCurrent = obj => {
        let temp = this.state.tree
        this.changeTreeObj('delete', obj.uuid, temp)
        this.setState({
            tree: temp
        })
    }


    traverseObject = obj => {
        if(obj.sub_division.length === 0){
            return  <div className="child">

                <div className="tree-container">

                    {/* <ChevronDown
                        onClick     =   {this.toggleChild}/> */}
                    <Warehouse className="icon" size={24}/>
                    <Input 
                        required 
                        name        =   {obj.uuid} 
                        value       =   {obj.division_name} 
                        onChange    =   {this.inputChange}
                        placeholder =   "Enter Divsion Name"
                        />
                    <Trash 
                        className   =   "trash"
                        onClick     =   {e => this.deleteCurrent(obj)}/>
                </div>
                <PlusCircle 
                    className   =   "plus" 
                    onClick     =   {e => this.addChild(obj)}
                    />
            </div>
        } else {
            return <div className="child">
                <div className="tree-container">
                        <ChevronDown
                            className   =   "hide-icon"
                            onClick     =   {this.toggleChild}
                            /> 
                        <ChevronUp  
                            onClick     =   {this.toggleChild} 
                            className   =   "show-icon"
                            /> 
                    <Warehouse className="icon" size={24}/>
                    <Input 
                        required 
                        name        =   {obj.uuid} 
                        value       =   {obj.division_name} 
                        onChange    =   {this.inputChange} 
                        placeholder =   "Enter Divsion Name"
                        />
                    <Trash 
                        className   =   "trash"
                        onClick     =   {e => this.deleteCurrent(obj)}/>
                </div>
                
                <PlusCircle 
                    className   =   "plus" 
                    onClick     =   {e => this.addChild(obj)}/>
                {
                    obj.sub_division.map(division => this.traverseObject(division))
                }
            </div>
                
        }
    }

    onSave = (data, index) => {
        this.props.onSave(this.state.tree)
    }

    /* render is called to paint the dom */
    render = () => {
        console.log(this.state.tree)
        return <Form 
            name        =   "form-tree" 
            className   =   "tree-container-parent" 
            onSave      =   {this.onSave}
            >
                <div className="tree-container">

                        <ChevronDown
                            className   =   "hide-icon"
                            onClick     =   {this.toggleChild}
                            /> 
                        <ChevronUp  
                            onClick     =   {this.toggleChild} 
                            className   =   "show-icon"
                            /> 
                    <Warehouse 
                        className   =   "icon" 
                        size        =   {24}
                        // onClick     =   {this.toggleChild}
                        />
                    <h4>
                        { this.state.tree.division_name }
                    </h4>

                </div>
                <br/>
                <PlusCircle 
                    className   =   "plus" 
                    onClick     =   {e => this.addChild(this.state.tree)}
                    />
                {
                    this.state.tree.sub_division.map(division => this.traverseObject(division))
                }
                <Button style_type="primary">Submit</Button>
        </Form>
    }
}