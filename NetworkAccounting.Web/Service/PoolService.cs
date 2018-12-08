using System.Collections.Generic;
using NetworkAccounting.Web.Model;

namespace NetworkAccounting.Web.Service
{
    public class PoolService
    {
        private readonly PoolService _poolService=new PoolService();

        public IEnumerable<Pool> ListPools() => _poolService.ListPools();
        public void AddPool(Pool pool) => _poolService.AddPool(pool);
        public void RemovePool(int poolId) => _poolService.RemovePool(poolId);
    }
}