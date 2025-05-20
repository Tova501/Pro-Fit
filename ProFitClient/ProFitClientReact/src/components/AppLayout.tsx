import { Outlet } from 'react-router-dom';
import '../styles/AppLayout.css';
import Sidebar from './Sidebar';

const AppLayout = () => {
    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }} className="app-layout">
            <Sidebar />
            <div
                className="content"
                style={{
                    flexGrow: 1,
                    boxSizing: 'border-box',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;