using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portnox.WebScanner.API.Extensions
{
    public static class CollectionExtensions
    {
        public static void AddRange<T>(this ConcurrentBag<T> @this, IEnumerable<T> toAdd)
        {
            toAdd.AsParallel().ForAll(t => @this.Add(t));
        }
    }
}