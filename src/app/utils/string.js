export const spaceToUnderscore = str => str.toLowerCase().split(' ').join('_')
export const underscoreToSpace = str => str.toLowerCase().split('_').join(' ')
export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}