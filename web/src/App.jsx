import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceorderPage from './pages/PlaceorderPage'
import OrderPage from './pages/OrderPage'
import UserListPage from './pages/UserListPage'
import UserEditPage from './pages/UserEditPage'
import ProductListPage from './pages/ProductListPage'
import ProductEditPage from './pages/ProductEditPage'
import OrderListPage from './pages/OrderListPage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/placeorder" component={PlaceorderPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/products/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/admin/userlist" component={UserListPage} />
          <Route path="/admin/user/edit/:id" component={UserEditPage} />
          <Route path="/admin/productlist" component={ProductListPage} exact />
          <Route path="/admin/productlist/:pageNumber" component={ProductListPage} />
          <Route path="/admin/product/edit/:id" component={ProductEditPage} />
          <Route path="/admin/orderlist" component={OrderListPage} exact />
          <Route path="/page/:pageNumber" component={HomePage} exact />
          <Route path="/search/:keyword" component={HomePage} exact />
          <Route path="/search/:keyword/page/:pageNumber" component={HomePage} exact />
          <Route path="/" component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
