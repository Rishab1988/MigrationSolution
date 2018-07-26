using System;

namespace MigrationDal
{
    class Program
    {
        static void Main(string[] args)
        {
        

            var container = DependencyContainer.CreateContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                UnitOfWork unitOfWork = new UnitOfWork(scope);
                var userRepository = unitOfWork.UserRepository();
                var user = userRepository.Get(1);
            }
        }
    }
}
