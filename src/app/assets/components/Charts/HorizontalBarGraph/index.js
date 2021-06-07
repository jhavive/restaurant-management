import React from 'react'
import './styles.scss'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import * as d3 from 'd3'
import { select } from 'd3-selection'
import { topRoundedColumn } from '../utils'
import { CSAT_COLOR } from '../constants'
import { isMobile } from '../../../../utils/device'


export default class HorizontalBarChart extends React.Component {

    constructor(props){
        super(props)
    }

    /* This method is called just prior to component mounting on the DOM (or when the render method is called). Then our component gets mounted. */

    componentWillMount = () => {

    }

    /* This method is called after the component is mounted on the DOM. Like componentWillMount(), it is called only once in a lifecycle.
    Before its execution, the render method is called. We can make API calls and update the state with the API response */

    componentDidMount = () => {
        this.createBarChart()
    }

    /* This method determines whether the component should be updated or not.
    By default, it’ll return true. 
    If at some point, if you want to re-render the component on a condition, then shouldComponentUpdate() method would be the correct choice */

    shouldComponentUpdate = (nextProps, nextState) => {
        return true
    }

    /* We call this method after the re-rendering our component.
    After the updated component gets updated on the DOM, the componentDidUpdate() method executes. This method will receive arguments like prevProps and prevState */

    componentDidUpdate = (prevProps, prevState) => {
        this.createBarChart()
    }

    /* Before the removal of the component from the DOM, componentWillUnMount() will execute */

    componentWillUnmount = () => {

    }

    createBarChart = () => {
        const width         =   this.props.size[0] || 500
        const height        =   this.props.size[1] || 500
        const labelWidth    =   60
        const barHeight     =   height - labelWidth
        const node          =   this.node
        const dataMax       =   max(this.props.data)
        const ySacle        =   scaleLinear()
                                    .domain([ dataMax + 1, 0])
                                    .range([ 0, barHeight ] )
        const yAxis         =   d3.axisLeft(ySacle)

        const xScale        =   scaleBand()
                                    .domain(this.props.items)
                                    .range([0, width]);
        const xAxis         =   d3.axisBottom(xScale)

        let barWidth        =   xScale.bandwidth()

        select(node)
            .selectAll('path')
            .data(this.props.data)
            .enter()
            .append('path')

        select(node)
            .selectAll('path')
            .data(this.props.data)
            .exit()
            .remove()

        select(node)
            .selectAll('path')
            .data(this.props.data)
            .attr("d", (d, i) => topRoundedColumn( ((i) * barWidth) + (barWidth / 5), barHeight, barHeight - ySacle(d) , 20))
            .attr('fill', (d,i) =>  this.props.color ? this.props.color[i] : CSAT_COLOR[i] )


        yAxis.ticks(10)
            .tickSizeInner( - width, 0)
            .tickFormat(d => d)
            // .style("opacity", "0.6")
            // .orient("right")

        select(node).append('g').attr('class','yAxis').call(yAxis).style('transform', `translate(0px ,0px)`)
        select(node)
            .selectAll(".yAxis")
            .selectAll(".tick")
            .selectAll("text")
            .style('transform', `translate(20px , 10px)`)


        select(node)
            .append('g')
            .attr('class','xAxis')
            .call(xAxis)
            .style('transform', `translate(-20px , ${height + 5}px)`)

        select(node)
            .selectAll(".xAxis")
            .selectAll(".domain")
            .style("opacity", 0)
        select(node)
            .selectAll(".xAxis")
            .selectAll(".tick")
            .selectAll("text")
            .style("opacity", 0)
        select(node)
            .selectAll(".xAxis")
            .selectAll(".tick")
            .selectAll("line")
            .style("opacity", 0)
            
        select(node)
            .selectAll(".xAxis")
            .selectAll(".tick")
            // .style("opacity", 0)
            .data(this.props.items)
            .append("foreignObject")
            .attr("width", labelWidth - (isMobile() ? 5 : 0))
            .attr("height", 50)
            .style("transform", () => isMobile() ? "rotate(-90deg)" : "rotate(-90deg)")
            .append("xhtml:div")
            // .style("font", "10px")
            .html((d, i) => {
                if ( isMobile() )
                    return `<p style='font-size: 10px; line-height: 1; width: 100%; margin: 0px;`+
                    `padding: 0px; text-align: right;text-transform: capitalize'; word-wrap: break-word;>`+d+"</p>"
                else
                    return `<p style='font-size: 10px; line-height: 1.5; width: 100%; margin: 0px;`+
                    `padding: 0px; text-align: right;text-transform: capitalize;word-wrap: break-word;'>`+d+"</p>"
            })
                        

        select(node).style('transform', 'rotate(90deg)')
    }

    /* render is called to paint the dom */
    render = () => {
        return <svg 
            ref         =   {node => this.node = node}
            width       =   { this.props.size[0] || '500'}
            height      =   { this.props.size[1] || '500'}
            className   =   'horizontal-bar-graph-container'
            >
                
        </svg>
    }


}