import { ADD_ITEM, REMOVE_ITEM, RESET_DATA, SELECT_TABLE } from './constants'

const defaultState = {
    cart: [],
    selectedTable: null,
    tableOrder: null
}

const addToCart = (state, item, quantity=1) => {
    let cart = state.cart
    let filtered_item = cart.find(i => i.item.id === item.item.id)
    console.log(filtered_item)
    console.log(item)
    if(filtered_item){
        return cart.map(i => {
            if(i.item.id === item.item.id){
                i.quantity ++
            } 
            return i
        })
    } else {
        cart.push({...item, quantity: 1})
        return cart
    }
    
}

const removeFromCart = (state, item, quantity=1) => {
    if (!state.cart.length)
        return []
    let cart = state.cart
    let filtered_item = cart.find(i => i.item.id === item.item.id)
    if(filtered_item){
        return cart.reduce((arr, i) => {
            if(i.item.id === item.item.id){
                if( i.quantity > 1) {
                    i.quantity --
                    arr.push(i)
                }
            }else {
                arr.push(i)
            }
            return arr
        }, [])
    } else {
        return state.cart
    }
}
  
const reducer = (state = defaultState, action) => {

    switch (action.type) {

        case ADD_ITEM:
            let new_item = addToCart(state, {...action.data})
            console.log(new_item)
            return {
                ...state,
                cart: [...new_item]
            }
        
        case REMOVE_ITEM:
            return {
                ...state,
                cart: removeFromCart(state, {...action.data})
            }

        case RESET_DATA:
            return {
                ...state,
                cart: []
            }

        
        default:
            return state

    }
}
  
export { reducer }
  