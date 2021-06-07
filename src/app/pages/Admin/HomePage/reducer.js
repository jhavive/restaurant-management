import { SET_ROUTES, CUSTOM_FOOTER, 
    REMOVE_CUSTOM_FOOTER, HIDE_FOOTER, SHOW_FOOTER,
    OPEN_MODAL, CLOSE_MODAL, 
    OPEN_LOADER, CLOSE_LOADER,
    CHANGE_ROUTE, SELECT_TABLE
} from './constants'
  
const defaultState = {
    allowedApps: [
        'table',
        'menu'
    ],
    show_footer: true,
    open_modal: false,
    open_loader: true,
    activeRoute: location.pathname.split('/')[2],
    activeSubRoute: '',
    selectedTable: null,
    tableOrder: null,
}
  
const reducer = (state = defaultState, action) => {

    switch (action.type) {
        case SET_ROUTES:
            return{
                ...state,
                allowedApps: action.data
            }
        case CUSTOM_FOOTER:
            return {
                ...state,
                show_footer: true,
                custom_footer: action.data.component,
                data: action.data.data
            }
        case REMOVE_CUSTOM_FOOTER:
            return {
                ...state,
                show_footer: true,
                custom_footer: '',
                data: ''
            }
        
        case HIDE_FOOTER:
            return {
                ...state,
                show_footer: false
            }
        case SHOW_FOOTER:
            return {
                ...state,
                show_footer: true
            }
        case OPEN_MODAL:
            console.log(action)
            return {
                ...state,
                open_modal: true,
                modal_body: action.modalBody,
                modal_type: action.modalType
            }
        case CLOSE_MODAL:
            return {
                ...state,
                open_modal: false
            }   
        case OPEN_LOADER:
            return {
                ...state,
                open_loader: true
            }
        case CLOSE_LOADER:
            return {
                ...state,
                open_loader: false
            }
        case CHANGE_ROUTE:
            return {
                ...state,
                ...action.data
            }
        case SELECT_TABLE:
            return {
                ...state,
                selectedTable: action.selectedTable,
                tableOrder: action.tableOrder
            }
        default:
            return state

    }
}
  
export { reducer }
  