class TRI {
    degree2radian (degree) {
        return degree * Math.PI / 180;
    }   
    radian2degree(radian) {
        return radian * 180 / Math.PI;
    } 
}

const tri = new TRI();
export { tri as TRI }