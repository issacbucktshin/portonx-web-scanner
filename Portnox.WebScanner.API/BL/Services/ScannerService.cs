using Portnox.WebScanner.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace Portnox.WebScanner.API.BL.Services
{
    public class ScannerService
    {
        public ScannerService()
        {

        }

        public async Task<List<WebScannerResult>> webSacn(string url, int threads, string text, int pages)
        {
            string pageContent = await readWebPage(url);
            int entrances = Regex.Matches(pageContent, text).Count;
            var links = getLinks(pageContent);


            return new List<WebScannerResult>(){
                new WebScannerResult{
                    Page = url,
                    Entrances = entrances}
            };
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