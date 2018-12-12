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

        public Network AddNetwork(ulong address,int size,int poolId)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                db.ExecuteScalar("INSERT INTO network(NetworkAddress,Size,PoolId) VALUES (@NetworkAddress,@Size,@PoolId)", new
                {
                    NetworkAddress=address, Size=size, PoolId=poolId
                });
                return GetNetwork(address);
            }
        }

        public Network GetNetwork(ulong id)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                Network network=db.QuerySingleOrDefault<Network>($"SELECT * FROM network WHERE NetworkAddress={id}");
                return network;
            }
        }

        public IEnumerable<Network> GetNetworksBySize(int size,int poolId)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                return db.Query<Network>("SELECT * FROM network WHERE Size=@size and PoolId=@PoolId", new {size,poolId});                
            }
        }

        public void ReleaseNetwork(ulong id)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                db.ExecuteScalar("UPDATE network SET description=NULL,isBusy=0 WHERE NetworkAddress=@id", new {Id=id});                
            }   
        }
        
        public Network LeaseNetwork(Network network)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                db.ExecuteScalar("UPDATE network SET description=@Description,isBusy=1 WHERE NetworkAddress=@Id", new {Id=network.NetworkAddress,network.Description});
                return GetNetwork(network.NetworkAddress);
            }   
        }

        public void ChangeNetwork(Network network)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                db.ExecuteScalar("UPDATE network SET description=@Description,poolId=@PoolId,size=@Size WHERE NetworkAddress=@NetworkAddress", 
                    new {network.NetworkAddress,network.Description,network.PoolId,network.Size});                
            }
        }
        
    }
}