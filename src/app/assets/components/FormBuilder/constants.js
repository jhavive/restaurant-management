import { SingleLine } from '../../images/svg/form-builder/SingleLine'
import { Checkbox } from '../../images/svg/form-builder/checkbox'
import { DateIcon } from '../../images/svg/form-builder/date'
import { Email } from '../../images/svg/form-builder/email'
import { MultiLine } from '../../images/svg/form-builder/MultiLines'
import { MultiSelect } from '../../images/svg/form-builder/MultiSelect'
import { Number } from '../../images/svg/form-builder/Number'
import { Phone } from '../../images/svg/form-builder/phone'
// import { SingleLine } from '../../images/svg/form-builder/phone'
import { Upload } from '../../images/svg/form-builder/upload'
import { Dropdown } from '../../images/svg/form-builder/dropdown'
import React from 'react'

export const FORM_ITEM_TYPE = {
    // DIV: {
    //     key: 'DIV',
    //     label: 'Div'
    // },
    // TEXT_INPUT: {
    //     key: 'TEXT_INPUT',
    //     label: 'Text Input'
    // },
    // DATE_INPUT: {
    //     key: 'DATE_INPUT',
    //     label: 'Date Input'
    // },
    // DATETIME_INPUT: {
    //     key: 'DATETIME_INPUT',
    //     label: 'Date Time Input'
    // },
    // NUMBER: {
    //     key: 'NUMBER',
    //     label: 'Number'
    // },
    // EMAIL: {
    //     key: 'EMAIL',
    //     label: 'E-Mail'
    // },
    // PHONE_NUMBER: {
    //     key: 'PHONE_NUMBER',
    //     label: 'Phone Number'
    // },
    // CURRENCY: {
    //     key: 'CURRENCY',
    //     label: 'Currency'
    // },
    // FILE: {
    //     key: 'FILE',
    //     label: 'File'
    // },
    // RADIO: {
    //     key: 'RADIO',
    //     label: 'Radio'
    // },
    // CHECKBOX: {
    //     key: 'CHECKBOX',
    //     label: 'Checkbox'
    // },
    // AUTOCOMPLETE: {
    //     key: 'AUTOCOMPLETE',
    //     label: 'Auto Complete'
    // },
    // DROPDOWN: {
    //     key: 'DROPDOWN',
    //     label: 'Dropdown'
    // },

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
    DROPDOWN: {
        icon: <Dropdown/>,
        key: 'DROPDOWN',
        label: 'Dropdown'
    },
    MULTI_SELECT:{
        icon: <MultiSelect/>,
        key: 'MULTI_SELECT',
        label: 'Multi Select'
    },
    CHECKBOX: {
        icon: <Checkbox/>,
        key: 'CHECKBOX',
        label: 'Checkbox'
    },
    EMAIL: {
        icon: <Email/>,
        key: 'EMAIL',
        label: 'Email'
    }, 
    PHONE: {
        icon: <Phone/>,
        key: 'PHONE',
        label: 'Phone'
    },
    DATE: {
        icon: <DateIcon/>,
        key: 'DATE',
        label: 'Date',
    },
    FILE: {
        icon: <Upload/>,
        key: 'FILE',
        label: 'File'
    }
}