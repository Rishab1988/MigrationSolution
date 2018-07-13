using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using Autofac;
using Newtonsoft.Json;

namespace MigrationDal
{
    interface IRepository
    {
    }




    public enum DbState
    {
        Modified,
        Deleted
    }

    public interface IUser
    {
        int? Id { get; set; }
        string Name { get; set; }
        string PEmail { get; set; }
        string CEmail { get; set; }
        bool? IsActive { get; set; }
    }

    public class User : IUser
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string PEmail { get; set; }
        public string CEmail { get; set; }
        public bool? IsActive { get; set; }
    }


    public class DependencyContainer
    {
        public static IContainer CreateContainer()
        {
            ContainerBuilder containerBuilder = new ContainerBuilder();
            containerBuilder.Register((c, p) => new UserRepository(p.Named<string>("connectionString"))).As<IUserRepository>();
            var container = containerBuilder.Build();
            return container;
        }
    }


    public class UnitOfWork
    {
        private readonly IComponentContext _componentContext;

        public UnitOfWork(IComponentContext componentContext)
        {
            _componentContext = componentContext;
        }

        public static string GetConnection()
        {
            var connectionBuilder = new SqlConnectionStringBuilder
            {
                DataSource = @".\sqlexpress",
                InitialCatalog = "MigrationSolution",
                IntegratedSecurity = true
            };
            return connectionBuilder.ToString();
        }

        public IUserRepository UserRepository()
        {
            var userRepository =
                _componentContext.Resolve<IUserRepository>(new NamedParameter("connectionString", GetConnection()));
            return userRepository;
        }
    }

    public class UserRepository : IUserRepository
    {
        private readonly string _connectionString;
        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IUser Get(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var command = new SqlCommand()
                {
                    CommandText = "GET_USER_INFO",
                    CommandType = CommandType.StoredProcedure,
                    Connection = connection
                };
                command.Parameters.AddWithValue("@ID", id);
                connection.Open();
                var dataReader = command.ExecuteReader();

                if (dataReader.HasRows)
                {
                    dataReader.NextResult();
                    
                    var user = new User
                    {
                        Id = dataReader.GetInt32(0),
                        Name = dataReader.GetString(1),
                        CEmail = dataReader.GetString(2),
                        PEmail = dataReader.GetString(3),
                        IsActive = dataReader.GetBoolean(4)

                    };
                    dataReader.Close();
                    return user;
                }


            }
            return null;
        }
    }

}
