import {
    FILTER_DATA,
    SORT_DATA,
    SEARCH_DATA,
    CHANGE_PAGE,
    ADD_DATA,
    RESET_DATA,
    FAILURE_GET_DATA,
    OPEN_HEADER_MODAL,
    CLOSE_HEADER_MODAL,
    CHANGE_HEADER,
    PAGE_SIZE,
    CLEAR_FILTER_DATA,
    SET_MODULE_INFO,
    SET_URL_PATH
} from './constants'

export const setModuleInfo = data => ({
    type: SET_MODULE_INFO,
    data
})

export const setUrlPath = data => ({
    type: SET_URL_PATH,
    data
})
  
export const filterData = (data) => ({
    type: FILTER_DATA,
    data
})

export const clearFilter = (key, value) => ({
    type: CLEAR_FILTER_DATA,
    key,
    value
})

export const sortData = (data) => ({
    type: SORT_DATA,
    data
})

export const searchData = (data) => ({
    type: SEARCH_DATA,
    data
})

export const saveData = (data, url) => ({
    type: ADD_DATA,
    data,
    url
}) 

export const errorData = () => ({
    type: FAILURE_GET_DATA
}) 

export const resetData = () => ({
    type: RESET_DATA
})

// Header Related data
export const openHeaderModal = () => ({
    type: OPEN_HEADER_MODAL
})

export const closeHeaderModal = () => ({
    type: CLOSE_HEADER_MODAL
})

export const changeHeader = (data) => ({
    type: CHANGE_HEADER,
    data
})

// Pagination related
export const changePageSize = data => ({
    type: PAGE_SIZE,
    data
})

export const changePage = (data) => ({
    type: CHANGE_PAGE,
    data
})

