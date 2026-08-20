import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../comp/Navbar';
import Footer from '../comp/Footer';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase';
import { Product } from '../Services/interface';
import Banner from '../comp/Banner';
import ServiceSection from '../comp/ServiceSection';
import OurService from '../comp/OurServiceSection';
import TestimonialsSection from '../comp/Testimony';



function Home() {
  const [data, setData] = useState<Product | null>(null);
  const [recommendedData, setRecommendedData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Manage loading state

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, "files"));
      let products: Product[] = [];
      
      querySnapshot.forEach((doc) => {
        products.push(doc.data() as Product);
      });

      if (products.length > 0) {
        // Shuffle products
        const shuffledProducts = products.sort(() => Math.random() - 0.5);
        
        // Set the first product as the main product
        setData(shuffledProducts[0]);

        // Set the first 5 products as recommended data
        setRecommendedData(shuffledProducts.slice(0, 5));
      } else {
        console.log("No products found!");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const ebookRef = useRef<HTMLDivElement>(null);
  const whoweareRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    if (section === 'ebook' && ebookRef.current) {
      ebookRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'whoweare' && whoweareRef.current) {
      whoweareRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'footer' && footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle click on a recommended item
  const handleRecommendedClick = (product: Product) => {
    setData(product);
    // Scroll to the top of the page or product section after clicking a recommended item
    if (ebookRef.current) {
      ebookRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar  />
      <Banner/>
      <ServiceSection/>
      <OurService/>
      <TestimonialsSection/>
      <Footer/>
    </div>
  );
}

export default Home;
