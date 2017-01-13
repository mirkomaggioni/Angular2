using System.Collections.Generic;

namespace Angular2.Core.ServiceLayer
{
    internal interface IElasticSearchService<T> where T : class
    {
        void CheckIndex();
        void BulkInsert(List<T> objects);
    }
}
