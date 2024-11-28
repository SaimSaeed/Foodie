import "bootstrap/dist/js/bootstrap.bundle"
import './App.scss';
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/Register";
import Shipping from "./pages/Shipping";
import PrivateRoutes from "./components/PrivateRoutes";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import OrderDetail from "./pages/OrderDetail";

function App() {
  return (
<>
<ToastContainer/>
<BrowserRouter>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/products/:id" element={<ProductDetail/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

<Route element={<PrivateRoutes/>}>
<Route path="/shipping" element={<Shipping/>}/>
<Route path="/payment" element={<Payment/>}/>
<Route path="/placeorder" element={<PlaceOrder/>}/>
<Route path="/order/:id" element={<OrderDetail/>}/>



</Route>



</Routes>
</BrowserRouter>

</>
  );
}

export default App;
