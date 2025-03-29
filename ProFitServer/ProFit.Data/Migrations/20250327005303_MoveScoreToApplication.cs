using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProFit.Data.Migrations
{
    /// <inheritdoc />
    public partial class MoveScoreToApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Score",
                table: "CVs");

            migrationBuilder.AddColumn<string>(
                name: "ContentType",
                table: "CVs",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "Applications",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentType",
                table: "CVs");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "Applications");

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "CVs",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
