using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProFit.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSizePropertyTOCV : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Size",
                table: "CVs",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Size",
                table: "CVs");
        }
    }
}
