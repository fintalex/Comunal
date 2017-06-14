export class MaintenanceData {
    Id: number;

    Tarif: number;
    IconPath: number;
    Cost: number;
    Coefficient: number;
    InvoiceDate: Date;

    constructor(
        public MaintenanceName: string = null,
        public MaintenanceId: number = 0,
        public MaintenanceTarifId: number = null,
        public BillId: number
        ) { }
}