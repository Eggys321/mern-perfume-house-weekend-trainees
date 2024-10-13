import React,{useContext} from "react";
import products from "../product.json";
import CartContext from "../context/CartContext";

const Cart = () => {
  const {cart, removeItem, calcTotalPrice,handleIncreaseQuantity,handleDecreaseQuantity} = useContext(CartContext)
  return (
    <>
      <main className="cart-container d-flex flex-column justify-content-center gap-2">
        <h2>My Cart Preview</h2>
        <div>
          {cart.length === 0 && (
            <div>
              <h3 className="fs-2 fst-italic fw-bolder text-danger">
                No item(s) in the cart
              </h3>
              <p className="fw-bolder text-success fs-4">Keep shopping...</p>
            </div>
          )}
        </div>
        {cart.map((cartItem) => {
                    if (!cartItem) return null;

          const { id, title, price, button, image } = cartItem;
          return (
            <div
              className="cart-details d-flex gap-5 gap-lg-3 align-items-center cart py-0 my-0"
              key={id}
            >
              <div className="cart-1">
                <img className="cart-img" src={image} alt="product image" />
              </div>
              <div className="cart-2 d-flex flex-column m-0 p-0">
                <h4 className="cart-title">{title}</h4>
                <div className="d-flex gap-2 align-items-center">
                  <button className="subtract-cart" onClick={()=>handleDecreaseQuantity(id)}>-</button>
                  <p className="pt-3 cart-number">{cartItem.quantity} </p>
                  <button className="add-cart text-center" onClick={()=>handleIncreaseQuantity(id)}>+</button>
                </div>
                <div className="d-flex justify-content-between m-0">
                  <p className="cart-price">N{price}</p>
                  <button
                    className="remove-cart"
                    onClick={() => removeItem(id)}
                  >
                    {" "}
                    remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {cart.length > 0 && (
          <>
            <div className="checkout-container">
              <div className="checkout">
                <p className="checkout-title">Sub Total</p>
                <p className="checkout-price">18,000</p>
              </div>
              <div className="checkout">
                <p className="checkout-title">Delivery</p>
                <p className="checkout-price">8,000</p>
              </div>
              <div className="checkout">
                <p className="checkout-title">Total</p>
                <p className="checkout-price">
                  {" "}
                  #{calcTotalPrice.toLocaleString()}{" "}
                </p>
              </div>
            </div>
          </>
        )}

        {/* <ConfirmOrder show={modalShow} onHide={() => setModalShow(false)} /> */}
      </main>
      {/* <main>
    <h1>cart</h1>
    {cart?.length}
    <div>
   {cart.map((carx)=>{
    return(
      <div key={carx?.id}>
       <h1> {carx?.title}</h1>
       <p> {carx?.price} </p>
       <img src={carx?.image} alt="" />
       <button onClick={()=>removeItem(carx?.id)}>remove</button>
       <div>
            <button onClick={() => incQty(carx?.id)}>inc</button>
            <button>dec</button>
          </div>
          <h1> {totalPrice} </h1>
          <p>Quantity: {carx?.quantity || 0}</p>
      </div>
    )
   })}
    </div>


    </main> */}
    </>
  );
};

export default Cart;
