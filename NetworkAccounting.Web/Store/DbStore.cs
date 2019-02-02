using System.Data;
//using System.Data.SQLite;
using System.Data.SqlClient;

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
            return new SqlConnection(connectionString);
//            return new SQLiteConnection(connectionString);
        }
    }
}