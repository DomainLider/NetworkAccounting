using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NetworkAccounting.Web.Model;
using NetworkAccounting.Web.Store;

namespace NetworkAccounting.Web.Service
{
    public class NetworkService
    {
        private NetworkStore _networkStore = new NetworkStore();

        public NetworkService()
        {

        }

        /// <summary>
        /// Добавить сеть в пул
        /// </summary>
        /// <param name="network"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public Network AddToPool(AddNetwork network)
        {
            IPAddress ipNetwork;
            if (IPAddress.TryParse(network.NetworkAddress, out ipNetwork))
            {

                var bytes = ipNetwork.GetAddressBytes().Reverse().ToArray();
                long address = BitConverter.ToUInt32(bytes, 0);
                _networkStore.AddNetwork(address, network.Size,network.PoolId);
                return null;
            }

            throw new ArgumentException($"Невозможно преобразовать {network.NetworkAddress} в IP адрес");
        }

        /// <summary>
        /// Удалить сеть из пула
        /// </summary>
        public void RemoveFromPool(int poolId)
        {
            
        }

        /// <summary>
        /// Арендовать сеть
        /// </summary>
        /// <param name="network"></param>
        public void LeaseNetwork(Network network)
        {
            
        }

        /// <summary>
        /// Найти свободную сеть
        /// </summary>
        /// <param name="size"></param>
        /// <returns></returns>
        public Network GetFreeNetwork(byte size) => null;
        public Network GetNetwork(ulong id) => null;
        public Network GetParentNetwork(ulong ip) => null;

        
        public IEnumerable<Network> ListNetworks() => _networkStore.ListNetworks();
        public Network FindNetwork(int size) => _networkStore.FindNetwork(size);

    }
}