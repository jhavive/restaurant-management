import { SingleLine } from '../../../images/svg/form-builder/SingleLine'
import { Checkbox } from '../../../images/svg/form-builder/checkbox'
import { DateIcon } from '../../../images/svg/form-builder/date'
import { Email } from '../../../images/svg/form-builder/email'
import { MultiLine } from '../../../images/svg/form-builder/MultiLines'
import { MultiSelect } from '../../../images/svg/form-builder/MultiSelect'
import { Number } from '../../../images/svg/form-builder/Number'
import { Phone } from '../../../images/svg/form-builder/phone'
// import { SingleLine } from../ '../../images/svg/form-builder/phone'
import { Upload } from '../../../images/svg/form-builder/upload'
import { Dropdown } from '../../../images/svg/form-builder/dropdown'
import NPS from '../../../images/svg/form-builder/nps'
import CSAT from '../../../images/svg/form-builder/csat'
import React from 'react'

export const FORM_ITEM_TYPE = {
    TEXT_INPUT: {
        icon: <SingleLine/>,
        key: 'TEXT_INPUT',
        label: 'Single Line'
    },
    MULTI_LINE_INPUT: {
        icon: <MultiLine/>,
        key: 'MULTI_LINE_INPUT',
        label: 'Multi Lines'
    },
    NUMBER: {
        icon: <Number/>,
        key: 'NUMBER',
        label: 'Number'
    }, 
    PHONE: {
        icon: <Phone/>,
        key: 'PHONE',
        label: 'Phone'
    },
    EMAIL: {
        icon: <Email/>,
        key: 'EMAIL',
        label: 'Email'
    },
    DATE: {
        icon: <DateIcon/>,
        key: 'DATE',
        label: 'Date',
    },
    DROPDOWN: {
        icon: <Dropdown/>,
        key: 'DROPDOWN',
        label: 'Dropdown'
    },
    CHECKBOX: {
        icon: <Checkbox/>,
        key: 'CHECKBOX',
        label: 'Checkbox'
    },
    MULTI_SELECT:{
        icon: <MultiSelect/>,
        key: 'MULTI_SELECT',
        label: 'Multi Select'
    },
    FILE: {
        icon: <Upload/>,
        key: 'FILE',
        label: 'File'
    },
    NPS: {
        icon: <NPS/>,
        key: 'NPS',
        label: 'Scale Rating'
    },
    CSAT_EMO: {
        icon: <CSAT/>,
        key: 'CSAT_EMO',
        label: 'Group Rating'
    },
    CSAT_SCALE: {
        icon: <CSAT/>,
        key: 'CSAT_SCALE',
        label: 'Review Rating'
    }
}