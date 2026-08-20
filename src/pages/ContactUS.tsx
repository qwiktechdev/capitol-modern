import React from 'react'
import Navbar from '../comp/Navbar'
import Footer from '../comp/Footer'
import ContactUsBanner from '../comp/ContactUsBanner'
import ContactUs from '../comp/ContactUsMain'

function ContactUS() {
  return (
    <div>
        <Navbar/>
        <ContactUsBanner/>
        <ContactUs/>
        <Footer/>
    </div>
  )
}

export default ContactUS