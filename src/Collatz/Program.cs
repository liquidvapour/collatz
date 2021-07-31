using System;
using System.Collections.Generic;
using System.Collections.Immutable;

namespace Collatz
{
    public class Program
    {
        static void Main(string[] args)
        {
            foreach (var i in System.Linq.Enumerable.Range(1, 100)) 
            {
                var (c, a) = HotpoInternal(i);
                Console.WriteLine($"{i} has {c} steps");
                Console.WriteLine(ShowPath(a.Reverse()));
            }
        }

        private static string ShowPath(IEnumerable<int> a) => string.Join(" -> ", a);

        public static int Hotpo(int v)
        {
            var (count, ac) = HotpoInternal(v);
            return count;
        }

        public static (int, ImmutableList<int>) HotpoInternal(int v)
        {
            if (v == 1)
            {
                return (0, ImmutableList<int>.Empty.Add(1));
            }

            var (c, a) =  HotpoInternal(Next(v));
            return (c+1, a.Add(v));
        }

        private static int Next(int v)
        {
            if (v % 2 == 0)
            {
                v = v / 2;
            }
            else
            {
                v = (3 * v) + 1;
            }

            return v;
        }
    }
}
