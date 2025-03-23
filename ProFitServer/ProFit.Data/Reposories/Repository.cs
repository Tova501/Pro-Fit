using Microsoft.EntityFrameworkCore;
using ProFit.Core.IRepositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProFit.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly DataContext _context;
        protected readonly DbSet<T> _dbSet;

        public Repository(DataContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }

        public async void DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<List<T>> GetAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async virtual Task<T> UpdateAsync(int id, T entity)
        {
            return _dbSet.Update(entity).Entity;
        }
    }
}