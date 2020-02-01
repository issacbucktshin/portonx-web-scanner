using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace Portnox.WebScanner.API.Extensions
{
    public static class HttpExceptionExtensions
    {
        /// <summary>
        /// Represent writing any kind of exception to response message
        /// </summary>
        /// <param name="exception"></param>
        public static HttpResponseMessage HandleException(this Exception exception, HttpStatusCode statusCode = HttpStatusCode.InternalServerError, int errorCode = 0)
        {
            if (exception == null)
            {
                //Logger.Log.Error("ArgumentNullException - exception is NULL");
                throw new ArgumentNullException(nameof(exception));
            }
            //Logger.Log.Error(exception, exception.ToString());
            return new HttpResponseMessage
            {
                Content = new StringContent(exception.Message.ToString()),
                StatusCode = statusCode,
            };
        }
    }
}