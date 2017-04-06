export class Counter {
    Id: number;

    constructor(
        public Name: string = null,
        public FlatId: number = 0,
        public CounterTypeId: number = 0,
        public EnableODN: number = 1,
        public SortOrder: boolean = true,
        public UnitConvertCoefficient: number = 1,
        public CounterTarifId: number | null = null
        ) { }
}