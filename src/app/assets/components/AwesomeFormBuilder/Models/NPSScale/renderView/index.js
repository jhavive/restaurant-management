import React, { useState } from 'react'
import './styles.scss'

const RATINGS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const View = props => {

    let [value, setValue] = useState(props.value)

    const onChange = event => {
        event.stopPropagation()
        let index   =   event.target.getAttribute('data-type')
        if(index){
            setValue(index)
            props.onChange(props.name, index)
        }
    }

    return  <div className="nps-scale-view" onClick={onChange}>
        <h5>{props.label}</h5>
        <input required value={value}/>
        <div className  =   "flex-end header-row">
            <p>Not at all likely</p>
            <p>Extremely likely</p>
        </div>
        <div className   =   "flex-end flex-align-center number-row">
            {
                RATINGS.map((rating, index) => 
                    <React.Fragment>
                        {
                            index === 5 &&  
                                window.matchMedia("(min-width: 320px) and (max-width: 767px) and (orientation: portrait)").matches?
                                <p className="line-break"></p>
                                :null
                        }
                        <p
                            data-type   =   { rating }
                            className   =   { value == rating ? 'active' : '' }
                            >
                                {rating}
                        </p>

                    </React.Fragment>
                )
            }
        </div>
    </div>
}

export default View 