import moment from "moment";

function isValidDateFormat(date: string){
    return moment(date, 'DD/MM/YYYY', true).isValid()
}

export const validate ={
    isValidDateFormat
}