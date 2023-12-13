export  function getRandomImages(categoryImages: string[], numberOfImages: number): string[] {
    const selectedImages = [];
    const shuffledImages = categoryImages.slice();
  
    for (let i = 0; i < numberOfImages; i++) {
      const randomIndex = Math.floor(Math.random() * shuffledImages.length);
      selectedImages.push(shuffledImages.splice(randomIndex, 1)[0]);
    }
  
    return selectedImages;
  }
export const imagesByCategory = {
    'T-Shirt':
    ['https://cdn.jolybell.com/images/cGNahzAeoJFmDUy.webp?width=492&height=540&quality=90',
    'https://cdn.jolybell.com/images/ucPsORdrx3gjKUU.webp?width=492&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/23krhtEjb4SgZcQ.webp?width=492&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/9THrvo8ZaDcllU2.webp?width=492&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/xCgnDk8rfBxNlre.webp?width=492&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/oFx2NyWY1bTjEq7.webp?width=492&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/PY7hHZEuoRFm6vM.webp?width=492&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/DZRVnU3g5RWEgOu.webp?width=492&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/7Q5qXQH5C741iri.webp?width=492&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/cog9X298tSXwlWm.webp?width=492&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/ICBQWQ7B7ZKVEzS.webp?width=492&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/w48AXGb9ovFW6sE.webp?width=492&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/2EB4fzXEClMyCrl.webp?width=492&height=540&quality=90' ],

    Sweatshirt:
    [
    'https://cdn.jolybell.com/images/qHFO0z5G1dmYxqP.webp?width=641&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/V54DF5z6teYhvGs.webp?width=641&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/FtLWoLacppTT5J8.webp?width=641&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/55qlqQNta3nmPHJ.webp?width=642&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/4EZvCxHPg3tJEXm.webp?width=642&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/uJEOk84sKGmLvQN.webp?width=642&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/bfUCqwmMOvyY7eV.webp?width=641&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/3hO9tjRux9toCYE.webp?width=642&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/J8kzH7lQRgquYOZ.webp?width=642&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/Vf3glZLq8IZTZP0.webp?width=642&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/0TLhO7qkbxPM9SA.webp?width=642&height=540&quality=90' ],
    
    Hoodie: ['https://cdn.jolybell.com/images/xvrILhJWs8s6fXN.webp?width=549&height=540&quality=90',
    'https://cdn.jolybell.com/images/TxUcsqU1rtGPVxj.webp?width=550&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/TxUcsqU1rtGPVxj.webp?width=550&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/n1BQ3mrJaPlON2Z.webp?width=548&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/EwBTpwiDkN2IKFQ.webp?width=548&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/CpuXO0VEH8GE87J.webp?width=549&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/mx8wqsBKyYfDCLT.webp?width=434&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/BXowq1JiqhdCUSE.webp?width=434&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/nzhWgmHZ6PKzHtq.webp?width=549&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/c9PRRmmW994P9NE.webp?width=549&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/aq4jHB7pEn8iNIP.webp?width=548&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/VvTql0tekfVV9KC.webp?width=548&height=540&quality=90' ,
    'https://cdn.jolybell.com/images/tiftHI7hUjDaaWH.webp?width=549&height=540&quality=90' ]
  }; 