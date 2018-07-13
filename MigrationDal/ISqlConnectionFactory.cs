using System.Data.SqlClient;

namespace MigrationDal
{
    public interface ISqlConnectionFactory
    {
        string GetConnection();
    }
}