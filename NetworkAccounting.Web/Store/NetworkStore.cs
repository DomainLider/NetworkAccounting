using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using Dapper;
using NetworkAccounting.Web.Model;

namespace NetworkAccounting.Web.Store
{
    public class NetworkStore : DbStore
    {
        public virtual IEnumerable<Network> ListNetworks(List<NetworkStatus> statuses=null)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                var networks = statuses == null
                    ? db.Query<Network>("SELECT * FROM network")
                    : db.Query<Network>("SELECT * FROM network WHERE status in @statuses",new
                    {
                        statuses
                    });
                return networks;
            }
        }       
        
        public virtual Network AddNetwork(ulong address,int size,int poolId,int? parent=null)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                int id=db.ExecuteScalar<int>("INSERT INTO network(NetworkAddress,Size,PoolId,Parent,Status) VALUES (@NetworkAddress,@Size,@PoolId,@Parent,0);SELECT @@IDENTITY;", new
                {
                    NetworkAddress=address, Size=size, PoolId=poolId,Parent=parent
                });
                return GetNetwork(id);
            }
        }

        public virtual Network GetNetwork(int id)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                Network network=db.QuerySingleOrDefault<Network>($"SELECT * FROM network WHERE id={id}");
                return network;
            }
        }

        public void ReleaseNetwork(ulong id)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                db.ExecuteScalar("UPDATE network SET description=NULL,Status=0 WHERE Id=@id", new {Id=id});                
            }   
        }
        
        public Network LeaseNetwork(Network network)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                db.ExecuteScalar("UPDATE network SET description=@Description,Status=1 WHERE id=@Id", new {Id=network.Id,network.Description});
                return GetNetwork(network.Id);
            }   
        }

        public virtual void ChangeNetwork(Network network)
        {
            using (var db = CreateConnection())
            {
                db.Open();
                db.ExecuteScalar("UPDATE network SET description=@Description,poolId=@PoolId,size=@Size,status=@Status,parent=@Parent WHERE Id=@Id", 
                    new {network.Id,network.Description,network.PoolId,network.Size,network.Status,network.Parent});                
            }
        }
        
    }
}