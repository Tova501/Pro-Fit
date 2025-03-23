import { Provider } from 'react-redux';
import store from './redux/store';
import { router } from './components/Router';
import { RouterProvider } from 'react-router-dom';

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}

export default App;
