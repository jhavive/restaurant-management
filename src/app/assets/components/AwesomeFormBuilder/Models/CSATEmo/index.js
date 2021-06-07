import React, { useState, useEffect } from 'react'
import './styles.scss'
import { FORM_ITEM_TYPE } from '../constant'
import connect from 'react-redux/lib/connect/connect'
import { spaceToUnderscore } from '../../../../../utils/string'
import BuilderViewComponent from './renderBuilderView'
import ExtraViewComponent from './renderExtraView'
import View from './renderView'


export default class CSATScaleFormItem {
    
    error = true
    value = []
    builderFormData = {
        type: FORM_ITEM_TYPE.CSAT_EMO.key,
        props:{
            name: '',
            label: '',
            required: false,
            options: ['','','','',''],
            parameters: ['']
        }
    }

    onChange = value => {
        this.value = value
    }
    
    getJSON = ()  => {
        return({ [this.name]: this.value })
    }

    getObjectFromJSON = jsonObj => {
        this.builderFormData.type = FORM_ITEM_TYPE.CSAT_EMO.key
        this.value = jsonObj.value || []
        this.error = false
        jsonObj.props.name = jsonObj.props.name || spaceToUnderscore(jsonObj.props.label)
    }
    
    getBuilderJSON = ()  => {
        return this.builderFormData
    }
    
    getMeta = ()  => {
        return this.builderFormData.props
    }

    onPropsSave = temp => {
        console.log(temp)
        this.error                              =   false
        this.builderFormData.props.name         =   spaceToUnderscore(temp.label),
        this.builderFormData.props.label        =   temp.label,
        this.builderFormData.props.required     =   temp.required
        this.builderFormData.props.options      =   temp.options
        this.builderFormData.props.parameters   =   temp.parameters
    }

    renderExtraView = props => {
        
        let ExtraView = props => <ExtraViewComponent {...props} />

        return <ExtraView 
            {...props.builderFormData.props} 
            onPropsSave     =   {this.onPropsSave} 
            error           =   {this.error}
        />
    }
    
    renderView = (props={}) => {
        console.log(this," ",props,"deepCopyFunction")

        let ViewComponent = props => <View {...props}/>
        
        return <ViewComponent {...this.builderFormData.props} {...props}/>
    }
    
    renderBuilderView = (index, activeIndex) => {

        let builderView = props => <BuilderViewComponent {...props}/>

        let BuilderView = connect()(builderView)

        return <BuilderView 
            index           =   {index} 
            activeIndex     =   {activeIndex} 
            error           =   {this.error} 
            label           =   {this.label}
        />
    }

}

