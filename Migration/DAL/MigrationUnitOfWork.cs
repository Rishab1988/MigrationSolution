using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Dapper.FluentMap.Mapping;
using Microsoft.Extensions.Options;

namespace Migration.DAL
{
    public class DbConString
    {
        public string MigrationDb { get; set; }
    }

    public class MigrationUnitOfWork
    {

    }

    public class UserInfoMap : EntityMap<UserInfo>
    {
        public UserInfoMap()
        {
            Map(x => x.CompanyEmail).ToColumn("CEMAIL");
        }
    }

    public class UserInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PersonalEmail { get; set; }
        public string CompanyEmail { get; set; }
    }



    public class UserRepository
    {
        private readonly string _dbConString;
        public UserRepository(IOptions<DbConString> dbConString)
        {
            _dbConString = dbConString.Value.MigrationDb;
        }

        public IDbConnection GetDbConnection => new SqlConnection(_dbConString);

        public void GetUsers()
        {
            using (var con = GetDbConnection)
            {
                con.Open();
               var data = con.Query<UserInfo>("SELECT * FROM USERINFO");
               var e1 =  con.QueryFirstOrDefault<UserInfo>(new CommandDefinition("GetUserInfo", new {ID = 1},
                    commandType: CommandType.StoredProcedure));
                var e2 = con.Query("select * from userinfo").Select(x => new UserInfo{ Id = x.ID, Name = x.NAME, CompanyEmail = x.CEMAIL, PersonalEmail = x.PEMAIL});
            }
        }
    }

}
