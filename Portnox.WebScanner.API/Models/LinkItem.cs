using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portnox.WebScanner.API.Models
{
    public class LinkItem
    {
        public string Href;
        public string Text;

        public override string ToString()
        {
            return Href + "\n\t" + Text;
        }
    }
}