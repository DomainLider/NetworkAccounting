using System.Collections.Generic;
using System.Linq;
using NetworkAccounting.Web.Model;
using NetworkAccounting.Web.Store;

namespace NetworkAccounting.Web.Service
{
    public class PoolService
    {
        private readonly PoolStore _poolService=new PoolStore();

        /// <summary>
        /// Выбрать все пулы
        /// </summary>
        /// <returns></returns>
        public Dictionary<int,Pool> ListPools()
        {
            IEnumerable<Pool> pools = _poolService.ListPools();
            var groupedPools = pools.GroupBy(p=>p.Id)
                .ToDictionary(grouping => grouping.Key,grouping => grouping.FirstOrDefault());
            return groupedPools;
        }

        /// <summary>
        /// Добавить пул
        /// </summary>
        /// <param name="pool"></param>
        public Pool AddPool(Pool pool) => _poolService.AddPool(pool);
        
        /// <summary>
        /// Удалить пул
        /// </summary>
        /// <param name="poolId"></param>
        public void RemovePool(int poolId) => _poolService.RemovePool(poolId);
    }
}