export class Maintenance {
    Id: number;
    Selected: boolean;
    Tarif: number | null = null;
    Counters: any;
    State: string;

    constructor(
        public Name: string = null,
        public FlatId: number = 0,
        public MaintenanceTypeId: number = 0,
        public SortOrder: boolean = true,
        public Coefficient: number = 1,
        public MaintenanceTarifId: number | null = null
        ) { }
}