import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Pipe({
    name: 'defaultPath'
})

export class DefaultPathPipe implements PipeTransform {
    transform(value: any): any {
        let path: string = environment.assets.path + value;
        return path;
    }
}