using Data;
using System.Linq;

namespace Services.Interfaces
{
    public interface IUserService
    {
        /// <summary>
        /// Create a new user
        /// </summary>
        /// <param name="user">User for creating</param>
        void CreateUser(User user);

        /// <summary>
        /// Get User by id
        /// </summary>
        /// <param name="id">Id of user</param>
        /// <returns>User</returns>
        User GetById(int id);

        /// <summary>
        /// Get All Users (then it will be by UserId)
        /// </summary>
        /// <returns></returns>
        IQueryable<User> GetUsers();

        /// <summary>
        /// Delete User by id
        /// </summary>
        /// <param name="id">User id</param>
        void DeleteUser(int id);

        /// <summary>
        /// Add User
        /// </summary>
        /// <param name="user">user</param>
        User AddUser(User user);

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="user">User</param>
        void UpdateUser(User user);
    }
}