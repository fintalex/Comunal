using Data;
using System.Data.Entity;
using System.Data.Entity.Validation;

namespace Domain
{
    public class DataContext : DbContext, IDataContext
    {
        static DataContext()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<DataContext>());
        }

        public DataContext()
            : base("DefaultConnection")
        {
            this.Flats = this.Set<Flat>();

            this.Counters = this.Set<Counter>();

            this.CounterTypes = this.Set<CounterType>();

            this.CounterTarifs = this.Set<CounterTarif>();

            this.Units = this.Set<Unit>();
        }

        public IDbSet<Flat> Flats { get; set; }

        public IDbSet<Counter> Counters { get; set; }

        public IDbSet<CounterType> CounterTypes { get; set; }

        public IDbSet<CounterTarif> CounterTarifs { get; set; }

        public IDbSet<Unit> Units { get; set; }

        /// <summary>
        /// Commit changes
        /// </summary>
        public void Commit()
        {
            ////// Delete orphan permission records
            ////this.AssignedPermissions.Local.Where(it => it.LinkedPermission == null).ToList()
            ////    .ForEach(it => this.AssignedPermissions.Remove(it));

            try
            {
                this.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                //var logger = LogManager.GetCurrentClassLogger();
                //foreach (var eve in ex.EntityValidationErrors)
                //{
                //    logger.Error(string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:", eve.Entry.Entity.GetType().Name, eve.Entry.State));
                //    foreach (var ve in eve.ValidationErrors)
                //    {
                //        logger.Error(string.Format("- Property: \"{0}\", Error: \"{1}\"", ve.PropertyName, ve.ErrorMessage));
                //    }
                //}

                //throw ex;
            }
            ////catch (Exception ex)
            ////{
            ////    var logger = LogManager.GetCurrentClassLogger();
            ////    logger.Error(ex.Message);
            ////    throw ex;
            ////}

            /*      catch (System.Data.Entity.Validation.DbEntityValidationException exception)
                  {
                      Exception raise = exception;
                      foreach (var validationErrors in exception.EntityValidationErrors)
                      {
                          foreach (var validationError in validationErrors.ValidationErrors)
                          {
                              string message = string.Format("{0}:{1}", validationErrors.Entry.Entity, validationError.ErrorMessage);
                        
                              raise = new InvalidOperationException(message, raise);
                          }
                      }

                      throw raise;
                  }     */
        }

        /// <summary>
        /// Revert changes
        /// </summary>
        public void Rollback()
        {
            //var changedEntries = this.ChangeTracker.Entries().Where(x => x.State != EntityState.Unchanged).ToList();

            //foreach (var entry in changedEntries.Where(x => x.State == EntityState.Modified))
            //{
            //    entry.CurrentValues.SetValues(entry.OriginalValues);
            //    entry.State = EntityState.Unchanged;
            //}

            //foreach (var entry in changedEntries.Where(x => x.State == EntityState.Added))
            //{
            //    entry.State = EntityState.Detached;
            //}

            //foreach (var entry in changedEntries.Where(x => x.State == EntityState.Deleted))
            //{
            //    entry.State = EntityState.Unchanged;
            //}
        }
    }
}
