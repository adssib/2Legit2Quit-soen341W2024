import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import CartScreen from './screens/CartScreen';
import SearchScreen from './screens/SearchScreen';
import ReservationForm from './components/ReservationForm';
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'



import ReservationStart from './screens/ReservationStart';
import ReservationDetails from './screens/ReservationDetails';

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/product/:id' element={<ProductScreen/>} />
              <Route path='/start-reservation' element={<ReservationStart />} />
              <Route path='/reservation/:id' element={<ReservationDetails />} />
              <Route path='/login' element={<LoginScreen/>} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/Profile' component={ProfileScreen} />
              <Route path='/create-account' element={<CreateAccountScreen/>} />
              <Route path='/cart' element={<CartScreen/>} />
              <Route path='/search/:keyword' element={<SearchScreen/>} />
              <Route path="/reserve" component={ReservationForm} />
              
            </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
