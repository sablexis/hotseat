import React from 'react';
import Script from 'next/script';
import { useEffect } from 'react';

const AdComponent = ({
    adSlot = 'AD_SLOT_ID',
    style = { margin: '20px 0', textAlign: 'center' }
}) => {
    useEffect(() => {
        try {
          // Ensure the adsbygoogle object exists before pushing
          if (window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (error) {
          console.error('Error loading AdSense:', error);
        }
      }, []);
    
      return (
        <div className="ad-container" style={style}>
          <Script 
            id="google-ads-script"
            async 
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3327430877137663"
            onLoad={() => {
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
              } catch (error) {
                console.error('Error in AdSense script onLoad:', error);
              }
            }}
          />
          <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-3327430877137663"
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      );
};

export default AdComponent;