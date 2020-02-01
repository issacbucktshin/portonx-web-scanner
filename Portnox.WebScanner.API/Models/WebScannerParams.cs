using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portnox.WebScanner.API.Models
{
    public class WebScannerParams
    {
        public string Url { get; set; }
        public int Threads { get; set; }
        public string Text { get; set; }
        public int Pages { get; set; }
    }
}