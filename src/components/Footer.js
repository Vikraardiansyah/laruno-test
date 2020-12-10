import React from 'react';

const FooterComp = () => {
  return (
    <footer
      style={{
        position: 'absolute',
        bottom: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b71c1c',
        color: 'white',
        width: '100%',
        height: '7vh',
        textAlign: 'center',
        fontSize: '12px',
      }}
    >
      <span>&copy; 2020 Copyright. All Rights Reserved.</span>
    </footer>
  );
};

export default FooterComp;
