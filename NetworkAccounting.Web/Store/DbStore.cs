using System.Data;
using System.Data.SQLite;

namespace NetworkAccounting.Web.Store
{
    public class DbStore
    {
        private string connectionString = "Data Source=networks.db";

        public DbStore()
        {
            
        }
        
        protected IDbConnection CreateConnection()
        {
            return new SQLiteConnection(connectionString);
        }
    }
}