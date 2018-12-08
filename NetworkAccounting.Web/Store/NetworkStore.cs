using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using Dapper;
using NetworkAccounting.Web.Model;

namespace NetworkAccounting.Web.Store
{
    public class NetworkStore : DbStore
    {
        public IEnumerable<Network> ListNetworks()
        {
            using (var db = CreateConnection())
            {
                db.Open();
                var networks = db.Query<Network>("SELECT * FROM network");
                return networks;
            }
        }

        public void AddNetwork(long address,int size,int poolId)
        {
            //TODO: Check network is valid
            using (var db = CreateConnection())
            {
                db.Open();
                db.ExecuteScalar("INSERT INTO network(NetworkAddress,Size,PoolId) VALUES (@NetworkAddress,@Size,@PoolId)", new
                {
                    NetworkAddress=address, Size=size, PoolId=poolId
                });
            }
        }

        public Network FindNetwork(int size)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                Network network=db.QuerySingle<Network>("SELECT * FROM network WHERE Size=@size LIMIT 1", new {size});
                return network;
            }
        }

    }
}