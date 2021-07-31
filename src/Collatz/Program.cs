using System;
using System.Collections.Generic;
using System.Collections.Immutable;

namespace Collatz
{
    public class Program
    {
        static void Main(string[] args)
        {
            var max = 0;
            foreach (var i in System.Linq.Enumerable.Range(1, 10000)) 
            {
                var (steps, path) = HotpoAcc(i);
                Console.WriteLine($"{i} has {steps} steps");
                Console.WriteLine(ShowPath(path));
                max = Math.Max(max, steps);
            }
            Console.WriteLine($"Max steps: {max}");
        }

        private static string ShowPath(IEnumerable<int> a) => string.Join(" -> ", a);

        public static int Hotpo(int v)
        {
            var (count, _) = HotpoInternal(v, 0, ImmutableList<int>.Empty);
            return count;
        }

        public static (int, ImmutableList<int>) HotpoAcc(int v)
        {
            return HotpoInternal(v, 0, ImmutableList<int>.Empty.Add(v));
        }

        public static (int, ImmutableList<int>) HotpoInternal(int v, int count, ImmutableList<int> accume)
        {
            if (v == 1)
            {
                return (count, accume);
            }

            int next = Next(v);
            return HotpoInternal(next, count+1, accume.Add(next));
        }

        private static int Next(int n) => 
            (n % 2 == 0)
                ? n / 2
                : (3 * n) + 1;

    }
}
