import './css/PublicNavbar.css'
import React from 'react';
import './css/PublicFooter.css'

const PublicFooter = () => {

    return (
        <div className="public-footer">
            <div className='public-footer-main'>
                <div className='public-footer-main-divs'>
                    <p>Company</p>
                    <a href=''>About Us</a>
                    <a href=''>Pricing</a>
                </div>
                <div className='public-footer-main-divs'>
                    <p>Resources</p>
                    <a href=''>Privacy Policy</a>
                    <a href=''>Terms and Conditions</a>
                    <a href=''>Contact Us</a>
                </div>
                <div className='public-footer-main-divs'>
                    <p>Product</p>
                    <a href=''>Features</a>
                </div>
                <div className='public-footer-main-last-col'>
                    <p className='public-footer-main-logo'>magiclips.ai</p>
                    <div className='subscribe-container'>
                        <p>Subscribe for latest updates!</p>
                        <div className='subscribe-container-input-button-wrapper'>
                            <input type='text' placeholder='Enter your email' className='textbox' />
                            <button className='textbox-inside-button'>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='public-footer-last'>
                <div class="divider-container">
                    <div class="divider-line"></div>
                    <span class="divider-text">Copyright @ 2023 magiclips</span>
                    <div class="divider-line"></div>
                </div>
            </div>
        </div>
      );
}

export default PublicFooter;