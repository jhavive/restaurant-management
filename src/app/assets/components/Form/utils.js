export const changeFormDataToJSON = (formData) => {

    let response = {}
    let pointer = 0
    while(formData.length > 0){
        if(formData[pointer].children) {
            //TODO
        } else if(formData[pointer].parent && formData[pointer].value) {
            if(response[formData[pointer].parent]) {
                response[formData[pointer].parent] = {}
                
            } 
            response[formData[pointer].parent][formData[pointer].name] = formData[pointer].value
        } else {
            response[formData[pointer].name] = formData[pointer].value
        }
        formData.shift()
    }
    return response

}