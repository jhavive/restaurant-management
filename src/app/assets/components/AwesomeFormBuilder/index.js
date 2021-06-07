import React from 'react'
import Builder from './Builder'
import Form from './Form'
import { Provider } from 'react-redux'
import { AwesomeFormBuilderStore } from './redux/store'
import FeedbackForm from './FeedbackForm'


export default class AwesomeFormBuilder extends React.PureComponent{

    render = () => {
        console.log("AwesomeFormBuilder", this.props.formItems)
        if(this.props)
            if(this.props.builder)
                return <Provider store={AwesomeFormBuilderStore(this.props)}><Builder {...this.props}/></Provider>
            else if(this.props.feedbackForm)
                return <FeedbackForm  {...this.props} formData={this.props.formData || {}}/>
            else 
                return <Form form {...this.props} formData={this.props.formData || {}}/>
        else
            return null
    } 

}