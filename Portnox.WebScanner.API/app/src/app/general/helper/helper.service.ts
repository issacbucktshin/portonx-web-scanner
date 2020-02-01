import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HelperService {
    constructor(private router: Router) { }

    convertBase64ToBlob(b64Data: string, contentType: string) {
        contentType = contentType || '';
        var sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, '');
        b64Data = b64Data.replace(/\s/g, '');
        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    convertCsvToJson<T>(csv: any) {
        let allTextLines = csv.split(/\r|\n|\r/);
        let headers = allTextLines[0].split(',');
        let entities: T[] = [];

        for (let i = 0; i < allTextLines.length; i++) {
            let data = allTextLines[i].split(',');
            if (data.length === headers.length) {
                let entity: any = {};
                for (let j = 0; j < headers.length; j++) {
                    entity[headers[j]] = data[j]
                }
                entities.push(entity);
            }
        }
        return entities.slice(1);
    }
    filePostBuilder(file: File, data?: any): FormData {
        if (!file && !data) return;
        const postData: FormData = new FormData();

        if (file) {
            postData.append(file.name, file, file.name);
        }
        if (data) {
            for (let key in data) {
                postData.append(data[key].key || key, JSON.stringify(data[key].value || data[key]));
            }
        }
        return postData;
    }
    handleHttpErrors(response: HttpErrorResponse, messageTitle?: string, customeMessage?: string, redirect: boolean = false, toast: boolean = true) {
        if (response.status == 0) {
            customeMessage = "No connection to the serve"
        }
        let alert: any = {
            acceptBtnTitle: 'Close',
            header: `${messageTitle ? messageTitle : 'An error occurred'}`,
            message: `${customeMessage ? customeMessage : response.error}`,
            warn: true,
            showCloseIcon: false
        }
        //ToDo
        // if (!toast) {
        //     this.dialogService.alert(alert).subscribe();
        // }
        // else {
        //     this.generalService.showSingleToast(alert.header, alert.message, 'error')
        // }

        switch (response.status) {
            case 401:
                if (redirect) {
                    this.redirect(`/${response.status}`, { error: alert.message });
                }
                break;
            case 403:
                if (redirect) {
                    this.redirect(`/${response.status}`, { error: alert.message });
                }
                break;
            case 404:
                if (redirect) {
                    this.redirect(`/${response.status}`, { error: alert.message });
                }
                break;
            default:
                break;
        }

    }
    redirect(url, param: any = null) {
        this.router.navigate([url, param]);
    }

    buildQueryString(values: any, replace: boolean = true) {
        let url = "";
        for (let key in values) {
            if (values[key]) {
                url = `${url}&${key}=${values[key]}`;
            }
        }
        if (replace) {
            url = url.replace('&', '?');
        }
        url = url.replace(/null/g, '');
        url = url.replace(/undefined/g, '');
        return url;
    }
}