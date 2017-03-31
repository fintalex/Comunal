using Data;
using Domain;
using System.Linq;
using Services.Interfaces;
using System.Data.Entity;
using System.Text;
using System;

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
        /// Create a new User
        /// </summary>
        /// <param name="user">User for creating</param>
        public void CreateUser(User user)
        {
            this.context.Users.Add(user);
        }

        /// <summary>
        /// Get User by id
        /// </summary>
        /// <param name="id">Id of user</param>
        /// <returns>User</returns>
        public User GetById(int id)
        {
            return this.context.Users.FirstOrDefault(f=>f.Id == id);
        }

        /// <summary>
        /// Get All Users (then it will be by UserId)
        /// </summary>
        /// <returns></returns>
        public IQueryable<User> GetUsers()
        {
            return this.context.Users;
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
        public User AddUser(User user)
        {
            user.Password = this.Hash(user.Password);
            this.context.Users.Add(user);
            this.context.Commit();

            return user;
        }

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="user">User</param>
        public void UpdateUser(User user)
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
        public User GetUserByLogin(string email, string password)
        {
            var hashedPassword = this.Hash(password);
            return this.context.Users.FirstOrDefault(u => u.Email == email && u.Password == hashedPassword);
        }

        private string Hash(string password)
        {
            var bytes = new UTF8Encoding().GetBytes(password);
            var hashBytes = System.Security.Cryptography.MD5.Create().ComputeHash(bytes);
            return Convert.ToBase64String(hashBytes);
        }
    }
}
