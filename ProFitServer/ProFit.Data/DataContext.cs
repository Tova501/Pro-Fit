using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProFit.Core.Entities;

namespace ProFit.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasAnnotation("Relational:MaxIdentifierLength", 64); // MySQL-specific

            // הגדרת טבלת ההיסטוריה של המיגרציות
            modelBuilder.Entity<MigrationHistory>()
                .ToTable("__EFMigrationsHistory")
                .HasKey(m => m.MigrationId); // הגדרת מפתח ראשי
        }

        public class MigrationHistory
        {
            public string MigrationId { get; set; }
            public string ProductVersion { get; set; }
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<CV> CVs { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }


    }
}
