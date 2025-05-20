import { Card, IconButton, Typography } from '@mui/material';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  backgroundColor: string;
}

const ActionCard = ({ title, description, icon, onClick, backgroundColor }: ActionCardProps) => {
  return (
    <Card
      sx={{
        padding: '40px 30px',
        borderRadius: '8px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <IconButton
        onClick={onClick}
        sx={{
          backgroundColor,
          padding: '16px',
          borderRadius: '50%',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {icon}
      </IconButton>
      <Typography variant="h5" sx={{ marginTop: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          marginTop: 1,
        }}
      >
        {description}
      </Typography>
    </Card>
  );
};

export default ActionCard;