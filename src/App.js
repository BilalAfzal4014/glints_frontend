import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NotFound from "./pages/not-found";
import Dashboard from "./pages/dashboard";
import {AppContext} from './context'
import useTokenReducer from "./reducer/token";
import Collection from "./pages/dashboard/collection";
import Restaurant from "./pages/dashboard/restaurant";
import SaveCollection from "./pages/dashboard/collection/save-collection";


function App() {
    const [token, dispatchToken] = useTokenReducer();
    return (
        <AppContext.Provider value={{
            token,
            dispatchToken
        }}>
            <div className="app">
                <Routes>
                    <Route path={'/'} element={
                        <NonProtectedRoute token={token}>
                            <Login/>
                        </NonProtectedRoute>
                    }/>
                    <Route path={'/sign-up'} element={
                        <NonProtectedRoute token={token}>
                            <Signup/>
                        </NonProtectedRoute>
                    }/>
                    <Route path={'/dashboard'} element={
                        <ProtectedRoute token={token}>
                            <Dashboard/>
                        </ProtectedRoute>
                    }>
                        <Route path={'collections'} element={<Collection/>}/>
                        <Route path={'save-collections'}>
                            <Route index element={<SaveCollection/>}/>
                            <Route path={":id"} element={<SaveCollection/>}/>
                        </Route>
                        <Route path={'restaurants'} element={<Restaurant/>}/>
                    </Route>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

const NonProtectedRoute = ({token, children}) => {
    if (token) {
        return <Navigate to="/dashboard" replace/>;
    }
    return children;
}

const ProtectedRoute = ({token, children}) => {
    if (!token) {
        return <Navigate to="/" replace/>;
    }
    return children;
}

export default App;
