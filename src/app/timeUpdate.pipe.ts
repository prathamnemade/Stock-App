import { AsyncPipe } from "@angular/common";
import { Pipe, ChangeDetectorRef, PipeTransform } from "@angular/core";
import { Observable } from "rxjs";

@Pipe({
    name: 'updatedTime'
})
export class TimePipe implements PipeTransform {

    transform(value: any): any {
        var result: string;
        if (value < 10) {
            result = 'now';
        }
        else if (value < 60) { 
            result = 'updated few seconds ago.';
        }
        else if (value < 3600) { 
            result = 'updated ' + Math.floor(value / 60) + ' minutes ago.';
        }
        else if (value < 86400) { 
            result = 'updated ' + Math.floor(value / 3600) + ' hours ago';
        }
        else { 
            result = 'updated ' + Math.floor(value / 86400) + ' days ago';
        }
        return result;
    }
}