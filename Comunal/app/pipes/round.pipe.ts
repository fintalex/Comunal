import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'round'
})
export class RoundPipe implements PipeTransform {
    transform(value: number) {
        if (value < 0) {
            return 0;
        }
        return Math.round(value * 100) / 100;
    }
}