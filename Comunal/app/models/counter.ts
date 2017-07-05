export class Counter {
    Id: number;
    Selected: boolean;
    TarifCount: number;
    IconPath: string;

    Tarif1: number;
    Limit1: number;
    Tarif2: number;
    Limit2: number;
    Tarif3: number;
    EditTarifOnly: boolean;
    StartReading: number;

    constructor(
        public Name: string = null,
        public FlatId: number = 0,
        public CounterTypeId: number = null,
        public EnableODN: boolean = false,
        public SortOrder: boolean = true,
        public UnitConvertCoefficient: number = 1,
        public CounterTarifId: number | null = null
        ) { }
}