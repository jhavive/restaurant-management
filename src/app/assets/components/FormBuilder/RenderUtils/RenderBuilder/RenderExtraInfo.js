import React from 'react'
import Form from '../../../Form'
import { Button } from '../../../Buttons'
import { deepEqual } from '../../../../../utils/object'
import './styles.scss'

export class RenderExtraInfo extends React.Component {

    state = {
        additionalInfo: []
    }

    componentDidMount = () => {
        this.setState({
            additionalInfo: this.props.selectedElement.props
        })
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if(this.props.index!==nextProps.index){
            this.setState({
                additionalInfo: []
            }, this.setState({
                additionalInfo: nextProps.selectedElement.props
            }))
        } else if(this.props.index===nextProps.index && !deepEqual(nextState, this.state)){
            this.setState({
                additionalInfo: nextProps.selectedElement.props
            })
            return true
        }
        return true
    }


    render = () => {
        return(
            <Form
                id="form1"
                onSubmit={() => this.props.saveChanges(this.state.additionalInfo)}
                preventSubmission
                >
                {
                    this.state.additionalInfo.length > 0 && this.state.additionalInfo.map((item,index) => {
                        return item.renderView({
                            name: item.key,
                            placeholder: item.label,
                            tabIndex: index,
                            required: true,
                        })
                    })
                }
                <Button style_type="secondary">Save</Button>
            </Form>
        )

    }
}