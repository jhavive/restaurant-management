import React, { useState } from 'react'
import './styles.scss'
import { MoreVertical } from 'react-feather'
import Checkbox from '../Checkbox'
import { keyToNormalString } from '../../../utils/string'


const getObjectCell = (props, item, index) => {
    let cell = []
    for(let i in item) {
        if(i!='routes')
            try{

                cell.push(<div 
                    className   =   "cell" 
                    style       =   {{ width: (screen.width / Object.keys(props.data[0]).length)+"px" }} 
                    data-index  =   {index}
                    >
                        {item[i] || '-'}
                </div>)
                
            } catch(e) {
                
                cell.push(<div 
                    className   =   "cell" 
                    style       =   {{ width: (screen.width / Object.keys(props.data[0]).length)+"px" }} 
                    data-index  =   {index}
                    >{'-'}</div>)
            }
    }
    return cell
}


const getHeader = props => {
    let headers = []
    headers = Object.keys(props.data[0]).map(key => <div 
        className   =   "header"
        style       =   {{ width: (screen.width / Object.keys(props.data[0]).length)+"px" }} 
        >
            {keyToNormalString(key)}
        </div>
    )
    if(!props.disableSelection){
        headers.unshift(<div 
            className   =   "header checkbox-header" 
            style       =   {{ width: "20px"  }}
            >
                <Checkbox name={index+""}/>
            </div>
        )
    } 
    if (props.menuComponent && props.menuComponent[0] && !props.selectedIndexs.length) {
        headers.push(<div 
            className   =   "header action-header" 
            style       =   {{ width: "20px"  }}
            >
                
            </div>
        )
    }
    return headers
}


const traverseToParent = function(elm, parent){
    console.log("traverseToParent",elm)
    if(elm.className.includes && elm.className.includes(parent)){
        return elm
    }
    return traverseToParent(elm.parentNode, parent)
}


const Table = props => {

    let onClickMenu = index => {
        console.log(index, "onClickMenu ", openMenu)
        let temp = JSON.parse(JSON.stringify(openMenu)).map(i => false)
        temp[index] = !temp[index]
        console.log("onClickMenu ", temp)
        setOpenMenu(temp)
    }

    let [openMenu, setOpenMenu] = ['', '']

    if (props.menuComponent) {
        [openMenu, setOpenMenu] = useState(props.menuComponent.map(c => false))
    }

    const onClick = e => {
        console.log("onClick onClick",e.target.parentNode.parentNode)
        if(e.target.className==='cell' && openMenu && openMenu.every(i => !i))
        {
            e.stopPropagation()
            props.onItemClick(e)
        } 
        else if((e.target.className==='cell' && openMenu && !openMenu.every(i => i) )
            || e.target.parentNode.parentNode.className.includes('card-menu-options')) 
        {
            setOpenMenu(props.menuComponent.map(c => false))
        } 
        else if(e.target.tagName==='LABEL')
        {
            let cell = e.target.parentNode.parentNode
            if(cell.className.includes('cell'))
                props.onItemSelect({
                    target: cell
                })
            else 
                props.onItemsSelect()
        } 
        else if(e.target.className.includes && e.target.className.includes('checkbox-cell'))
        {
            props.onItemSelect(e)
        }
        else if(e.target.className.includes && e.target.className.includes('checkbox-header'))
        {
            props.onItemsSelect()
        }
        else if(e.target.tagName==='circle' || e.target.tagName==='svg' || e.target.className.includes('action-cell'))
        {
            let cell = traverseToParent(e.target, 'cell')
            onClickMenu(cell.getAttribute('data-index'))
        }
        else
        {
            props.onItemClick(e)
        }
    }

    if(props.data.length)
        return <div className="flex-table" onClickCapture={onClick}>
            <div className="flex-header-container"> 
                {
                    props.data && props.data.length && getHeader(props)
                }
            </div>
            <div className="flex-body-container">
                {
                    props.data &&
                     props.data.length &&
                      props.data.map((item, index) => <div className="flex-row" data-index={index}>
                        <React.Fragment>
                            {
                                !props.disableSelection ? <div 
                                        className   =   "cell checkbox-cell" 
                                        style       =   {{ width: "20px" }} 
                                        data-index  =   {index}
                                        >
                                            <Checkbox 
                                                name        =   { index+"" }
                                                checked     =   { props.selectedIndexs.includes(index+"") } 
                                                />
                                    </div>
                                    : null
                            }
                            {
                                getObjectCell(props, item, index)
                            }
                            {
                                props.menuComponent && props.menuComponent[index] && !props.selectedIndexs.length ? 
                                <div 
                                    className   =   "cell action-cell" 
                                    style       =   {{ width: "20px"}}
                                    data-index  =   {index} 
                                    >
                                    <MoreVertical 
                                        className   =   "menu" 
                                        size        =   "18"
                                        data-type   =   {index}
                                        />
                                        <div className={`hide-mobile table-menu-container ${openMenu[index] ? 'show-menu' : 'hide-menu'}`}>
                                        {
                                            props.menuComponent[index]
                                        }
                                    </div>
                                </div>
                                : null
                            }
                        </React.Fragment>
                    </div>  )
                }
            </div>
        </div>
    else
        return <div style={{
                width       :   "100%", 
                height      :   "100px", 
                padding     :   "20px 0px",
                textAlign   :   "center", 
                color       :   "#17a419", 
                border      :   "1px solid #17a419"
            }}>Sorry No Entries</div>
}

export default Table