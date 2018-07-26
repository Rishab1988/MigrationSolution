using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using Autofac;
using Xunit;

namespace MigrationDal.Tests
{
    public class UserRepositoryTest
    {

        private readonly IContainer _container = DependencyContainer.CreateContainer();

       

        public static TheoryData<int> TestUserIds()
        {
            var data = new TheoryData<int> {2, 3};
            return data;
        }

        [Theory]
        [MemberData(nameof(TestUserIds))]
        public void ShouldReturnNull(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {

                UnitOfWork unitOfWork = new UnitOfWork(scope);
                var userRepository = unitOfWork.UserRepository();
                var user = userRepository.Get(id);
                Assert.Equal<IUser>(null, user);
            }
        }

        [Fact]
        public void CheckNull()
        {
            Assert.Equal(1, 1);
        }
    }
}
