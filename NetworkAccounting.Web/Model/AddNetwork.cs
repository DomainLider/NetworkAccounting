namespace NetworkAccounting.Web.Model
{
    public class AddNetwork
    {
        public string Address { get; set; }
        public byte Size { get; set; } = 24;
        public int PoolId { get; set; }
    }
}