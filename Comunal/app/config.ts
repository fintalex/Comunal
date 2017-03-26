// http://localhost:53695/
import { Injectable } from '@angular/core';

@Injectable()
export class Config {
    public static get API_ENDPOINT(): string { return 'http://localhost:53695/'; }
}