// const app_endpoints = {
//     // No starting or ending backslashes to be added  

//     contacts:{
//         contacts: [],
//         modules: []
//     },
//     leads: {
//         contacts: [],
//         modules: []
//     },
//     inventory: {

//     }
// }
const endpoints = {}
// const settings_endpoints = {

// }
    
    // Get routes
    
    
    // Inventory
//     getWarehouses: 'warehouses',
//     addWarehouses: 'warehouses',

//     getOrders: 'orders',
//     addOrders: 'orders',

//     getProducts: 'products',
//     addProducts: 'products',
    
//     getPurchaseOrders: 'purchase-orders',
//     addPurchaseOrders: 'purchase-orders',

//     // CRM
//     getLeads: 'leads',
//     addLeads: 'leads',
//     deleteLeads: 'leads',

//     getModules: 'modules',
//     addModules: 'modules',

//     // Organizatino
//     getUsers: 'users',
//     addUser: 'users',
//     deleteUsers: 'users',

//     getPermissions: 'permissions',
//     assignPermissions: 'permissions'
// }

const baseURL = {
    // development: 'http://localhost:8000',
    development: 'http://192.168.1.12:8000',
    staging: 'https://api.bristag.com',
    production: 'https://api.bristag.com',
}

const config = {
    baseURL: baseURL[process.env.SERVER_ENV ? process.env.SERVER_ENV : 'development'],
    getRoutes: {
        path: 'get-routes',
        methods: ['GET']
    },
    routes: {
        tables: {
            tables: {
                app: "tables",
                path: "tables",
                methods: ["POST","PUT","DELETE","GET"]
            },
            order: {
                app: "tables",
                path: "order",
                methods: ["POST","PUT","DELETE","GET"]
            }
        },
        menu:{
            menu: {
                app: "menu",
                path: "menu",
                methods: ["POST","PUT","DELETE","GET"]
            }
        },
        
    }

} 

export default config
