import React from 'react'
import './styles.scss'
import * as Actions from '../../../redux/actions'
import Close from '../../../../../images/svg/close'
import VeryDissatisfied from '../../../../../images/svg/form-builder/csat/very_dissatisfied'
import Dissatisfied from '../../../../../images/svg/form-builder/csat/dissatisfied'
import Neutral from '../../../../../images/svg/form-builder/csat/neutral'
import Satisfied from '../../../../../images/svg/form-builder/csat/satisfied'
import VerySatisfied from '../../../../../images/svg/form-builder/csat/very_satisfied'

const BuilderViewComponent = (props) => {
    let { index, activeIndex, error, label } = props

    let removeElement = e => {
        let { dispatch } = window.AwesomeFormBuilderStore
        dispatch(Actions.removeElement(index))
    }

    return( 
        <div 
            className   =   { `${(activeIndex==index) ? 'csat-emo-builder-view-active' : 'csat-emo-builder-view'}`+
                                ` ${error ? 'error-case' : ''}`} 
            data-type   =   {index}
            >
                <label data-type   =   {index}>
                    {
                        label || 'CSAT'
                    }
                </label><br/>
                <div 
                    className   =   "flex-end emo-row"
                    data-type   =   {index}
                    >
                        <div className="icon" data-type   =   {index}>
                            <VeryDissatisfied data-type   =   {index}/>
                            Very <br/>Dissatisfied
                        </div>
                        <div className="icon" data-type   =   {index}>
                            <Dissatisfied data-type   =   {index}/>
                            Dissatisfied
                        </div>
                        <div className="icon" data-type   =   {index}>
                            <Neutral data-type   =   {index}/>
                            Neutral
                        </div>
                        <div className="icon" data-type   =   {index}>
                            <Satisfied data-type   =   {index}/>
                            Satisfied
                        </div>
                        <div className="icon" data-type   =   {index}>
                            <VerySatisfied data-type   =   {index}/>
                            Very <br/>Satisfied
                        </div>
                </div>
                <Close className="close" onClick={() => removeElement(index)}/>
        </div>
    )
}

export default BuilderViewComponent