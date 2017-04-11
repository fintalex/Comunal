using System.Linq;
using Data;

namespace Services.Interfaces
{
    public interface IBillService
    {
        /// <summary>
        /// Get Bill by id
        /// </summary>
        /// <param name="id">Id of Bill</param>
        /// <returns>Bill</returns>
        Bill GetById(int id);

        /// <summary>
        /// Get All Bills
        /// </summary>
        /// <returns></returns>
        IQueryable<Bill> GetBills(int billId);

        /// <summary>
        /// Delete Bill by id
        /// </summary>
        /// <param name="id">Bill id</param>
        void DeleteBill(int id);

        /// <summary>
        /// Add Bill
        /// </summary>
        /// <param name="bill">Bill</param>
        Bill AddBill(Bill bill);

        /// <summary>
        /// Update Bill
        /// </summary>
        /// <param name="bill">Bill</param>
        void UpdateBill(Bill bill);
    }
}
