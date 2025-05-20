// import { Container, Box, Card, Typography, Avatar } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import ProfitLogo from '../assets/proFitLogo.png';  // הלוגו של Profit
// import '../styles/Home.css';

// const Home: React.FC = () => {
//   const navigate = useNavigate();

//   const handleNavigate = (path: string): void => {
//     navigate(path);
//   };

//   return (
//     <Container sx={{ padding: 4, maxWidth: '1200px' }}>
//       {/* לוגו של Profit */}
//       <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
//         <Avatar
//           src={ProfitLogo}
//           alt="Profit Logo"
//           sx={{ width: '120px', height: '120px', margin: '0 auto', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)', borderRadius: 2 }}
//         />
//       </Box>

//       {/* כותרת ראשית */}
//       <Box
//         sx={{
//           textAlign: 'center',
//           marginBottom: 5,
//           background: 'linear-gradient(to right, #6fa8cb, #70ab9f)',
//           padding: '40px 30px',
//           borderRadius: 8,
//           boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography
//           className="home-title"
//           component="h1"
//           sx={{
//             fontSize: '3rem',
//             fontWeight: 700,
//             color: 'white',
//             marginBottom: 2,
//           }}
//         >
//           Empower Your Future
//         </Typography>
//         <Typography
//           className="home-subtitle"
//           component="p"
//           sx={{
//             fontSize: '1.25rem',
//             color: 'white',
//             maxWidth: '800px',
//             margin: '0 auto',
//             fontWeight: 400,
//           }}
//         >
//           A platform designed to connect top talent with leading organizations. Whether you're building your dream team or taking the next step in your career, we've got you covered.
//         </Typography>
//       </Box>

//       {/* כרטיסים למגייסים ומועמדים */}
//       <Box
//         sx={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
//           gap: 30,
//           paddingTop: 3,
//         }}
//       >
//         {/* כרטיס למגייסים */}
//         <Card
//           className="home-card recruiter-card"
//           onClick={() => handleNavigate('/recruiter')}
//           sx={{
//             cursor: 'pointer',
//             background: '#f4f6f8',
//             borderRadius: 8,
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//             padding: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between',
//             transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//             '&:hover': {
//               transform: 'scale(1.05)',
//               boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)',
//             },
//           }}
//         >
//           <WorkOutlineIcon className="home-card-icon" sx={{ fontSize: 40, color: '#284670' }} />
//           <Typography
//             className="home-card-title"
//             sx={{
//               fontSize: '1.75rem',
//               fontWeight: 600,
//               color: '#284670',
//               marginTop: 2,
//             }}
//           >
//             Build Your Dream Team
//           </Typography>
//           <Typography
//             className="home-card-text"
//             sx={{
//               color: '#444',
//               marginTop: 1,
//               fontWeight: 400,
//             }}
//           >
//             Discover top talent, streamline your hiring process, and achieve your recruitment goals effortlessly.
//           </Typography>
//         </Card>

//         {/* כרטיס למועמדים */}
//         <Card
//           className="home-card candidate-card"
//           onClick={() => handleNavigate('/candidate')}
//           sx={{
//             cursor: 'pointer',
//             background: '#f4f6f8',
//             borderRadius: 8,
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//             padding: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between',
//             transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//             '&:hover': {
//               transform: 'scale(1.05)',
//               boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)',
//             },
//           }}
//         >
//           <PersonOutlineIcon className="home-card-icon" sx={{ fontSize: 40, color: '#DFA021' }} />
//           <Typography
//             className="home-card-title"
//             sx={{
//               fontSize: '1.75rem',
//               fontWeight: 600,
//               color: '#284670',
//               marginTop: 2,
//             }}
//           >
//             Unlock Your Potential
//           </Typography>
//           <Typography
//             className="home-card-text"
//             sx={{
//               color: '#444',
//               marginTop: 1,
//               fontWeight: 400,
//             }}
//           >
//             Explore opportunities, showcase your skills, and take the next step in your professional journey.
//           </Typography>
//         </Card>
//       </Box>
//     </Container>
//   );
// };

// export default Home;
