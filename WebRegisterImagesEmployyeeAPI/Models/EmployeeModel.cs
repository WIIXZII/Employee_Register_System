using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace WebRegisterImagesEmployyeeAPI.Models
{
    public class EmployeeModel
    {
        [Key]
        public int EmployeeId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string EmployeeName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Occupation { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string ImageName { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }


        [NotMapped]
        public string ImageSrc { get; set; }

    }
}
