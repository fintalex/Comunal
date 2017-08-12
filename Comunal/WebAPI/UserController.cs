using Data;
using DTO;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;

namespace Comunal.WebAPI
{
    [RoutePrefix("api/Users")]
    public class UsersController : ApiController
    {
        private readonly IUserService userService;
        
        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public IQueryable<User> GetUsers()
        {
            return this.userService.GetUsers();
        }

        [HttpGet]
        public User Get(int id)
        {
            return this.userService.GetById(id);
        }

        [HttpPost]
        public User AddUser([FromBody]User newUser)
        {
            return this.userService.AddUser(newUser);
        }

        [HttpPut]
        public void UpdateUser(User user)
        {
            this.userService.UpdateUser(user);
        }

        [HttpDelete]
        public void DeleteUser(int id)
        {
            this.userService.DeleteUser(id);
        }

        [HttpPost]
        [Route("checkEmail")]
        public BoolDTO IsEmailAlreadyExist(User createdUser)
        {
            var user = this.userService.GetByEmail(createdUser.Email);

            return new BoolDTO() { Result = user != null };
        }
    }
}