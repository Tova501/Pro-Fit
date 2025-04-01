import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/AppLayout.css'; 

const AppLayout = () => {
    return (
        <div style={{"width":"100vw"}} className="app-layout">
            <Navbar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default AppLayout;
