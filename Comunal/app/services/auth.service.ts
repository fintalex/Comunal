﻿import { Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable()
export class AuthService {

    CurrentUser: User;
    
    constructor() { }
    
}
