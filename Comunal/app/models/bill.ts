export class Bill {
    Id: number;
    Selected: boolean;
    MaintenanceDatas: any[];
    CounterDatas: any[];
    ForPayment: number = 0;
    Summ: number = 0;

    constructor(
        public InvoiceDate: Date = null,
        public InvoiceDateMonth: number,
        public InvoiceDateYear: number,
        public FlatId: number = 0,
        public Recalculation: number = 0,
        public Fine: number = 1,
        public Comment: string = ''
        ) { }
}