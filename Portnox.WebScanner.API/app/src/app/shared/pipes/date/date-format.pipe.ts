import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormat'
})

export class DateFormatPipe implements PipeTransform {
    transform(value: number, format: string = ""): string {
        if (!value) {
            return "";
        }
        let date = new Date(value);
        let dateStr;
        let day = (date.getDate() < 10 ? "0" : "") + date.getDate();
        let month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
        let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
        let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
        switch (format) {
            case "HH":
                dateStr = hours;
                break;
            case "mm":
                dateStr = minutes;
                break;
            case "HH:mm":
                dateStr = hours + ":" + minutes;
                break;
            case "dd/mm/yyyy":
                dateStr = day + "/" + month + "/" + date.getUTCFullYear();
                break;
            default:
                dateStr = day + "/" + month + "/" + date.getUTCFullYear() + " " + hours + ":" + minutes;
        }
        return dateStr;
    }
}