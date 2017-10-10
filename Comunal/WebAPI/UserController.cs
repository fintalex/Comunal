using Data;
using DTO;
using Services.Interfaces;
using System;
using System.Web.Http;

namespace Comunal.WebAPI
{
	[Authorize]
	[RoutePrefix("api/Users")]
	public class UsersController : ApiController
	{
		private readonly IUserService userService;

		public UsersController(IUserService userService)
		{
			this.userService = userService;
		}

		[HttpGet]
		public UserDTO Get(int id)
		{
			return this.userService.GetById(id);
		}

		[HttpPost]
		[AllowAnonymous]
		public UserDTO AddUser([FromBody]NewUserDTO newUser)
		{
			var user = this.userService.GetByEmail(newUser.Email);

			if (user != null)
				throw new Exception("Пользователь с таким email'ом уже существует");

			return this.userService.AddUser(newUser);
		}

		[HttpPut]
		public void UpdateUser(NewUserDTO user)
		{
			this.userService.UpdateUser(user);
		}

		[HttpDelete]
		public void DeleteUser(int id)
		{
			this.userService.DeleteUser(id);
		}

		[HttpPost]
		[AllowAnonymous]
		[Route("checkEmail")]
		public BoolDTO IsEmailAlreadyExist(User createdUser)
		{
			var user = this.userService.GetByEmail(createdUser.Email);

			return new BoolDTO() { Result = user != null };
		}
	}
}