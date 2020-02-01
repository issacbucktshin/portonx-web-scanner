import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HelperService {
    constructor(private httpClient: HttpClient) { }
    
    convertBase64ToBlob(b64Data:string,contentType:string){
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
    
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }
    convertCsvToJson<T>(csv: any){             
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
    filePostBuilder(file:File, data?:any) :FormData {
        if(!file && !data) return;
        const postData: FormData = new FormData();
        
        if (file) {
            postData.append(file.name, file, file.name);
        }
        if(data){
         for (let key in data) {
            postData.append(data[key].key || key, JSON.stringify(data[key].value || data[key]));
          }
        }
        return postData;
    }

}