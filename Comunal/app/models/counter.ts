export class Counter {
    Id: number;

    constructor(
        public Name: string = null,
        public FlatId: number,
        public CounterTypeId: number,
        public Address: string = null,
        public EnableODN: number = 1,
        public SortOrder: boolean = true,
        public UnitConvertCoefficient: number = 1,
        public CounterTarifId: number | null = null
        ) { }
}