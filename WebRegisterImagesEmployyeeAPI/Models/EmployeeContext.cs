using Microsoft.EntityFrameworkCore;

namespace WebRegisterImagesEmployyeeAPI.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
        {
        }
        public DbSet<EmployeeModel> Employees { get; set; }
    }

}
