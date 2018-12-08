using System.Collections.Generic;
using Dapper;
using NetworkAccounting.Web.Model;

namespace NetworkAccounting.Web.Store
{
    public class PoolStore:DbStore
    {
        public PoolStore()
        {
            
        }

        public IEnumerable<Pool> ListPools()
        {
            using (var db = CreateConnection())
            {
                db.Open();
                return db.Query<Pool>("SELECT * FROM pool");
            }
        }

        public void AddPool(Pool pool)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                db.ExecuteScalar("INSERT INTO pool(Name,Description) VALUES (@Name,@Description);", new
                {
                    Name = pool.Name,
                    Description = pool.Description
                });
            }
        }

        public void RemovePool(int poolId)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                db.ExecuteScalar("DELETE FROM pool WHERE Id=@PoolId;", new
                {
                    PoolId=poolId
                });
            }
        }
    }
}