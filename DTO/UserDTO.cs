using System;

namespace DTO
{
    public class UserDTO
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public FlatDTO Flat { get; set; }
        
		public DateTime? DataRegistration { get; set; }
        
		public DateTime? DataLastLogin { get; set; }
    }
}
