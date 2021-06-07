export const fetchModules = url => {
    get(url)
    .then(response => {
        let resp = JSON.parse(response)
        let { dispatch } = window.tableStore
        dispatch(saveData(resp))
    })
}