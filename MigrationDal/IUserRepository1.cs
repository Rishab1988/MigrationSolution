namespace MigrationDal
{
    public interface IUserRepository
    {
        IUser Get(int id);
    }
}