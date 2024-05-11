import { useEffect, useState } from "react";
import test from "../images/test_product.png"
import Card from "./Card";
import Details from "./Details";

function Home(){
    const [productData, setProductData] = useState([]);
    const [viewDetails, setViewDetails] = useState(false);
    const [chosenProductIndex, setChosenProductIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            var response = await fetch('http://localhost:8080/api/products'); 
            const res = await response.json();
            setProductData(res);
            console.log(res);
            }
            
        fetchData();
      }, []);
      
      const clickedCard = (id)=>{
        console.log(id);
        setChosenProductIndex(id);
        setViewDetails(true);
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
        {viewDetails ? DetailedCard(productData[chosenProductIndex]) : ProductCards(productData)}
      </div>
    )
        
}

export default Home;