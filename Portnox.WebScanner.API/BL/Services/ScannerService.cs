using Portnox.WebScanner.API.Extensions;
using Portnox.WebScanner.API.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace Portnox.WebScanner.API.BL.Services
{
    public class ScannerService
    {
        public ScannerService()
        {

        }

        public async Task<List<WebScannerResult>> WebScan(string url, int maxThreads, string text, int maxPages)
        {
            ConcurrentBag<WebScannerResult> result = new ConcurrentBag<WebScannerResult>();
            try
            {
                if (maxPages <= 0)
                {
                    return result.ToList();
                }

                string pageContent = await readWebPage(url);
                int entrances = Regex.Matches(pageContent, text).Count;
                result.Add(new WebScannerResult
                {
                    Page = url,
                    Entrances = entrances
                });

                var links = getLinks(pageContent);


                Parallel.ForEach(links, async (link) =>
                {
                    try
                    {
                        var scannerResults = await WebScan(link.Href, maxThreads, text, --maxPages);
                        lock (result)
                        {
                            result.AddRange(scannerResults);
                        }
                    }
                    catch (Exception ex)
                    {
                        result.Add(new WebScannerResult
                        {
                            Page = url,
                            Entrances = 0,
                            Error = true,
                            errorMessage = ex.Message
                        });
                        return;
                    }
                });
                return result.ToList();
            }
            catch (Exception ex)
            {
                result.Add(new WebScannerResult
                {
                    Page = url,
                    Entrances = 0,
                    Error = true,
                    errorMessage = ex.Message
                });
                return result.ToList();
            }
        }

        public async Task<List<WebScannerResult>> ScrapSite(string url, int maxThreads, string text, int maxPages)
        {
            ConcurrentBag<WebScannerResult> result = new ConcurrentBag<WebScannerResult>();
            SemaphoreSlim semaphoreSlim = new SemaphoreSlim(1, 1);

            string pageContent = await readWebPage(url);
            int entrances = Regex.Matches(pageContent, text).Count;
            var links = getLinks(pageContent);

            if (maxPages <= 0)
            {
                return result.ToList();
            }
            foreach (var link in links)
            {
                await semaphoreSlim.WaitAsync();
                try
                {
                    --maxPages;
                    result.AddRange(await ScrapSite(link.Href, maxThreads, text, maxPages));

                }
                catch (Exception ex)
                {
                    result.Add(new WebScannerResult()
                    {
                        Page = url,
                        Entrances = 0,
                        Error = true,
                        errorMessage = ex.Message
                    });
                }
                finally
                {
                    semaphoreSlim.Release();
                }
            }
            result.Add(new WebScannerResult()
            {
                Page = url,
                Entrances = entrances
            });
            return result.ToList();

        }

        private async Task<string> readWebPage(string url)
        {
            using (var client = new HttpClient())
            {
                return await client.GetStringAsync(url);
            }
        }

        private List<LinkItem> getLinks(string file)
        {
            List<LinkItem> list = new List<LinkItem>();

            MatchCollection matchs = Regex.Matches(file, @"(<a.*?>.*?</a>)",
                RegexOptions.Singleline);

            foreach (Match match in matchs)
            {
                string value = match.Groups[1].Value;
                LinkItem item = new LinkItem();

                Match m2 = Regex.Match(value, @"href=\""(.*?)\""",
                    RegexOptions.Singleline);
                if (m2.Success)
                {
                    item.Href = m2.Groups[1].Value;
                }

                string text = Regex.Replace(value, @"\s*<.*?>\s*", "",
                    RegexOptions.Singleline);
                item.Text = text;

                list.Add(item);
            }
            return list;
        }
    }
}