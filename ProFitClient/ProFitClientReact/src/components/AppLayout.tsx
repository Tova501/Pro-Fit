import { Outlet } from 'react-router-dom';
import '../styles/AppLayout.css';
import Sidebar from './Sidebar';
import { useState } from 'react';

const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = (isOpen: boolean) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }} className="app-layout">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />

            {/* Main Content */}
            <div
                className="content"
                style={{
                    flexGrow: 1,
                    boxSizing: 'border-box',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: isSidebarOpen ? 240 : 60, 
                    transition: 'margin-left 0.3s ease',
                }}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;