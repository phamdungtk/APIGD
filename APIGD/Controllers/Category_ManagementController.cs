using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FontEndAPI.Controllers
{
    public class Category_ManagementController : Controller
    {
        // GET: Category_Management
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddCategory()
        {
            return View();
        }
        public ActionResult EditCate()
        {
            return View();
        }
    }
}