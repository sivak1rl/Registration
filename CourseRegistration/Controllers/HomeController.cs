using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CourseRegistration.Models;

namespace CourseRegistration.Controllers
{
    public class HomeController : Controller
    {
        CourseRegistrationEntities dbContext = new CourseRegistrationEntities();
        #region Student
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetCourses()
        {
            var courses = from course in dbContext.Courses
                          select new
                          {
                              Id = course.Id,
                              CourseId = course.CourseId,
                              Title = course.Title,
                              Credits = course.Credits,
                              Capacity = course.Capacity,
                              Description = course.Description,
                              RegisteredCount = course.Students.ToList().Count()
                          };
            return Json(courses, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Login(int studentId)
        {
            try
            {
                var thisStudent = (from student in dbContext.Students
                                   select new
                                   {
                                       Id = student.Id,
                                       StudentId = student.StudentId,
                                       FirstName = student.FirstName,
                                       LastName = student.LastName,
                                       Courses = from course in student.Courses.ToList()
                                                 select new
                                                 {
                                                     Id = course.Id,
                                                     CourseId = course.CourseId,
                                                     Title = course.Title,
                                                     Credits = course.Credits,
                                                     Capacity = course.Capacity,
                                                     Description = course.Description
                                                 }
                                   }).First(m => m.StudentId == studentId);
                return Json(thisStudent, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                Response.StatusCode = 418;
                Response.StatusDescription = "I'm a teapot";
                return Json(new { Error = "That doesn't look like a valid User ID" }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Register(int courseId, int studentId)
        {
            try
            {
                var stud = dbContext.Students.First(m => m.Id == studentId);
                var crs = dbContext.Courses.First(m => m.Id == courseId);
                if (crs.Capacity - crs.Students.Count() > 0)
                {
                    stud.Courses.Add(crs);
                    dbContext.SaveChanges();
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    Response.StatusCode = 418;
                    Response.StatusDescription = "I'm a teapot!";
                    return Json(new { Errors = "Unfortunately, the course is full!" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception)
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Drop(int courseId, int studentId)
        {
            try
            {
                var stud = dbContext.Students.First(m => m.Id == studentId);
                var crs = dbContext.Courses.First(m => m.Id == courseId);
                stud.Courses.Remove(crs);
                dbContext.SaveChanges();
                return Json(new { RegisteredCount = crs.Students.ToList().Count(), Capacity = crs.Capacity, CourseId = crs.CourseId, Credits = crs.Credits, Description = crs.Description, Id = crs.Id, Title = crs.Title }
                            , JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { Errors = "The course wasn't successfully dropped, refresh to try again." }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Admin
        public ActionResult Admin()
        {
            return View();
        }

        #endregion
        public new void Dispose()
        {
            dbContext.Dispose();
            // Dispose of unmanaged resources.
            Dispose(true);
            // Suppress finalization.
            GC.SuppressFinalize(this);
        }
    }
}