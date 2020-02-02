using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portnox.WebScanner.API.Models
{
    public class WebScannerResult
    {
        public string Page { get; set; }
        public int Entrances { get; set; }
        public bool Error { get; set; }
        public string errorMessage { get; set; }
    }
}