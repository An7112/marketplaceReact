 export const addToCart = (item: any) => {
    const productsInCart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const productExists = productsInCart.includes(item);
  
    if (!productExists) {
      productsInCart.push(item);
      localStorage.setItem('cart', JSON.stringify(productsInCart));
    }
  };
  
export  const removeFromCart = (item: any) => {
    const productsInCart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = productsInCart.map(e => e.id).indexOf(item.id);
    if (productIndex !== -1) {
      productsInCart.splice(productIndex, 1);
      localStorage.setItem('cart', JSON.stringify(productsInCart));
    }
  };