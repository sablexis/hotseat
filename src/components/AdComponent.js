import React from 'react';
import Script from 'next/script';

const AdComponent = ({
    adSlot = '9110206823',
    style = { margin: '20px 0', textAlign: 'center' }
}) => {
    return (
        <div className="ad-container" style={style}>
            <Script 
                id="google-ads-script"
                async 
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3327430877137663"
                strategy="afterInteractive"
                crossOrigin="anonymous"
            />
            <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-3327430877137663"
                data-ad-slot={adSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
            <Script 
                id="adsbygoogle-push"
                strategy="afterInteractive"
            >
                {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
        </div>
    );
};

export default AdComponent;