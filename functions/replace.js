const replaceone = (str, find, replace) => {
    return str.replace(find, replace);
}

const replacetwo = (str, find, replace, find2, replace2) => {
    return str.replace(find, replace).replace(find2, replace2);
}


exports.replaceone = replaceone;
exports.replacetwo = replacetwo;