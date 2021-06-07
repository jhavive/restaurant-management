import React from 'react'
import './styles.scss'
import { Plus, Trash2 } from 'react-feather'
import { Button } from '../../../../assets/components/Buttons'
import Input from '../../../../assets/components/AwesomeFormBuilder/Form/FormItemView/Input'
import Textarea from '../../../../assets/components/AwesomeFormBuilder/Form/FormItemView/TextArea'
import Card from '../../../../assets/components/Card'
import { adminPost } from '../../../../utils/api'
import config from '../../../../app-config/api-endpoint'
import { Success } from '../../../../assets/components/Success'
import { Failure } from '../../../../assets/components/Failure'
import { deepEqual } from '../../../../utils/object'

export default class MenuBuilder extends React.Component {

    state = {
        sections: [
            {
                section_name: "",
                items: [
                    {
                        item_name: "",
                        description: "",
                        price: 0
                    }
                ]
            }
        ]
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
            type:"CLOSE_LOADER"
        })

        let form = document.getElementById("menu");
            
        form && form.addEventListener('submit', event => {   
            event.preventDefault();
            if(this.props.onSave){
                this.props.onSave(this.state.formData, this.props.name)
            }
        })

        this.setState({
            sections: this.props.sections
        })
    }

    /* This method determines whether the component should be updated or not.
    By default, it’ll return true. 
    If at some point, if you want to re-render the component on a condition, then shouldComponentUpdate() method would be the correct choice */

    shouldComponentUpdate = (nextProps, nextState) => {
        if(this.props.sections.length !== nextProps.sections.length)
            this.setState({
                sections: nextProps.sections
            })
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

    addItem = index => {
        let sections = [...this.state.sections]
        sections[index].items.push({
            item_name: "",
            description: "",
            price: 0
        })
        this.setState({
            sections
        })
    }
    addSection = () => {
        let sections = [...this.state.sections]
        sections.push({
            section_name: "",
            items: [
                {
                    item_name: "",
                    description: "",
                    price: 0
                }
            ]
        })
        this.setState({
            sections
        })
    }

    onChange = (e, index) => {
        let section_index   =   0
        let sections        =   this.state.sections
        if(e.target.name!=="section_name"){
            section_index = e.target.parentNode.parentNode.getAttribute('data-index')

            console.log(e.target.parentNode.parentNode, e.target.name, index)
            sections[section_index].items[index][e.target.name] = e.target.value
        } else {
            sections[index].section_name = e.target.value
        }
        this.setState({
            sections
        })
    }

    deleteSection = e => {
        console.log(e.target.parentNode.getAttribute('data-index'))
    }
    deleteItem = e => {
        console.log(e.target.parentNode.getAttribute('data-index'))
    }

    saveMenu = () => {
        let form = document.getElementById("menu")
        if(form.checkValidity()){
            let { dispatch } = window.rootStore
            dispatch({
                type: "OPEN_LOADER"
            })
            adminPost(config.routes.menu.menu, {
                sections: this.state.sections,
                hotel_id: 1
            })
            .then(response => {
                console.log(response)
                dispatch({
                    type: "OPEN_MODAL",
                    modalBody: <div className="all-centre error-container"> <Success height="200" width="200" {...this.props}/> </div>,
                    modalType: "popup"
                })
            })
            .catch(e => {
                console.log(e)
                dispatch({
                    type: "OPEN_MODAL",
                    modalBody: <div className="centre error-container"> <Failure height="200" width="200" {...this.props}/> </div>,
                    modalType: "popup"
                })
            })
        }
    }

    /* render is called to paint the dom */
    render = () => {
        console.log(this.state.sections)
        return <div className="builder-container">
            <form id="menu" className="section-section">
                {
                    this.state.sections.map((section, section_index) => 
                        <Card className="section-items" data-index={section_index}>
                            <Trash2 className="delete-section" onClick={this.deleteSection}/>
                            <Input 
                                type        =   "text" 
                                name        =   "section_name" 
                                value       =   {section.section_name} 
                                label       =   "Section Name"
                                data-index  =   {section_index}
                                onChange    =   {e => this.onChange(e, section_index)}
                                required/>
                            {
                                section.items.map((item, item_index) => <div 
                                    data-index      =   {section_index}
                                    className       =   "flex flex-end flex-align-center item-row"
                                    >
                                    <Trash2 className="delete"  onClick={this.deleteItem}/>
                                    <Input 
                                        type        =   "text" 
                                        name        =   "item_name" 
                                        value       =   {item.item_name} 
                                        label       =   "Dish Name" 
                                        onChange    =   {e => this.onChange(e, item_index)}
                                        required
                                        />
                                    <Input 
                                        type        =   "number" 
                                        name        =   "price" 
                                        value       =   {item.price} 
                                        label       =   "Price" 
                                        onChange    =   {e => this.onChange(e, item_index)}
                                        required
                                        />
                                    <Textarea 
                                        name        =   "description"
                                        value       =   {item.description} 
                                        label       =   "Description"
                                        onChange    =   {e => this.onChange(e, item_index)}
                                        required/>

                                    
                                </div>
                            )}
                            {/* <Button><Plus/>Add Items</Button> */}
                            <br/>
                            <button className="custom-button secondary" onClick={e => this.addItem(section_index)}><Plus/>Add Items</button>
                        </Card>
                        
                    )
                }
                <br/>
                <button className="custom-button secondary save-section" onClick={e => this.addSection()}><Plus/>Add Section</button>

                <Button style_type="primary" className="save-menu" onClick={this.saveMenu}>Save Menu</Button>
            </form>
        </div>
    }


}