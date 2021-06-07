import React, { useState, useEffect } from 'react'
import './styles.scss'
import { FORM_ITEM_TYPE } from '../constant';
import { spaceToUnderscore } from '../../../../../utils/string'
import { deepCopyFunction } from '../../../../../utils/object'
import Close from '../../../../images/svg/close'
import connect from 'react-redux/lib/connect/connect';
import * as Actions from '../../redux/actions'
import BuilderViewComponent from './renderBuilderView'
import ExtraViewComponent from './renderExtraView';
import View from './renderView'

export default class CSATScaleFormItem {

    error = true
    builderFormData = {
        type: FORM_ITEM_TYPE.CSAT_SCALE.key,
        props:{
            name: '',
            options: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
            label: '',
            required: false,
            tooltip: false
        }
    }

    onChange = event  => {
        this.value = event.target.value
    }
    
    getJSON = ()  => {
        return({ [this.name]: this.value })
    }

    getObjectFromJSON = jsonObj => {
        this.builderFormData.type = FORM_ITEM_TYPE.CSAT_SCALE.key
        this.value = jsonObj.value || ''
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
        this.builderFormData.props.name         =     spaceToUnderscore(temp.label),
        this.builderFormData.props.options      =     temp.options,
        this.builderFormData.props.label        =     temp.label,
        this.builderFormData.props.required     =     temp.required
        this.builderFormData.props.tooltip      =     temp.tooltip
    }

    renderExtraView = props => {

        let ExtraView = props => <ExtraViewComponent {...props}/>

        return <ExtraView {...this.builderFormData.props} onPropsSave={this.onPropsSave}/>
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
            options         =   {this.builderFormData.props.options}
            />
    }

}

