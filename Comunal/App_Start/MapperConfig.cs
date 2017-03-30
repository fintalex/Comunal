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
            Mapper.Initialize(cfg => {

                cfg.CreateMap<Counter, CounterDTO>();

                cfg.CreateMap<User, CurrentUserDTO>()
                    .ForMember(x => x.Flat, c => c.MapFrom(o => o.Flats.FirstOrDefault()));

                cfg.CreateMap<Flat, FlatDTO>();

            });

            //Mapper.Initialize(cfg => cfg.CreateMap<User, CurrentUserDTO>());
            ////.ForMember(x=>x.FirstName, c=>c.MapFrom(o=>o.Flats.FirstOrDefault())));

            //Mapper.Initialize(cfg => cfg.CreateMap<Flat, FlatDTO>());
        }
    }
}