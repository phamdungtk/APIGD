using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FontEndAPI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        //public PartialViewResult Partial_Index()
        //{
        //    return PartialView("Partial_Index");
        //}
    }
}