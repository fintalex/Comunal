"use strict";
var Counter = (function () {
    function Counter(Name, FlatId, CounterTypeId, Address, EnableODN, SortOrder, UnitConvertCoefficient, CounterTarifId) {
        if (Name === void 0) { Name = null; }
        if (Address === void 0) { Address = null; }
        if (EnableODN === void 0) { EnableODN = 1; }
        if (SortOrder === void 0) { SortOrder = true; }
        if (UnitConvertCoefficient === void 0) { UnitConvertCoefficient = 1; }
        if (CounterTarifId === void 0) { CounterTarifId = null; }
        this.Name = Name;
        this.FlatId = FlatId;
        this.CounterTypeId = CounterTypeId;
        this.Address = Address;
        this.EnableODN = EnableODN;
        this.SortOrder = SortOrder;
        this.UnitConvertCoefficient = UnitConvertCoefficient;
        this.CounterTarifId = CounterTarifId;
    }
    return Counter;
}());
exports.Counter = Counter;
//# sourceMappingURL=counter.js.map