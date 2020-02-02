using Portnox.WebScanner.API.Models;
using System;
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

        public async Task<List<WebScannerResult>> webSacn(string url, int maxThreads, string text, int pages)
        {
            SemaphoreSlim semaphoreSlim = new SemaphoreSlim(1, 1);
            List<WebScannerResult> result = new List<WebScannerResult>();
            try
            {
                string pageContent = await readWebPage(url);
                int entrances = Regex.Matches(pageContent, text).Count;
                result.Add(new WebScannerResult
                {
                    Page = url,
                    Entrances = entrances
                });
                var links = getLinks(pageContent);

                if (pages == 0)
                {
                    return result;
                }
                foreach (var link in links)
                {
                    try
                    {
                        await semaphoreSlim.WaitAsync();
                        try
                        {
                            --pages;
                            result.AddRange(await webSacn(link.Href, maxThreads, text, pages));
                        }
                        finally
                        {
                            semaphoreSlim.Release();
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
                        continue;
                    }
                }
                return result;
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
                return result;
            }
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