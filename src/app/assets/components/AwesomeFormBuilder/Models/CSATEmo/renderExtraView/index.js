import React, { useState, useEffect } from 'react'
import './styles.scss'
import * as Actions from '../../../redux/actions'
import { Button } from '../../../../Buttons'
import Form from '../../../Form'
import Input from '../../../Form/FormItemView/Input'
import VeryDissatisfied from '../../../../../images/svg/form-builder/csat/very_dissatisfied'
import Dissatisfied from '../../../../../images/svg/form-builder/csat/dissatisfied'
import Neutral from '../../../../../images/svg/form-builder/csat/neutral'
import Satisfied from '../../../../../images/svg/form-builder/csat/satisfied'
import VerySatisfied from '../../../../../images/svg/form-builder/csat/very_satisfied'
import { PlusCircle, MinusCircle } from 'react-feather'

const ExtraViewComponent = props => {


            
    let { dispatch }                =   window.AwesomeFormBuilderStore
    let [name, setName]             =   useState(props.name)
    let [label, setLabel]           =   useState(props.label)
    let [required, setRequired]     =   useState(props.required)
    let [options, setOptions]       =   useState(props.options)
    let [parameters, setParameters] =   useState(props.parameters)

    let onPropsSave = () => {
        props.onPropsSave({
            name,
            label,
            required,
            options,
            parameters
        })
        dispatch(Actions.extraInfoSave())
    }

    useEffect(() => {
        setName(name)
        setLabel(label)
        setRequired(required)
        setOptions(options)
        setParameters(parameters)
    }, [])

    useEffect(() => {
        setName(name)
        setLabel(label)
        setRequired(required)
        setOptions(options)
        setParameters(parameters)
    }, [name, label, required, options, parameters])

    let addParameters = () => {
        setParameters([...parameters, ''])
        if(!props.error){
            dispatch(Actions.extraInfoChange())
        }
    }

    let removeParameters = id => {
        let t = JSON.parse(JSON.stringify(parameters))
        if(t.length > 1){
            t.splice(id, 1)
            setParameters(t)
        }
    }


    let onChange = (key, value, id=0) => {
        switch(key){
            case 'label':
                setLabel(value)
                break
            case 'option':
                let temp = JSON.parse(JSON.stringify(options))
                temp[id] = value
                setOptions(temp)
                break
            case 'parameter':
                let temp_params = JSON.parse(JSON.stringify(parameters))
                temp_params[id] = value
                setParameters(temp_params)
                break
        }
        if(!props.error){
            dispatch(Actions.extraInfoChange())
        }
    }

    return(
        <Form 
            name    =   {index+'extra_info'} 
            onSave  =   {onPropsSave}
            >
                <Input 
                    label           =   'Enter Question' 
                    name            =   'label' 
                    onChange        =   {e => onChange('label', e.target.value)} value={label}  
                    placeholder     =   "Enter Question" 
                    required
                    />
                <div className="hr"/>
                <h5>Parameters for the Question</h5>
                {
                    parameters.map((parameter, i) => <div className="flex flex-align-center">
                        <Input 
                            value           =   {parameter} 
                            name            =   "parameter" 
                            onChange        =   {(e) => onChange('parameter', e.target.value, i)} 
                            required
                            placeholder     =   {`Choice ${i+1}`}/>
                        { 
                            i === 0 && parameters.length == 1 ? <PlusCircle onClick={e => addParameters()}/> : null
                        }
                        { 
                            i > 0 && i === parameters.length -1 ? <React.Fragment>
                                <PlusCircle onClick={e => addParameters()}/>
                                <MinusCircle onClick={e => removeParameters(i)}/>
                            </React.Fragment> : 
                            <MinusCircle onClick={e => removeParameters(i)}/>
                        }
                    </div>)
                }
                <div className='hr'/>
                <h5>Custom Text along with Emoticons</h5>
                <div className="flex-end flex-align-center">
                    <VeryDissatisfied/>
                    <Input 
                        name            =   'option_1' 
                        onChange        =   {e => onChange('option', e.target.value, 0)} value={options[0]}  
                        placeholder     =   "Enter text" 
                        
                        />
                </div>
                <div className="flex-end flex-align-center">
                    <Dissatisfied/>
                    <Input 
                        name            =   'option_2' 
                        onChange        =   {e => onChange('option', e.target.value, 1)} value={options[1]}  
                        placeholder     =   "Enter text" 
                        
                        />
                </div>
                <div className="flex-end flex-align-center">
                    <Neutral/>
                    <Input 
                        name            =   'option_3' 
                        onChange        =   {e => onChange('option', e.target.value, 2)} value={options[2]}  
                        placeholder     =   "Enter text" 
                        
                        />
                </div>
                <div className="flex-end flex-align-center">
                    <Satisfied/>
                    <Input 
                        name            =   'option_4' 
                        onChange        =   {e => onChange('option', e.target.value, 3)} value={options[3]}  
                        placeholder     =   "Enter text" 
                        
                        />
                </div>
                <div className="flex-end flex-align-center">
                    <VerySatisfied/>
                    <Input 
                        name            =   'option_5' 
                        onChange        =   {e => onChange('option', e.target.value, 4)} value={options[4]}  
                        placeholder     =   "Enter text" 
                        
                        />
                </div>
                <Button style_type="secondary">Save</Button>
        </Form>
    )
}


export default ExtraViewComponent 