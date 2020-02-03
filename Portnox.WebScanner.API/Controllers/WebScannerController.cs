using Portnox.WebScanner.API.BL.Services;
using Portnox.WebScanner.API.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Portnox.WebScanner.API.Controllers
{
    public class WebScannerController : ApiController
    {
        [Route("api/scanner/web")]
        public async Task<HttpResponseMessage> GetWebScanResult([FromUri]string url = null, [FromUri]int threads = 1, [FromUri]string text = null, [FromUri]int pages = 10)
        {
            ScannerService scannerService = new ScannerService();

            try
            {
                if (string.IsNullOrEmpty(url))
                {
                    throw new ArgumentNullException(nameof(url));
                }

                if (string.IsNullOrEmpty(text))
                {
                    throw new ArgumentNullException(nameof(text));
                }
                if (pages > 100)
                {
                    throw new ArgumentNullException(nameof(pages));
                }
                var result = await Task.Run(() => scannerService.ScrapSite(url, threads, text, pages));
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (ArgumentNullException ex)
            {
                return ex.HandleException(HttpStatusCode.BadRequest);
            }
            catch (Exception ex)
            {
                return ex.HandleException(HttpStatusCode.InternalServerError);
            }
        }

    }
}
