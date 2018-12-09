using System.Collections.Generic;
using System.Linq;
using NetworkAccounting.Web.Model;
using NetworkAccounting.Web.Store;

namespace NetworkAccounting.Web.Service
{
    public class PoolService
    {
        private readonly PoolStore _poolStore=new PoolStore();

        public PoolService(PoolStore poolStore)
        {
            this._poolStore = poolStore;
        }
        /// <summary>
        /// Выбрать все пулы
        /// </summary>
        /// <returns></returns>
        public Dictionary<int,Pool> ListPools()
        {
            IEnumerable<Pool> pools = _poolStore.ListPools();
            var groupedPools = pools.GroupBy(p=>p.Id)
                .ToDictionary(grouping => grouping.Key,grouping => grouping.FirstOrDefault());
            return groupedPools;
        }

        /// <summary>
        /// Добавить пул
        /// </summary>
        /// <param name="pool"></param>
        public Pool AddPool(Pool pool) => _poolStore.AddPool(pool);
        
        /// <summary>
        /// Удалить пул
        /// </summary>
        /// <param name="poolId"></param>
        public void RemovePool(int poolId) => _poolStore.RemovePool(poolId);
    }
}