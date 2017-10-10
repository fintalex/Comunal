using Data;
using System;
using DTO;

namespace Services.Interfaces
{
	public interface IUserService
	{
		/// <summary>
		/// Get User by id
		/// </summary>
		/// <param name="id">Id of user</param>
		/// <returns>User</returns>
		UserDTO GetById(int id);

		/// <summary>
		/// Get User by email
		/// </summary>
		/// <param name="email">email of user</param>
		/// <returns>User</returns>
		UserDTO GetByEmail(string email);

		/// <summary>
		/// Delete User by id
		/// </summary>
		/// <param name="id">User id</param>
		void DeleteUser(int id);

		/// <summary>
		/// Add User
		/// </summary>
		/// <param name="user">newUser</param>
		UserDTO AddUser(NewUserDTO newUser);

		/// <summary>
		/// Update user
		/// </summary>
		/// <param name="user">User</param>
		void UpdateUser(NewUserDTO user);

		/// <summary>
		/// Get user during login
		/// </summary>
		/// <param name="email">email of loging user</param>
		/// <param name="password">password of loging user</param>
		/// <returns>Loging user</returns>
		UserDTO GetUserByLogin(string email, string password);

		/// <summary>
		/// Change date of last login
		/// </summary>
		/// <param name="userId">User Id</param>
		/// <param name="dateTimeLogin">Date of last login</param>
		void SetDateOfLastLogin(int userId, DateTime dateTimeLogin);
	}
}