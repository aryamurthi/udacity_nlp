function checkForURL(inputText) {
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (inputText.match(regex)){
        return true
    }else{
        return false
    }
}
export { checkForURL }
