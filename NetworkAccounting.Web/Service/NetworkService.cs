using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices.WindowsRuntime;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NetworkAccounting.Web.Model;
using NetworkAccounting.Web.Store;

namespace NetworkAccounting.Web.Service
{
    public class NetworkService
    {
        private NetworkStore _networkStore = new NetworkStore();

        public NetworkService(NetworkStore networkStore)
        {
            this._networkStore = networkStore;
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
            if (IPAddress.TryParse(network.Address, out ipNetwork))
            {

                var bytes = ipNetwork.GetAddressBytes().Reverse().ToArray();
                ulong address = BitConverter.ToUInt32(bytes, 0);
                return _networkStore.AddNetwork(address, network.Size,network.PoolId);
            }

            throw new ArgumentException($"Невозможно преобразовать {network.Address} в IP адрес");
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
            _networkStore.LeaseNetwork(network);
        }

        /// <summary>
        /// Освободить сеть
        /// </summary>
        /// <param name="id"></param>
        public void ReleaseNetwork(ulong id) => _networkStore.ReleaseNetwork(id);
        
        /// <summary>
        /// Найти свободную сеть
        /// </summary>
        /// <param name="size"></param>
        /// <param name="poolId"></param>
        /// <returns></returns>
        public Network GetFreeNetwork(int size,int poolId)
        {
            var networks = _networkStore.ListNetworks().Where(n=>!n.IsBusy&&n.Size<=size&&n.PoolId==poolId).OrderByDescending(n=>n.Size).ToArray();
            if (networks.Length > 0)
            {
                var network = networks.First();
                    //splitting                    
                    for (int idx = 0; idx < size - network.Size; idx++)
                    {
                        //transaction required
                        network.Size = (byte)(network.Size + 1);
                        _networkStore.ChangeNetwork(network);
                        _networkStore.AddNetwork(network.NetworkAddress + (ulong)Math.Pow(2,32-network.Size), network.Size, poolId);
                        network = _networkStore.GetNetwork(network.NetworkAddress);
                    }
                    return network;                
            }
            //Not found
            return null;
        }

        /// <summary>
        /// Change network
        /// </summary>
        /// <param name="network"></param>
        public void ChangeNetwork(Network network)
        {
            _networkStore.ChangeNetwork(network);
        }
        
        /// <summary>
        /// Сеть по Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Network GetNetwork(ulong id)
        {
            var network=_networkStore.GetNetwork(id);
            return FillUserAddress(network);
        }

        public Network GetParentNetwork(ulong ip) => null;


        /// <summary>
        /// Список сетей
        /// </summary>
        /// <returns></returns>
        public Dictionary<ulong,Network> ListNetworks()
        {
            var networks = _networkStore.ListNetworks();
            networks.ToList().ForEach(n=>n.Address=ConvertAddressToString(n.NetworkAddress));
            var groupedNetworks = networks.GroupBy(n=>n.NetworkAddress).ToDictionary(n=>n.Key,n=>n.ToList().First());
            
            return groupedNetworks;
        }
                
        /// <summary>
        /// Конвертировать IPAddress в строку
        /// </summary>
        /// <param name="naddress"></param>
        /// <returns></returns>
        public static string ConvertAddressToString(ulong naddress)
        {
            var bytes = BitConverter.GetBytes(naddress).Take(4).Reverse();
            IPAddress address=new IPAddress(bytes.ToArray());
            return address.ToString();
        }

        public static Network FillUserAddress(Network network)
        {
            network.Address = ConvertAddressToString(network.NetworkAddress);
            return network;
        }

    }
}