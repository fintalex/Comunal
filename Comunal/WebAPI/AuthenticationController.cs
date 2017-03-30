﻿using Data;
using System;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;
using DTO;
using AutoMapper;

namespace Comunal.WebAPI
{
    [RoutePrefix("api/Auth")]
    public class AuthenticationController : ApiController
    {
        private readonly IUserService userService;
        
        public AuthenticationController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public CurrentUserDTO Login([FromBody]LoginDTO user)
        {
            var logingUser = this.userService.GetUserByLogin(user.Email, user.Password);

            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password) || logingUser == null)
            {
                throw new Exception();
            }

            // here we must create COOKIE

            var curUserDTO = Mapper.Map<CurrentUserDTO>(logingUser);

            return curUserDTO;
        }
    }
}