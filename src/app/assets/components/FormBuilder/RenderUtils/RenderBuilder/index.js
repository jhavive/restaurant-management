import React from 'react'
import './styles.scss'
import { FORM_ITEM_TYPE } from '../../constants'
import { RenderExtraInfo } from './RenderExtraInfo'
import { Button } from '../../../Buttons'
import FormFactory from '../../Factory/FormFactory'
import { deepCopyFunction } from '../../../../../utils/object'


const formFactory = new FormFactory()

export default class RenderBuilder extends React.Component{

    state = {
        formItems: [],
    }

    addItemsToForm = (e) => {
        let element = e.target
        let key = element.getAttribute('data-label')
        let item = formFactory.createFormItem(key, 'Name')
        this.setState({
            formItems: [...this.state.formItems, item]
        })
    }

    selectElement = (e) => {
        let element = e.target
        console.log(this.state.formItems)
        this.setState({
            activeInput: element.getAttribute('data-type')
        })
    }

    saveChanges = (data) => {
        let tempArr = this.state.formItems
        tempArr[this.state.activeInput].props = data
        this.setState({
            activeInput: undefined,
            formItems: tempArr
        })   
    }

    render = () => <div className="dragable-container">
        <div className="input-type-container">
            <div className="grey">
                <h5>New Fields</h5>
                {
                    Object.keys(FORM_ITEM_TYPE).map(i => {
                        let input = FORM_ITEM_TYPE[i]
                        return(
                        <div className="input-selector" data-label={input.key}  onClick={this.addItemsToForm}><span>{input.icon}</span>{input.label}</div>
                        )
                    })
                }
            </div>
            
            <div className="button-container">
                <Button style_type="primary" onClick={() => {
                        console.log(this.state.formItems)
                        this.props.saveJSON(this.state.formItems)
                    }} 
                    style={{ width: "100%"}}>Save Form </Button>
                <Button style_type="secondary" onClick={this.submit}>Save & Close</Button>
                <Button style_type="secondary" onClick={() => this.setState({ formItems: [] })}>Cancel</Button>
            </div> 
        </div>
        <div className="form-preview-container" onClick={this.selectElement} >
        {
            this.state.formItems && this.state.formItems.length > 0 && this.state.formItems.map((item,index) => {
                return item.renderBuilderView(index, this.state.activeInput || -1)
            })
        }
        {/* {
            this.state.formItems.length > 0 && <div className="button-container">
                <Button style_type="primary" onClick={() => this.props.saveJSON(this.state.formItems)}>Save Form</Button>
                <Button style_type="secondary" onClick={() => this.props.saveJSON(this.state.formItems)}>Save & Close</Button>
                <Button style_type="secondary" onClick={() => this.props.saveJSON(this.state.formItems)} style={{width:"100%"}}>Cancel</Button>
            </div>
        } */}
        </div>
        <div className="extra-info">
        {
            this.state.activeInput && <React.Fragment>
                    <h5>Properties</h5>
                    <br/>
                    <RenderExtraInfo 
                        index={this.state.activeInput}
                        selectedElement={deepCopyFunction(this.state.formItems[this.state.activeInput])} 
                        saveChanges={this.saveChanges} 
                        />
                </React.Fragment>
        }
        </div>
    </div>

} 