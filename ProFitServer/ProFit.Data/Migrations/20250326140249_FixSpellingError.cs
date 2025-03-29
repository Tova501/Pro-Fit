using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProFit.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixSpellingError : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Requirments",
                table: "Jobs",
                newName: "Requirements");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Requirements",
                table: "Jobs",
                newName: "Requirments");
        }
    }
}
