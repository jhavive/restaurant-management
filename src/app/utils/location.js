export const goBack = (steps = -1) => {
    let arr = location.pathname.split('/')
    arr.pop()
    return arr.join('/')
}