using NUnit.Framework;
using FluentAssertions;

namespace Collatz.Tests
{
    public class CollatzTests
    {

        [TestCase(1, 0)]
        [TestCase(5, 5)]
        [TestCase(6, 8)]
        [TestCase(23, 15)]
        public void XWillReturnsY(int x, int y)
        {
            Program.Hotpo(x).Should().Be(y);
        }
    }
}