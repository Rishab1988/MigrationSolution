using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Migration.RewardProgram.Nominee
{
    public interface ICiRepository<T> where T : class
    {
        T Get(string id);
        void Add();
    }
}
