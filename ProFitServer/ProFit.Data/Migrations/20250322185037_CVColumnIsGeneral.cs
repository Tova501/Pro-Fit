using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProFit.Data.Migrations
{
    /// <inheritdoc />
    public partial class CVColumnIsGeneral : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsGeneral",
                table: "CVs",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsGeneral",
                table: "CVs");
        }
    }
}
