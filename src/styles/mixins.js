export function boxShadow(color, offset = {height:2,width:2},radius = 3, opacity = 0.2){
    return {
        shadowColor: color,
        shadowOffset: offset,
        shadowOpacity: opacity,
        shadowRadius: radius,
        elevation: radius,
    };
}