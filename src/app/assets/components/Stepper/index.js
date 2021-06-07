import React from 'react'
import './styles.scss'

export default class Stepper extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            selectedIndex: 0,
            selectedItem: this.props.steps[0],
            activeStages: []
        }
    }

    /* This method is called just prior to component mounting on the DOM (or when the render method is called). Then our component gets mounted. */

    componentWillMount = () => {

    }

    /* This method is called after the component is mounted on the DOM. Like componentWillMount(), it is called only once in a lifecycle.
    Before its execution, the render method is called. We can make API calls and update the state with the API response */

    onSave = data => {
        console.log("hello")
        if( this.state.selectedIndex < this.props.steps.length ){
            if(this.props.onStepCompletion){
                this.props.onStepCompletion(data, this.state.selectedIndex)
            } else {
                this.setState({
                    selectedItem: this.props.steps[this.state.selectedIndex + 1],
                    selectedIndex: this.state.selectedIndex + 1
                })
            }
            
        } else {
            this.props.onFinish()
        }
    }

    componentDidMount = () => {
        // let el = React.Children.toArray(props.children)
        // let elements = el.map(child => React.cloneElement(child, { onSave: this.onSave }))
        if(this.props.index){
            this.setState({
                selectedItem: this.props.steps[this.props.index],
                selectedIndex: this.props.index
            })
        }
        this.setState({
            // elements,
            completedStages: this.props.steps.map(i => false)
        })
    }

    /* This method determines whether the component should be updated or not.
    By default, it’ll return true. 
    If at some point, if you want to re-render the component on a condition, then shouldComponentUpdate() method would be the correct choice */

    shouldComponentUpdate = (nextProps, nextState) => {
        console.log(nextProps,"shouldComponentUpdate",this.props)
        if(this.props.index !== nextProps.index){
            this.setState({
                selectedItem: this.props.steps[nextProps.index],
                selectedIndex: nextProps.index
            })
        }
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

    /* render is called to paint the dom */
    render = () => {
        console.log(" stepper this.props",this.props)
        return(
            <div className={`stepper-container step${this.state.selectedIndex+1}`}>
                <div className="stepper-header-container">
                    {
                        this.props.steps.map((step, index) => <React.Fragment>
                            { index > 0 ? <div className   =   {`stepper-hr ${index===this.state.selectedIndex ? 'active' : ''} ${index<this.state.selectedIndex ? 'done' : ''}`}/> : null }
                            <div className = {`step-info-container ${index===this.state.selectedIndex ? 'active' : ''} ${index<this.state.selectedIndex ? 'done' : ''}`}>
                                <div className="position">{index+1}</div>
                                <div className="label">{step.label}</div>
                            </div>
                        </React.Fragment>)
                    }
                </div>
                <div className="stepper-body-container">
                    {
                        this.state.selectedItem.component(this.state.selectedIndex, this.onSave, this.props.stepData)
                    }
                </div>
            </div>
        )
    }


}