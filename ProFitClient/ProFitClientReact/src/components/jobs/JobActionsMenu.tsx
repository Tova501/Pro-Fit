import { Box, IconButton, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

const JobActionsMenu = () => {
    const navigate = useNavigate();
    const jobs = useSelector((state: RootState) => state.job.jobs);

    const handleExportData = () => {
        if (!jobs || jobs.length === 0) {
            console.error('No jobs available to export.');
            return;
        }

        // Map jobs to CSV format
        const csvData = jobs.map((job) => ({
            ID: job.id,
            Title: job.title,
            Description: job.description,
            Status: job.isActive ? 'Active' : 'Inactive',
        }));

        // Convert to CSV
        const csv = unparse(csvData);

        // Save as file
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'jobs_export.csv');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 2,
                marginBottom: 3,
            }}
        >
            <Tooltip title="Add New Job" arrow>
                <IconButton
                    color="primary"
                    onClick={() => navigate('/recruiter/job/add')}
                >
                    <AddCircleOutlineIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="View Reports" arrow>
                <IconButton
                    color="primary"
                    onClick={() => navigate('/recruiter/job/reports')}
                >
                    <BarChartIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Filter Jobs" arrow>
                <IconButton
                    color="primary"
                    onClick={() => console.log('Filter Jobs')}
                >
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Export Data" arrow>
                <IconButton
                    color="primary"
                    onClick={handleExportData}
                >
                    <DownloadIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default JobActionsMenu;