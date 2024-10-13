import React from "react";
import Product from "../components/Product";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <>
      <main className="container py-4">
        <section className="row">
          <div className="col-lg-8">
           <Product/>
          </div>
          <div className="col-md-4 ">
           <Cart/>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
