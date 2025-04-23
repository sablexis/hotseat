import React from 'react';
import Script from 'next/script';

const AdComponent = ({
    adSlot = 'AD_SLOT_ID',
    style = { margin: '20px 0', textAlign: 'center' }
}) => {
    return (
        <div className='ad-component' style={style}>
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3327430877137663"
                crossOrigin="anonymous"
            />
            <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-3327430877137663"
                data-ad-slot={adSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
            <Script 
        id="adsbygoogle" 
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
        }}
      />
        </div>
    );
};

export default AdComponent;