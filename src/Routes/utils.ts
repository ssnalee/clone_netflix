

export function makeImagePath(id:string, format?:string){
    if(id === null){
        return "http://localhost:3000/logo.png";
    } else{
        return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
    }
}