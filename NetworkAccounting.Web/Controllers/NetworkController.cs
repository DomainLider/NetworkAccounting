using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetworkAccounting.Web.Model;

namespace NetworkAccounting.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NetworkController : Controller
    {
        private NetworkService _networkService;

        public NetworkController()
        {
            this._networkService=new NetworkService();
        }
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_networkService.ListNetworks());
        }

        [HttpGet("find/{size}")]
        public IActionResult FindNetwork(int size)
        {
            return new JsonResult(_networkService.FindNetwork(size));
        }
//        // GET api/values/5
//        [HttpGet("{id}")]
//        public ActionResult<string> Get(int id)
//        {
//            return "value";
//        }
//
        // POST api/values
        [HttpPost]
        public void Post([FromBody] AddNetwork network)
        {
            try
            {
                _networkService.AddToPool(network);
            }
            catch
            {
                // ignored
//                return BadRequest();
            }

//            return Ok();
        }
//
//        // PUT api/values/5
//        [HttpPut("{id}")]
//        public void Put(int id, [FromBody] string value)
//        {
//        }
//
//        // DELETE api/values/5
//        [HttpDelete("{id}")]
//        public void Delete(int id)
//        {
//        }
    }
}