using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebRegisterImagesEmployyeeAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebRegisterImagesEmployyeeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public EmployeeController(EmployeeContext context,IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        // GET: api/employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeModel>>> GetEmployees()
        {
            return await _context.Employees
                .Select(x => new EmployeeModel()
                {
                    EmployeeId = x.EmployeeId,
                    EmployeeName = x.EmployeeName,
                    Occupation = x.Occupation,
                    ImageName = x.ImageName,
                    ImageSrc = String.Format("{0}://{1}{2}/Images/{3}",Request.Scheme,Request.Host,Request.PathBase,x.ImageName)
                })
                .ToListAsync();

        }

        // GET: api/employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeModel>> GetEmployees(int id)
        {
            var Employees = await _context.Employees.FindAsync(id);
            if (Employees == null)
                return NotFound();
            return Employees;
        }

        // POST: api/employee
        [HttpPost]
        public async Task<ActionResult<EmployeeModel>> PostEmployees([FromForm]EmployeeModel Employees)
        {
            Employees.ImageName = await SaveImage(Employees.ImageFile);
            _context.Employees.Add(Employees);
            await _context.SaveChangesAsync();
            return StatusCode(201);
        }

        // PUT: api/employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployees(int id, [FromForm]EmployeeModel Employees)
        {
            if (id != Employees.EmployeeId)
            {
                return BadRequest();

            }
            if (Employees.ImageFile != null)
            {
                DeleteImage(Employees.ImageName);
                Employees.ImageName = await SaveImage(Employees.ImageFile);
            }

            _context.Entry(Employees).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

               return NoContent();
        }

        private bool EmployeeModelExists(int id)
        {
            throw new NotImplementedException();
        }

        // DELETE: api/employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployees(int id)
        {
            var Employees = await _context.Employees.FindAsync(id);
            if (Employees == null)
                return NotFound();

            DeleteImage(Employees.ImageName);

            _context.Employees.Remove(Employees);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using(var fileStream = new FileStream(imagePath, FileMode.Create))
            {
               await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
