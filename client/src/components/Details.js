import React from "react";
import test from "../images/test_product.png"
import "./Details.css"
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { useNavigate } from "react-router";

function Details(productDetailItem){
    const plusMinuceButton ="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
    const navigate = useNavigate();

    const clickedBuy = (productDetailItem) => {
        console.log(productDetailItem);
        navigate('/shipping', { state: { productDetailItem } });
    }

    return(

        <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        {/* image gallery */}
        <div className="container mx-auto px-4">
          <img src={productDetailItem.img}></img>
  
          {/* /image gallery  */}
        </div>
        {/* description  */}
  
        <div className="mx-auto px-5 lg:px-5">
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">
            {productDetailItem.title}
          </h2>
          <p className="mt-4 text-4xl font-bold">
            ${productDetailItem.price}{" "}
            <span className="text-xs text-gray-400 line-through">
              $40
            </span>
          </p>
          <p className="pt-5 text-sm leading-5 text-gray-500">
            {productDetailItem.desc}
          </p>
          {/* <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Quantity</p>
            <div className="flex">
              <button className={`${plusMinuceButton}`}>−</button>
              <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                1
              </div>
              <button className={`${plusMinuceButton}`}> +</button>
            </div>
          </div> */}
          <br></br>
          <br></br>
          
          <div className="mt-7 flex flex-row items-center gap-6">
            <button className="add-to-cart flex h-12 w-1/3 items-center justify-center text-white duration-100 hover:bg-blue-800" style={{width:"fitContent"}} onClick={()=>{clickedBuy(productDetailItem)}}>
              <BiShoppingBag className="mx-2" />
              Buy
            </button>
          </div>
        </div>
      </section>
    );
}

export default Details;