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

        public Pool Get(int id)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                return db.QuerySingle<Pool>("SELECT * FROM pool WHERE Id=@Id", new {Id = id});
            }
        }

        public Pool AddPool(Pool pool)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                int id=db.ExecuteScalar<int>("INSERT INTO pool(Name,Description) VALUES (@Name,@Description);SELECT @@IDENTITY;", new
                {
                    pool.Name,
                    pool.Description
                });
                return Get(id);
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