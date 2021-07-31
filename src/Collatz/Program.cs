using System;
using System.Collections.Immutable;

namespace Collatz
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }

        public static int Hotop(int v)
        {
            var (count, _) = HotopInternal(v, ImmutableList<int>.Empty);
            return count;
        }

        public static (int, ImmutableList<int>) HotopInternal(int v, ImmutableList<int> accume)
        {
            if (v == 1)
            {
                return (0, accume);
            }

            var (c, a) =  HotopInternal(Next(v), accume);
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
