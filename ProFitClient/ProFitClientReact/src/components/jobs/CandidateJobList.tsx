import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Card, CardContent, Typography, Box, Button, Grid, Tooltip, IconButton, TextField, Divider } from '@mui/material';
import { fetchJobs } from '../../redux/slices/jobSlice';
import ApplyingToJobDialog from './ApplyingToJobDialog';
import { useNavigate } from 'react-router';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import SearchIcon from '@mui/icons-material/Search';
import TimelineIcon from '@mui/icons-material/Timeline';

const CandidateJobList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterExperience, setFilterExperience] = useState<number | ''>('');
  const jobs = useSelector((state: RootState) => state.job.jobs);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleApply = (jobId: number) => {
    setSelectedJobId(jobId);
    setOpenModal(true);
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation ? job.location.toLowerCase().includes(filterLocation.toLowerCase()) : true;
    const matchesCompany = filterCompany ? job.company.toLowerCase().includes(filterCompany.toLowerCase()) : true;
    const matchesExperience = filterExperience !== '' ? job.yearsOfExperienceRequired <= filterExperience : true;
    return matchesSearch && matchesLocation && matchesCompany && matchesExperience;
  });

  return (
    <Box sx={{ padding: 4 }}>
      <Typography color='primary.main' variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Available Jobs
      </Typography>

      {/* Filters Section */}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        {/* Search Bar */}
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            placeholder="Search jobs by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ marginRight: 1, color:'primary.main' }} />,
            }}
            fullWidth
          />
        </Grid>

        {/* Location Filter */}
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            placeholder="Location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            InputProps={{
              startAdornment: <LocationOnIcon sx={{ marginRight: 1, color:'primary.main' }} />,
            }}
            fullWidth
          />
        </Grid>

        {/* Company Filter */}
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            placeholder="Company"
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            InputProps={{
              startAdornment: <BusinessIcon sx={{ marginRight: 1, color:'primary.main' }} />,
            }}
            fullWidth
          />
        </Grid>

        {/* Years of Experience Filter */}
        <Grid item xs={12} sm={2}>
          <TextField
            variant="outlined"
            placeholder="Years of experience"
            type="number"
            value={filterExperience}
            onChange={(e) => setFilterExperience(e.target.value === '' ? '' : parseInt(e.target.value))}
            InputProps={{
              startAdornment: <TimelineIcon sx={{ marginRight: 1, color:'primary.main' }} />,
            }}
            fullWidth
          />
        </Grid>
      </Grid>

      <Divider sx={{ marginBottom: 3 }} />

      {/* Job Cards */}
      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card sx={{ boxShadow: 4, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
              {/* Save and Share Icons */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Tooltip title="Save Job">
                  <IconButton size="small">
                    <BookmarkBorderIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share Job">
                  <IconButton size="small">
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <CardContent>
                {/* Job Title */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 ,color:'primary.main'}}>
                  {job.title}
                </Typography>

                {/* Company and Location */}
                <Box display="flex" alignItems="center" gap={2} sx={{ marginBottom: 2 }}>
                  <Typography variant="body2" color="textSecondary" display="flex" alignItems="center" gap={1}>
                    <BusinessIcon fontSize="small" /> {job.company}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon fontSize="small" /> 
                    {job.location}
                  </Typography>
                </Box>

                {/* Years of Experience */}
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                  {job.yearsOfExperienceRequired} years of experience required
                </Typography>

                {/* Job Description */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                    overflow: 'hidden',
                    marginBottom: 2,
                  }}
                >
                  {job.description}
                </Typography>
              </CardContent>

              {/* Actions */}
              <Box display="flex" justifyContent="space-between" p={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleApply(job.id)}
                  sx={{ textTransform: 'none', fontSize: '0.9rem' }}
                >
                  Apply
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(`${job.id}`)}
                  sx={{ textTransform: 'none', fontSize: '0.9rem' }}
                >
                  Read More
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Apply Dialog */}
      <ApplyingToJobDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        jobId={selectedJobId || 0}
      />
    </Box>
  );
};

export default CandidateJobList;
