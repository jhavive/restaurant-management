import React from 'react'
import './styles.scss'
import Close from '../../../../../images/svg/close'
import * as Actions from '../../../redux/actions'
// import VeryDissatisfied from '../../../../../images/svg/form-builder/csat/very_dissatisfied'
// import Dissatisfied from '../../../../../images/svg/form-builder/csat/dissatisfied'
// import Neutral from '../../../../../images/svg/form-builder/csat/neutral'
// import Satisfied from '../../../../../images/svg/form-builder/csat/satisfied'
// import VerySatisfied from '../../../../../images/svg/form-builder/csat/very_satisfied'

const BuilderViewComponent = (props) => {
    let { index, activeIndex, error, options } = props

    let removeElement = e => {
        let { dispatch } = window.AwesomeFormBuilderStore
        dispatch(Actions.removeElement(index))
    }

    return( 
        <div 
            className   =   {   
                                ( activeIndex==index  ? 'csat-scale-builder-view-active ' : 'csat-scale-builder-view ') + 
                                ( error               ?   'error-case ' : ' ' )
                            } 
            data-type   =   {index}
            >
                <h5 data-type={index}>Question Will Come Here</h5>
                {
                    options.map((option, i) => (
                        <div 
                            className   =   "flex flex-align-center" 
                            data-type   =   {index}
                            >
                            <div 
                                className   =   {`cirlce ${i==0 ? 'active' : ''}`} 
                                data-type   =   {index}
                                />
                            <p data-type={index}>{option} </p>
                        </div>
                    ))
                }
                <Close className="close" onClick={() => removeElement(index)}/>
        </div>
    )
}

export default BuilderViewComponent