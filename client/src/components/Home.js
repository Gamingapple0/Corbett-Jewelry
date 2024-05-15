import { useEffect, useState } from "react";
import test from "../images/test_product.png"
import Card from "./Card";
import Details from "./Details";
import "./Home.css"

function Home(){
    const [productData, setProductData] = useState([]);
    const [viewDetails, setViewDetails] = useState(false);
    const [chosenProductIndex, setChosenProductIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          if (productData.length < 1){
            var response = await fetch('https://us-central1-corbett-jewelry.cloudfunctions.net/products/api'); 
            // var response = {}
            const res = await response.json();
            setProductData(res);
            console.log(res);
          }
            }
            
        fetchData();
      }, []);
      
      const clickedCard = (id)=>{
        console.log(id);
        setChosenProductIndex(id);
        setViewDetails(true);
      }

      const handleBack = ()=>{
        setViewDetails(!viewDetails)
      }

      const DetailedCard = (product)=>{
        if (product){
            return (
                <div>
                    <Details title={product.title} desc={product.desc} img={product.img} price={product.price} />
                </div>
            )
        }
        return (<></>)
        
      }

    
      const ProductCards = (products) => {
        return(
            <div className="product-cards" style={{display:'flex'}}>
            {Object.keys(products).map(key => (
              <Card onClick= {() => {clickedCard(key)}} key={key} text={products[key].title} img={products[key].img} />
            ))}
          </div>
        )
      }
      


    return (
        
        <div>
        {viewDetails && <button onClick={()=>{handleBack()}} className="back-button">Back</button>}
        {viewDetails ? DetailedCard(productData[chosenProductIndex]) : ProductCards(productData)}
      </div>
    )
        
}

export default Home;