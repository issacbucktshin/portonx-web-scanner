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
        public async Task<List<WebScannerResult>> ScrapSite(string url, int maxThreads, string text, int maxPages)
        {
            ConcurrentBag<WebScannerResult> results = new ConcurrentBag<WebScannerResult>();
            SemaphoreSlim semaphoreSlim = new SemaphoreSlim(1, 1);

            // Get page content
            string pageContent = await readWebPage(url);
           
            // Search for entrances
            int entrances = Regex.Matches(pageContent, text).Count;

            // Extract links (Distinct)
            var links = getLinks(pageContent).Distinct();

            results.Add(new WebScannerResult()
            {
                Page = url,
                Entrances = entrances
            });

            // Scrap sub pages
            foreach (var link in links)
            {
                // Lock to prevent from mutual access to maxPages variable
                await semaphoreSlim.WaitAsync();
                try
                {
                    --maxPages;
                    if (maxPages <= 0)
                    {
                        return results.ToList();
                    }
                    // Double Scanning Prevention
                    if (results.ToList().Select(r => r.Page).Contains(link.Href))
                    {
                        continue;
                    }
                    // Read (recursive) sub-pages
                    else
                    {
                        results.AddRange(await ScrapSite(link.Href, maxThreads, text, maxPages));
                    }
                }
                catch (Exception ex)
                {
                    results.Add(new WebScannerResult()
                    {
                        Page = link.Href,
                        Entrances = 0,
                        Error = true,
                        errorMessage = ex.Message
                    });
                }
                finally
                {
                    // Release the critical section
                    semaphoreSlim.Release();
                }
            }
            return results.ToList();
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