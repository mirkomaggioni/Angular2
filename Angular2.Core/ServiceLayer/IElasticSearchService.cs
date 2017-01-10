using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nest;

namespace Angular2.Core.ServiceLayer
{
    interface IElasticSearchService<T> where T : class
    {
        ICreateIndexResponse CreateIndex();
        IBulkResponse BulkInsert();
        IEnumerable<T> Search(string query);
    }
}
