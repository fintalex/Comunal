export class CounterData {
    Id: number;
    TarifCount: number;

    Tarif1: number;
    Limit1: number;
    Tarif2: number;
    Limit2: number;
    Tarif3: number;
    IconPath: string;

    constructor(
        public Reading: number = 0,
        public ReadingODN: number = null,
        public ReadingDateYear: number = null,
        public ReadingDateMonth: number = null,
        public IsFirst: boolean = false,

        public CounterName: string = null,
        public CounterId: number = null,
        public CounterTypeId: number = null,
        public BillId: number = null,
        public CounterTarifId: number = null
        ) { }
}