import React from 'react'
import './styles.scss'
import { COUNTRY_CODES } from './constants'
import Input from '../Input'

const  Phone = props =>  <React.Fragment>
    <div className="phone-input-container">
        <select onChange={props.onCountryCodeChange}>
            {
                Object.keys(COUNTRY_CODES).map(country => <option value={country}>(+{country})&emsp; &emsp;{COUNTRY_CODES[country]}</option>)
            }
        </select>
        <Input onChange={props.onChange} {...props} type='number'/>
    </div>
</React.Fragment>

export default Phone