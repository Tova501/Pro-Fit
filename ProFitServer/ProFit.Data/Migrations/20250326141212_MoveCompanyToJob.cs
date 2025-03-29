using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProFit.Data.Migrations
{
    /// <inheritdoc />
    public partial class MoveCompanyToJob : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Company",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Company",
                table: "Jobs",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Company",
                table: "Jobs");

            migrationBuilder.AddColumn<string>(
                name: "Company",
                table: "Users",
                type: "text",
                nullable: true);
        }
    }
}
