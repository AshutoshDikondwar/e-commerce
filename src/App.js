import React, { useEffect } from 'react';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import { commerce } from './lib/commerce';
import { useState } from 'react';
import Cart from './components/Cart/Cart';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from './components/CheckoutForm/Checkout/Checkout';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [mode, setMode] = useState('light')

    const handleMode = () => {
        if (mode === 'light') {
            setMode('dark')
            // document.body.style.backgroundColor='#212525'
            document.body.style.backgroundColor = '#15202B'
        }
        else {
            setMode('light')
            document.body.style.backgroundColor = 'white'

        }
    }



    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data)
    }
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item)
    }
    // document.body.style.backgroundColor='black'
    // const fetchCart = async () => {

    //     setCart(await commerce.cart.retrieve())
    // }
    // const handleAddToCart = async (productId, quantity) => {
    //     const item = await commerce.cart.add(productId, quantity);
    //     setCart(item);

    // }
    const handleUpdateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });
        setCart(response)
    }

    const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);
        setCart(response)
    }
    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
        setCart(response)
    }
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder)
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);

        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])
    console.log(cart)

    return (
        <>

            <BrowserRouter>
                <div>
                    <Navbar totalItems={cart.total_items} mode={mode} handleMode={handleMode} />
                    <Routes>
                        <Route exact path="/" element={<Products mode={mode} products={products} onAddToCart={handleAddToCart} />} />
                        <Route exact path="/cart" element={<Cart mode={mode} cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />} />
                        <Route exact path="/checkout" element={<Checkout mode={mode} cart={cart} order={order} handleEmptyCart={handleEmptyCart} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>

    )
}
export default App
{/* <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/about" element={<div>About Page</div>} />
        </Routes>
    </BrowserRouter>
</> */}