import React from 'react'

export const Loader = (props) => (
    <div class="loader loader--style7" title="6">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width={(props.width * 5)} height={props.height} viewBox={`0 0 ${props.height} ${props.width * 4}`}>
            <rect x="0" y="0" width={props.width} height={(props.height - 4)} fill={ props.fill || "#fff" }>
            <animate attributeName="opacity" attributeType="XML"
                values="1; .2; 1" 
                begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x={((props.width * 1) + 4)} y="0" width={props.width} height={(props.height - 4)} fill={ props.fill || "#fff" }>
            <animate attributeName="opacity" attributeType="XML"
                values="1; .2; 1" 
                begin="0.2s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x={((props.width * 2) + 8)} y="0" width={props.width} height={(props.height - 4)} fill={ props.fill || "#fff" }>
            <animate attributeName="opacity" attributeType="XML"
                values="1; .2; 1" 
                begin="0.4s" dur="0.6s" repeatCount="indefinite" />
            </rect>
        </svg>
    </div>
)