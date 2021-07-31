using NUnit.Framework;
using FluentAssertions;

namespace Collatz.Tests
{
    public class CollatzTests
    {
        [SetUp]
        public void Setup()
        {
            
        }

        [Test]
        public void OneWillReturnOne()
        {
            Program.Hotop(1).Should().Be(0);
        }

        [Test]
        public void FiveWillReturnFive()
        {
            Program.Hotop(5).Should().Be(5);
        }
    }
}