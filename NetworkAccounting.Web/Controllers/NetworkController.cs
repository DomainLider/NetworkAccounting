using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetworkAccounting.Web.Model;
using NetworkAccounting.Web.Service;
using Serilog;

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
        public IActionResult GetById(int id)
        {
            return new JsonResult(_networkService.GetNetwork(id));
        }

        [HttpPut]
        public void Modify(Network network)
        {
            _networkService.ChangeNetwork(network);
        }
        
        [HttpPost("find/")]
        public IActionResult FindNetwork([FromBody] FindNetwork model)
        {
            Log.Information("Request free network {@request}",model);
            var network = new JsonResult(_networkService.GetFreeNetwork(model.Size, model.PoolId, model.FromId));
            Log.Information("Response free network {@network}",network);
            return network;
        }

        [HttpPost("lease/")]
        public IActionResult LeaseNetwork([FromBody] Network network)
        {
            return new JsonResult(_networkService.LeaseNetwork(network));
        }

        [HttpPost("release/{id}")]
        public void ReleaseNetwork(ulong id)
        {
            _networkService.ReleaseNetwork(id);
        }
        
        [HttpPost] 
        public IActionResult Post([FromBody] AddNetwork network)
        {
            try
            {
                return Json(_networkService.AddToPool(network));
            }
            catch (Exception exc)
            {
                return BadRequest(exc.Message);
            }
                        
        }
                
    }
}