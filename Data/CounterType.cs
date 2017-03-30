﻿namespace Data
{
	public class CounterType
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public string IconPath { get; set; }


		public int? UnitId { get; set; }

		public virtual Unit Unit { get; set; }
	}
}
