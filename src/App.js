import logo from './logo.svg';
import './App.css';
import ListWatches from './features/watch/ListWatches';
import Basket from './features/order/basket/Basket';
import MyNavBar from './features/MyNavBar';
import SighIn from './features/user/SighIn';
import Login from './features/user/Login';
import HomePage from './features/watch/HomePage';
import { Routes, Route } from "react-router-dom"
import WatchDetails from './features/watch/WatchDetails';
import Order from './features/order/Order';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userIn } from './features/user/userSlice';
import { pushToBasket } from './features/order/basket/basketSlice';

import FormWatch from './features/watch/FormWatch';
import ToEditWatch from './features/watch/ToEditWatch';
import { ProtectedRoute } from './features/user/ProtectedRoute'
import Error from './features/Error';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Helmet from 'react-helmet';

// יצירת ערכת צבעים מותאמת אישית
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(64, 65, 65)', // צבע ראשי שחור
    },
    secondary: {
      main: '#cb1021', // צבע משני אדום
    },
  },
});

function App() {
  let currentUser1 = useSelector((state) => state.user.currentUser);
  let dispatch = useDispatch();
  useEffect(() => {
    let user = localStorage.getItem("currentUser");
    let basket = localStorage.getItem("currentBasket");

    if (user) {
      dispatch(userIn(JSON.parse(user)))
    }
    if (basket) {
      dispatch(pushToBasket(JSON.parse(basket)))
    }

  }, [])
  return (<>
    <Helmet>
      <title>MICHELE</title>

    </Helmet>

    <MyNavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/watches" element={<ThemeProvider theme={theme}><ListWatches /></ThemeProvider>}>

        <Route path=":_id" element={<WatchDetails />} />
      </Route>
      <Route path="/HomePage" element={<HomePage />} />

      <Route path="/basket" element={<Basket />} />

      <Route path="/login" element={<ThemeProvider theme={theme}><Login /> </ThemeProvider>} />

      <Route path="/sighIn" element={<ThemeProvider theme={theme}> <SighIn /></ThemeProvider>} />
      <Route path="/checkout" element={<ThemeProvider theme={theme}> <Order /></ThemeProvider>} />

      <Route path="/addWatch" element={<ProtectedRoute user={currentUser1}>
        <ThemeProvider theme={theme}> <FormWatch /> </ThemeProvider>
      </ProtectedRoute>
      } />


      <Route path="/editWatch" element={<ProtectedRoute user={currentUser1}>
        <ThemeProvider theme={theme}><ToEditWatch /></ThemeProvider>
      </ProtectedRoute>
      } />

      <Route path="/error" element={<Error />} />
      <Route path="/checkout" element={<Order />} />

    </Routes>
  </>
  );
}

export default App;
