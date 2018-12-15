using System;
using System.Collections.Generic;
using Xunit;
using Moq;
using NetworkAccounting.Web.Model;
using NetworkAccounting.Web.Service;
using NetworkAccounting.Web.Store;

namespace NetworkAccounting.Test
{
    public class NetworkServiceTest
    {
        [Fact]
        public void GetFreeNetwork()
        {
            List<Network> networks = new List<Network>
            {
                new Network
                {
                    Id = 1, Address = "192.168.10.0", Description = "LAN10", NetworkAddress = 3232238080, Status = 0,
                    Parent = 1, PoolId = 1, Size = 24
                },
                new Network
                {
                    Id = 38, Address = "192.168.11.0", Description = "LAN11", NetworkAddress = 3232267008, Status = 0,
                    Parent = 1, PoolId = 1, Size = 24
                },
            };
            Mock<NetworkStore> mockStore=new Mock<NetworkStore>();
            mockStore.Setup(store => store.ListNetworks(null)).Returns(networks);
            mockStore.Setup(store => store.GetNetwork(It.IsAny<int>())).Returns<int>(id =>
                {
                    return null;
                });
            mockStore.Setup(store => store.AddNetwork(It.IsAny<ulong>(),It.IsAny<int>(),It.IsAny<int>(),It.IsAny<int?>()))
                .Returns<ulong,int,int,int?>((na, size, poolId,parent) =>
                {
                    return new Network
                    {
                        NetworkAddress = na, Size = (byte)size, PoolId = poolId, Parent = parent
                    };
                });
            NetworkService service=new NetworkService(mockStore.Object);
            service.GetFreeNetwork(25, 1);
//            parent.Status = NetworkStatus.Parent;
            mockStore.Verify(store=>store.ChangeNetwork(It.Is<Network>(n =>n.Status == NetworkStatus.Parent )));
            
        }
    }
}