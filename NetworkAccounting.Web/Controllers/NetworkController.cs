﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetworkAccounting.Web.Model;
using NetworkAccounting.Web.Service;

namespace NetworkAccounting.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NetworkController : Controller
    {
        private NetworkService _networkService;

        public NetworkController(NetworkService networkService)
        {
            this._networkService=networkService;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_networkService.ListNetworks());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(uint id)
        {
            return new JsonResult(_networkService.GetNetwork(id));
        }

        [HttpPut]
        public void Modify(Network network)
        {
            _networkService.ChangeNetwork(network);
        }
        
        [HttpGet("find/{size}/{poolId}")]
        public IActionResult FindNetwork(int size,int poolId)
        {
            return new JsonResult(_networkService.GetFreeNetwork(size,poolId));
        }

        [HttpPost("lease/")]
        public void LeaseNetwork([FromBody] Network network)
        {
            _networkService.LeaseNetwork(network);
        }

        [HttpPost("release/{id}")]
        public void ReleaseNetwork(ulong id)
        {
            _networkService.ReleaseNetwork(id);
        }
        
        [HttpPost] 
        public void Post([FromBody] AddNetwork network)
        {
            _networkService.AddToPool(network);            
        }
    }
}