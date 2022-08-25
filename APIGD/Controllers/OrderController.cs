using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FontEndAPI.Controllers
{
    public class OrderController : Controller
    {
        // GET: Order
        public ActionResult Order()
        {
            return View();
        }
        public ActionResult detailorder()
        {
            return View();
        }
        public ActionResult editorder()
        {
            return View();
        }
    }
}