﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using DTO;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;

namespace Comunal.WebAPI
{
    public class CounterController : ApiController
    {
        private readonly ICounterService counterService;

        public CounterController(ICounterService counterService)
        {
            this.counterService = counterService;
        }

        [HttpGet]
        public IQueryable<CounterDTO> GetCounters()
        {
            var countersList = this.counterService.GetCounters().ProjectTo<CounterDTO>();
            return countersList;
        }

        [HttpGet]
        public Counter Get(int id)
        {
            return this.counterService.GetById(id);
        }

        [HttpPost]
        public Counter AddCounter([FromBody]Counter newCounter)
        {
            return this.counterService.AddCounter(newCounter);
        }

        [HttpPost]
        public void UpdateCounter(Counter counter)
        {
            this.counterService.UpdateCounter(counter);
        }

        [HttpDelete]
        public void DeleteCounter(int id)
        {
            this.counterService.DeleteCounter(id);
        }
    }
}