

export function formatterDateTime(date: string){  
    var arrData = date.split('/');

    var stringFormatter = arrData[1] + '-' + arrData[0] + '-' + arrData[2];
    var dataFormated = new Date(stringFormatter);

    return dataFormated;
}