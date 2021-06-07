import React from 'react'
import './styles.scss'

export const Failure = (props) => (
    <div className="failure-container">
        <div class="o-circle c-container__circle o-circle__sign--failure" style={{ width: `${ props.width || '40' }px`, height: `${ props.width || '40' }px`}}>
            <div class="o-circle__sign"  style={{ width:"5px",height:`${ (props.width * 0.7) || '27' }px`}}></div>  
        </div>
    </div>
)