import React from 'react'
import RenderForm from './RenderUtils/RenderForm'
import RenderBuilder from './RenderUtils/RenderBuilder'

const FormBuilder = (props) => props.builder ? <RenderBuilder {...props}/> :<RenderForm name={props.name} formData={props.formData} path={props.path}/>

export default FormBuilder