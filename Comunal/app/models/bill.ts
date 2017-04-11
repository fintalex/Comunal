﻿export class Bill {
    Id: number;
    Selected: boolean;

    constructor(
        public InvoiceDate: Date = null,
        public FlatId: number = 0,
        public Recalculation: number = 0,
        public Fine: number = 1,
        public Comment: string = ''
        ) { }
}