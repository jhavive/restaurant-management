import React from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { FORM_ITEM_TYPE } from '../constant'
import { Button } from '../../../Buttons'
import * as Actions from '../../redux/actions'
import PreviewModal from './PreviewModal'

export default class FormBuilderModel {
    
    render = props => <FormBuilder {...props}/>

}


const addFormItem = data => {
    console.log("hello",data)
    const { dispatch } = window.AwesomeFormBuilderStore
    dispatch(Actions.addFormItem(data))
} 

const selectedElement = event => {
    const { dispatch } = window.AwesomeFormBuilderStore
    let index = event.target.getAttribute('data-type') || event.target.parentNode.getAttribute('data-type') 
    dispatch(Actions.selectElement(index))
}

class FormBuilderView extends React.Component{

    componentDidUpdate(prevProps){
        if(prevProps && prevProps.json && prevProps.json !== this.props.json && Object.keys(this.props.json).length){
            this.props.saveJSON(this.props.json)
        }
    }

    render = () => {
        let {props} = this
        console.log("props",props)

        return(
            <React.Fragment>
                <div className="form-builder-container">
                    <div className="input-type-container">
                        <div className="grey">
                            <h5>New Fields</h5>
                            {
                                props.permittedFormItems.map(i => {
                                    let input = FORM_ITEM_TYPE[i]
                                    return(
                                        // onClick={this.addItemsToForm}
                                    <div className="input-selector" data-label={input.key} onClick={() => addFormItem(input.key)}><span>{input.icon}</span>{input.label}</div>
                                    )
                                })
                            }
                        </div>
                        <div className="button-container">
                            <Button style_type={`${ props.enableSubmit ? "primary": 'disabled'}`} onClick={() => {
                                    console.log(props.formItems)
                                    if(props.enableSubmit){
                                        const { dispatch } = window.AwesomeFormBuilderStore
                                        dispatch(Actions.saveJSON())
                                    } else {
                                        
                                    }
                                }} 
                                style={{ width: "100%"}}>Save Form </Button>
                            <Button style_type="secondary" >Save & Close</Button>
                            <Button style_type="secondary" >Cancel</Button>
                        </div> 
                    </div>
                    <div className="form-preview-container" onClick={selectedElement}>
                    {
                        props.formItems.map((item,index) => {
                            return item.renderBuilderView(index, props.selectedItem)
                        })
                    }
                    </div>
                    <div className="extra-info">
                    {
                        (props.formItems && props.selectedItem) ? <React.Fragment>
                                <h5>Properties</h5>
                                <br/>
                                {
                                    (props.formItems && props.selectedItem && props.selectedItem >=0 ) ? props.formItems[props.selectedItem].renderExtraView(props.formItems[props.selectedItem]) : null
                                }
                        </React.Fragment>: null
                    }
                    </div>
                </div>
                <PreviewModal/>
            </React.Fragment>
        )
    }
}

const FormBuilder = connect(store => {
    return({
        formItems: store.formItems,
        selectedItem: store.selectedItem,
        json: store.json,
        enableSubmit: store.enableSubmit,
        permittedFormItems: store.permittedFormItems || [
            'TEXT_INPUT',
            'MULTI_LINE_INPUT',
            'NUMBER',
            'PHONE',
            'EMAIL',
            'DATE',
            'DROPDOWN',
            'CHECKBOX',
            'MULTI_SELECT',
            'FILE'
        ]
    })
}, null)(FormBuilderView)