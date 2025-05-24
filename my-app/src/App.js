import './App.css';
import Calculator from './components/Calculator';
import Todo from './components/Todo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoApi from './components/TodoApi';
import NewProduct from './components/NewProduct';
import Products from './components/Products';
import { CartProvider } from './Cart/CartContext';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/todo" element={<Todo/>}></Route>
        <Route path="/cal" element={<Calculator/>}></Route>
        <Route path="/todoapi" element={<TodoApi/>}></Route>
        <Route path="/productlist" element={<Products/>}></Route>
        <Route path="/product" element={<NewProduct/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
      </Routes>
     </CartProvider>
    </BrowserRouter>
  )
}

export default App;
