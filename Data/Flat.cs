namespace Data
{
    public class Flat
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public int? UserId { get; set; }

        public virtual User User { get; set; }
    }
}
