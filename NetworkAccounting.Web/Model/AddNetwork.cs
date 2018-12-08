namespace NetworkAccounting.Web.Model
{
    public class AddNetwork
    {
        public string NetworkAddress { get; set; }
        public byte Size { get; set; } = 24;
        public int PoolId { get; set; }
    }
}