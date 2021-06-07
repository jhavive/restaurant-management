import React from 'react'
import './styles.scss'

export class TR extends React.Component{

  openAccordian = (event) => {
    let element = event.currentTarget
    if(element.className.includes('accordian-open')){
      element.classList.remove('accordian-open')
      element.classList.add('accordian-closed')
    } else if(element.className.includes('accordian-closed')) {
      element.classList.remove('accordian-closed')
      element.classList.add('accordian-open')
    } else {
      element.classList.add('accordian-open')
    }
  }


  render = () => {
    return(<React.Fragment>
      <tr className="tr-container" {...this.props} onClick={this.props.accordian ? (event) => this.openAccordian(event) : null }>
      {
        this.props.children
      }
      </tr>
      {
        this.props.accordian && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && <tr className="accordian">
        <td colspan="100%">
        {
          this.props.accordianContent
        }
        </td>
      </tr>
      }
    </React.Fragment>
  )}

}
