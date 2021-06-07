import React from 'react'
import './styles.scss'
import Close from '../../../../../images/svg/close'
import * as Actions from '../../../redux/actions'

const BuilderViewComponent = props => {
    let { index, activeIndex, error, label } = props

    let removeElement = e => {
        let { dispatch } = window.AwesomeFormBuilderStore
        dispatch(Actions.removeElement(index))
    }

    return( 
        <div 
            className   =   { `${(activeIndex==index) ? 'nps-builder-view-active' : 'nps-builder-view'}`+
                                ` ${error ? 'error-case' : ''}`} 
            data-type   =   {index}
            >
                <label data-type   =   {index}>
                    {
                        label || 'NPS'
                    }
                </label><br/>
                <div 
                    className  =   "flex-end header-row"
                    data-type   =   {index}
                    >
                    <p data-type   =   {index}>Not at all likely</p>
                    <p data-type   =   {index}>Extremely likely</p>
                </div>
                <div 
                    className   =   "flex-end flex-align-center number-row"
                    data-type   =   {index}
                    >
                        <p data-type   =   {index}>1</p>
                        <p data-type   =   {index}>2</p>
                        <p data-type   =   {index}>3</p>
                        <p data-type   =   {index}>4</p>
                        <p data-type   =   {index}>5</p>
                        <p data-type   =   {index}>6</p>
                        <p data-type   =   {index}>7</p>
                        <p data-type   =   {index}>8</p>
                        <p data-type   =   {index}>9</p>
                        <p data-type   =   {index}>10</p>
                </div>
                <Close className="close" onClick={() => removeElement(index)}/>
        </div>
    )
}

export default BuilderViewComponent 