import {
    ADD_DATA,
    FILTER_DATA,
    SORT_DATA,
    SEARCH_DATA,
    CHANGE_PAGE,
    TABLE_STATE,
    RESET_DATA,FAILURE_GET_DATA,
    OPEN_HEADER_MODAL,
    CLOSE_HEADER_MODAL,
    CHANGE_HEADER,
    PAGE_SIZE,
    CLEAR_FILTER_DATA,
    SET_MODULE_INFO,
    SET_URL_PATH
} from './constants'

const reducer = props => {

    const defaultState = {
        urlPath: '',
    module_info: {},
    display_data: [],
    actual_data: [],
    filter_data: {},
    selected_data: [],
    sort_data: {},
    search_data: {},
    // pagination data
    current_page: 1,
    item_per_page: 10,
    item_count: 37,
    table_state: TABLE_STATE.LOADING,
    // selected_header: ['module','name','address','module1','name1','address1','module2','name2','address2',],
    open_header_modal: false,
    selected_header: [],
    ...props
}

return (state = defaultState, action) => {

    let getDataToDisplay = (data, itemPerPage = state.item_per_page, currentPage = state.current_page) => {
        let lowerLimit = ((currentPage - 1) * itemPerPage)
        let upperLimit =  currentPage * itemPerPage + 1 
        let paginatedData = data.slice(lowerLimit, upperLimit)
        return(paginatedData)
    }

    let searchData = (searchValue) => {
        let value = state.actual_data.reduce((acc, curr) => {
            let arr = Object.keys(curr)
            for(let i = 0; i< arr.length; i++){
                if(curr[arr[i]].toString().includes(searchValue)){
                    acc.push(curr)
                    return acc
                }
            }
            return acc
        }, [])
        return value
    }
    


    let filterData = (key, filter) => {
        console.log(key, filter)
        let value = state.actual_data.reduce((acc, curr) => {
            console.log(curr)
            if(curr[key].includes(filter)){
                acc.push(curr)
            }
            // let arr = Object.keys(curr)
            // for(let i = 0; i< arr.length; i++){
            //     if(curr[arr[i]].toString().includes(searchValue)){
                //         acc.push(curr)
            //         return acc
            //     }
            // }
            return acc
        }, [])
        return value
    }
    
    switch (action.type) {
        case SET_MODULE_INFO:
            return{
                ...state,
                module_info: action.data
            }
        case SET_URL_PATH:
            console.log("SET_URL_PATH", action.data)
            return{
                ...state,
                urlPath: action.data
            }
            case ADD_DATA:
                if(action.data.length)
                return {
                    ...state,
                    urlPath: action.url,
                    table_state: TABLE_STATE.SUCCESS,
                    actual_data: action.data,
                    display_data: getDataToDisplay(action.data)
                }
            else
            return {
                ...state,
                table_state: TABLE_STATE.EMPTY,
                urlPath: action.url,
                actual_data: [],
                    display_data: []
                }
                case FAILURE_GET_DATA:
                    return{
                        ...state,
                table_state: TABLE_STATE.ERROR,
                actual_data: [],
                display_data: []
            }
            case RESET_DATA:
                return {
                ...state,
                table_state: TABLE_STATE.LOADING,
                display_data: [],
                actual_data: []
            }

            case OPEN_HEADER_MODAL:
                return {
                    ...state,
                open_header_modal: true
            }   
        case CLOSE_HEADER_MODAL:
            return {
                ...state,
                open_header_modal: false
            }
            
            case CHANGE_HEADER:
                return {
                    ...state,
                    open_header_modal: false,
                selected_header: action.data
            }
            
            case PAGE_SIZE:
                return {
                    ...state,
                    item_per_page: action.data,
                    display_data: getDataToDisplay(state.actual_data, action.data)
            }
            case FILTER_DATA:
                console.log(action.data)
                let key = Object.keys(action.data)[0]
            let value = action.data[key]
            return {
                ...state,
                filter_data: { ...state.filter_data, [key]: value },
                display_data: filterData(key, value)
            }
        case CLEAR_FILTER_DATA: 
        return {
            ...state,
                filter_data: removeFilter(),
                display_data: getFilterData(removeFilter())
            }

            case SORT_DATA:
                case SEARCH_DATA:
                    return {
                        ...state,
                display_data: searchData(action.data)
            }
            case CHANGE_PAGE:
                switch(action.data){
                    case '|&lt;&lt;':
                    return {
                        ...state,
                        current_page: action.data,
                        display_data: getDataToDisplay(state.actual_data, state.item_per_page, 1)
                    }
                    case '&lt;':
                        return {
                            ...state,
                        current_page: action.data,
                        display_data: getDataToDisplay(state.actual_data, state.item_per_page, (state.current_page - 1))
                    }
                case '&gt;':
                    return {
                        ...state,
                        current_page: action.data,
                        display_data: getDataToDisplay(state.actual_data, state.item_per_page, (state.current_page + 1))
                    }
                    case '&gt;&gt;|':
                        return {
                        ...state,
                        current_page: action.data,
                        display_data: getDataToDisplay(state.actual_data, state.item_per_page, Math.ceil(state.item_count / state.item_per_page))
                    }
                default:
                    return {
                        ...state,
                        current_page: action.data,
                        display_data: getDataToDisplay(state.actual_data, state.item_per_page, action.data)
                    }
                }
                default:
            return state
        }
    }
  
}

export { reducer }