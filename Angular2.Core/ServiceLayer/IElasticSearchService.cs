using System.Collections.Generic;

namespace Angular2.Core.ServiceLayer
{
    internal interface IElasticSearchService<T> where T : class
    {
        void Init();
        void CheckIndex();
        void BulkInsert(List<T> objects);
        IEnumerable<T> Search(string query);
    }
}
