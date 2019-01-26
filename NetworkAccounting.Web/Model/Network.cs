namespace NetworkAccounting.Web.Model
{
    public enum NetworkStatus
    {
        Free=0,
        Busy=1,
        Parent=2
    }

    public class Network
    {
        public int Id { get; set; }
        public ulong NetworkAddress { get; set; }
        public byte Size { get; set; } = 24;
        public NetworkStatus Status { get; set; } = NetworkStatus.Free;
        public string Description { get; set; }
        public string Address { get; set; }
        public int PoolId { get; set; }
        public int? Parent { get; set; } = null;
    }
}