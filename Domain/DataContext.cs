using Data;
using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.Validation;
using System.Reflection;
using System.Linq;
using System.Data.Entity.ModelConfiguration;

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
			this.Users = this.Set<User>();

			this.Flats = this.Set<Flat>();

			this.Bills = this.Set<Bill>();


			this.Counters = this.Set<Counter>();

			this.CounterTypes = this.Set<CounterType>();

			this.CounterTarifs = this.Set<CounterTarif>();

			this.Units = this.Set<Unit>();

			this.CounterDatas = this.Set<CounterData>();


			this.Maintenances = this.Set<Maintenance>();

			this.MaintenanceTypes = this.Set<MaintenanceType>();

			this.MaintenanceTarifs = this.Set<MaintenanceTarif>();

			this.MaintenanceDatas = this.Set<MaintenanceData>();

			this.MaintenanceDataSources = this.Set<MaintenanceDataSource>();
		}

		public DbSet<User> Users { get; set; }

		public DbSet<Flat> Flats { get; set; }

		public DbSet<Bill> Bills { get; set; }


		public DbSet<Counter> Counters { get; set; }

		public DbSet<CounterType> CounterTypes { get; set; }

		public DbSet<CounterTarif> CounterTarifs { get; set; }

		public DbSet<Unit> Units { get; set; }

		public DbSet<CounterData> CounterDatas { get; set; }


		public DbSet<Maintenance> Maintenances { get; set; }

		public DbSet<MaintenanceType> MaintenanceTypes { get; set; }

		public DbSet<MaintenanceTarif> MaintenanceTarifs { get; set; }

		public DbSet<MaintenanceData> MaintenanceDatas { get; set; }

		public DbSet<MaintenanceDataSource> MaintenanceDataSources { get; set; }

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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            this.RegisterConfigurations(modelBuilder);
        }

        /// <summary>Maps registration</summary>
        /// <param name="modelBuilder">Default model builder</param>
        private void RegisterConfigurations(DbModelBuilder modelBuilder)
        {
            if (modelBuilder == null)
            {
                throw new ArgumentNullException("modelBuilder");
            }

            Assembly.GetExecutingAssembly()
                    .GetTypes()
                    .Where(
                        type =>
                        type.BaseType != null && type.BaseType.IsGenericType
                        && type.BaseType.GetGenericTypeDefinition() == typeof(EntityTypeConfiguration<>))
                    .ToList()
                    .ForEach(
                        type =>
                        {
                            dynamic instance = Activator.CreateInstance(type);
                            modelBuilder.Configurations.Add(instance);
                        });
        }
    }
}
