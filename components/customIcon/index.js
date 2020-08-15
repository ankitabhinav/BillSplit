export const getIcons = (e) => {
    if(e.match(/cab|auto|taxi|bus/)) {
        return 'taxi'
    } else
    
    if(e.match(/electricity/)) {
        return 'flash'
    } else
    
    if(e.match(/petrol|diesel|cng/)) {
        return 'gas-station'
    } else

    if(e.match(/medicine|doctor|hospital/)) {
        return 'stethoscope'
    } else

    if(e.match(/plane|flight|aeroplane|airplane/)) {
        return 'airplane'
    } else

    if(e.match(/water/)) {
        return 'water'
    } else

    if(e.match(/rent/)) {
        return 'home'
    } else

    if(e.match(/grocery|shop|shopping/)) {
        return 'cart'
    } else

    if(e.match(/wifi|net|internet|broadband/)) {
        return 'flash'
    } else

    if(e.match(/food|burger|bread|drink/)) {
        return 'food'
    } else 
    {
        return 'file-document'
    }
} 