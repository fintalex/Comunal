﻿using System.Collections.Generic;

namespace Data
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
        
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public virtual ICollection<Flat> Flats { get; set; }
    }
}
