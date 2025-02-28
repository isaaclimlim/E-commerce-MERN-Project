import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from "../../data/products.json"
import ProductCard from '../shop/ProductCard';

const CategoryPage = () => {
    // Destructure categoryName from useParams() and ensure the name matches the route parameter
    const { categoryName } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(()=>{


        const filtered = products.filter((product) => product.category === categoryName.toLowerCase
        ());

        setFilteredProducts(filtered)

    },[categoryName])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);  
    
    
    return (
        <>
        <section className='section__container bg-primary-light'>
            <h2 className='section__header capitalize'>{categoryName}</h2>
            <p className='section__subheader'>Browse a diverse range of categories, from chic dresses to versatile accessories. Evaluate your style here</p>
             
        </section>

        {/* product cards */}

        <div className='section__container'>
            <ProductCard products={filteredProducts} />
        </div>
        </>
    );
};

export default CategoryPage;
