import Index from './frontend/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontEndRoute from './route/FrontEndRoute';
import { UserProvider } from './frontend/context/UserContext';
import { Provider } from 'react-redux';
import store from './redux/Store';
import { ToastContainer } from 'react-toastify';
import IndexAdmin from './backend/Index';
import BackEndRoute from './route/BackEndRoute';
import "react-toastify/dist/ReactToastify.css";
import Login from './backend/pages/Login';
import { Protector } from './helpers';

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <ToastContainer />
            <Routes>
              {/* frontend */}
              <Route path='/' element={<Index/>}>
                {
                  FrontEndRoute.map((route,index) => {
                    const Page = route.component
                    if(index === 0){
                      return <Route key={index} index element={<Page/>} />
                    }
                    else{
                      return <Route key={index} path={route.path} element={<Page/>} />
                    }
                  })
                }
              </Route>
              {/* backend */}
              <Route path='/admin' element={<Protector Component={IndexAdmin} />}>
                {
                  BackEndRoute.map((route,index) => {
                    const Page = route.component
                    if(index === 0){
                      return <Route key={index} index element={<Page/>} />
                    }
                    else{
                      return <Route key={index} path={route.path} element={<Page/>} />
                    }
                  })
                }
              </Route>
              {/* login admin */}
              <Route path='/admin/login' element={<Login/>}></Route>
            </Routes>
        </BrowserRouter>
      </UserProvider>
    </Provider>
  );
}

export default App;
