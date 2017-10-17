using Data;
using Domain;
using System.Linq;
using Services.Interfaces;
using Services.Translators;
using System.Text;
using System;
using DTO;

namespace Services.Classes
{
	public class UserService : IUserService
	{
		private readonly IDataContext context;

		/// <summary>
		/// User service constructor
		/// </summary>
		/// <param name="context">Data context</param>
		public UserService(IDataContext context)
		{
			this.context = context;
		}

		/// <summary>
		/// Get User by email
		/// </summary>
		/// <param name="email">email of user</param>
		/// <returns>User</returns>
		public UserDTO GetByEmail(string email)
		{
			return this.context.Users
				.FirstOrDefault(f => f.Email == email)
				.ToUserDTO();
		}

		/// <summary>
		/// Get User by id
		/// </summary>
		/// <param name="id">Id of user</param>
		/// <returns>User</returns>
		public UserDTO GetById(int id)
		{
			return this.context.Users
				.FirstOrDefault(f => f.Id == id)
				.ToUserDTO();
        }

		/// <summary>
		/// Delete User by id
		/// </summary>
		/// <param name="id">user id</param>
		public void DeleteUser(int id)
		{
			var user = this.context.Users.FirstOrDefault(x => x.Id == id);
			this.context.Users.Remove(user);
			this.context.Commit();
		}

		/// <summary>
		/// Add user
		/// </summary>
		/// <param name="user">user</param>
		public UserDTO AddUser(NewUserDTO newUser)
		{
			var user = new User
			{
				FirstName = newUser.FirstName,
				LastName = newUser.LastName,
				Password = this.Hash(newUser.Password),
				Email = newUser.Email,
				DataRegistration = DateTime.Now
			};

			this.context.Users.Add(user);
			this.context.Commit();

			return user.ToUserDTO();
		}

		/// <summary>
		/// Update user
		/// </summary>
		/// <param name="user">User</param>
		public void UpdateUser(NewUserDTO user)
		{
			var currentUser = this.context.Users.FirstOrDefault(f => f.Id == user.Id);
			currentUser.Email = user.Email;
			currentUser.FirstName = user.FirstName;
			currentUser.LastName = user.LastName;

			this.context.Commit();
		}

		/// <summary>
		/// Get user during login
		/// </summary>
		/// <param name="email">email of loging user</param>
		/// <param name="password">password of loging user</param>
		/// <returns>Loging user</returns>
		public UserDTO GetUserByLogin(string email, string password)
		{
			var hashedPassword = this.Hash(password);
			return this.context.Users
				.FirstOrDefault(u => u.Email == email && u.Password == hashedPassword)
				.ToUserDTO();
		}

		/// <summary>
		/// Change date of last login
		/// </summary>
		/// <param name="userId">User Id</param>
		/// <param name="dateTimeLogin">Date of last login</param>
		public void SetDateOfLastLogin(int userId, DateTime dateTimeLogin)
		{
			var currentUser = this.context.Users.FirstOrDefault(f => f.Id == userId);
			currentUser.DataLastLogin = dateTimeLogin;
			this.context.Commit();
		}

		private string Hash(string password)
		{
			var bytes = new UTF8Encoding().GetBytes(password);
			var hashBytes = System.Security.Cryptography.MD5.Create().ComputeHash(bytes);
			return Convert.ToBase64String(hashBytes);
		}
	}
}
