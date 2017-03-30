using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Data;
using DTO;

namespace Comunal
{
    public static class MapperConfig
    {
        public static void Initialize()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Counter, CounterDTO>());
            Mapper.Initialize(cfg => cfg.CreateMap<User, UserDTO>());
        }
    }
}