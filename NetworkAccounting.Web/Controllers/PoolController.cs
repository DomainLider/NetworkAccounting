using System;
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
    public class PoolController : Controller
    {
        private PoolService _poolService;

        public PoolController()
        {
            this._poolService=new PoolService();
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_poolService.ListPools());
        }

        [HttpPost]
        public IActionResult Post([FromBody] Pool pool)
        {
            try
            {
                return new JsonResult(_poolService.AddPool(pool));
            }
            catch
            {
                return BadRequest();
            }
            

        }

        [HttpDelete("{poolId}")]
        public void Delete(int poolId)
        {
            try
            {
                _poolService.RemovePool(poolId);
            }
            catch
            {
                
            }
        }
    }
}