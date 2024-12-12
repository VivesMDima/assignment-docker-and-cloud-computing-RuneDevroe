import React from 'react';

const Homepage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to the T'au Empire</h1>
      <p>Unite under the Greater Good and explore the rich history, units, and philosophy of the T'au.</p>
    </div>
  );
};

const styles = {
  container: { padding: '20px', textAlign: 'center' }
};

export default Homepage;
