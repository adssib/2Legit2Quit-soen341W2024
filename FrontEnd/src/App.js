import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import ReservationListScreen from './screens/ReservationListScreen'; 



import BranchProducts from './components/BranchProducts';

import ReservationForm from './components/ReservationForm';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';



import ReservationDetails from './screens/ReservationDetails';
import ReservationStart from './screens/ReservationStart';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
              <Route path='/admin/reservationlist' element={<ReservationListScreen />} />
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/product/:id' element={<ProductScreen/>} />
              <Route path='/start-reservation' element={<ReservationStart />} />
              <Route path='/reservation/:id' element={<ReservationDetails />} />
              
              <Route path='/login' element={<LoginScreen/>} />
              <Route path='/register' element={<RegisterScreen/>} />
              <Route path='/profile' element={<ProfileScreen />} />
              
              <Route path='/cart' element={<CartScreen/>} />
              <Route path='/search/:keyword' element={<SearchScreen/>} />
              <Route path="/reserve" element={<ReservationForm />} />

              <Route path="/admin/userlist" element={<UserListScreen />} />
              <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
              
              <Route path='/admin/productlist' element={<ProductListScreen/>} />
              
              <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>} />   

              <Route path="/branch/:branchId" element={<BranchProducts />} />


            </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
