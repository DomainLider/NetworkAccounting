namespace NetworkAccounting.Web.Model
{
    public class Network
    {
        public ulong NetworkAddress { get; set; }
        public byte Size { get; set; } = 24;
        public bool IsBusy { get; set; } = false;
        public string Description { get; set; }
        public string Address { get; set; }
        public int PoolId { get; set; }
    }
}