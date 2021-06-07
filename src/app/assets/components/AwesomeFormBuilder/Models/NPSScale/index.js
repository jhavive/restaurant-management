import React, { useState, useEffect } from 'react'
import './styles.scss'
import { FORM_ITEM_TYPE } from '../constant';
import connect from 'react-redux/lib/connect/connect'
import { spaceToUnderscore } from '../../../../../utils/string'
import BuilderViewComponent from './renderBuilderView';
import ExtraViewComponent from './renderExtraView';
import View from './renderView';

export default class NPSScaleFormItem {
    
    error = true
    value = []
    builderFormData = {
        type: FORM_ITEM_TYPE.NPS.key,
        props:{
            name: '',
            label: '',
            required: false,
        }
    }

    onChange = value => {
        this.value = value
    }
    
    getJSON = ()  => {
        return({ [this.name]: this.value })
    }

    getObjectFromJSON = jsonObj => {
        this.builderFormData.type = FORM_ITEM_TYPE.NPS.key
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
        this.error = false
        this.builderFormData.props.name =  spaceToUnderscore(temp.label),
        this.builderFormData.props.label =  temp.label,
        this.builderFormData.props.required =  temp.required
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
        
        return <View {...this.builderFormData.props} {...props}/>
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

