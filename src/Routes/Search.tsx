import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { IGetSearchResult, getSearch } from "./api";
import styled from "styled-components";
import { makeImagePath } from "./utils";
import { motion } from "framer-motion";
import ReactStars from "react-stars";
const Wrapper = styled.div`
    height:'200vh'
    overflow-x: hidden;
    margin-top :100px;
`;
const Loader = styled.div`
    width: 100vw;
    height : 100vh;
    display :flex;
    align-items : center;
    justify-content : center;
    font-size: 20px;
`;
const Ul = styled(motion.ul)`
    display: grid;
    gap : 5px;
    // grid-template-columns : repeat(4,1fr);
    padding: 20px;
   
`;
const Box =styled(motion.li)`
    display : flex;
    border-bottom : 1px solid #676767;
    width: 90%;
    padding: 5px 0 10px;
    margin : 0 auto;
    min-width : 800px;
`;
const Img = styled(motion.div)<{bgPhoto : string}>`
    background-image : url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    width : 400px;
    height : 250px;
    background-color: black;
    position : relative;
    p {
        position : absolute;
        right : 10px;
        bottom :5px;
        background-color : rgba(0,0,0,0.5);
        padding : 5px;
        font-family : 'Nanum Gothic Coding', sans-serif;
        font-weight : 700;
    }
`;
const Info = styled.div`
    padding : 10px;
    width : ${window.innerWidth-420}px;
`;
const MovieTitle = styled.p`
    font-size : 30px;
    margin-bottom : 10px;
`;
const MovieData = styled.p`
    margin-bottom : 15px;
    display: flex;
    flex-direction: row;
    align-items : center;
    .rating{
        padding : 0 3px 0 8px;
        margin-top : -2px;
        overflow: hidden;
    }
`;
const OverView = styled.p`
    font-size :13px;
    line-height : 18px;
`;
function Search(){
    const location =useLocation();
    const keyword = new URLSearchParams(location.search).get('keyword');
    const {data, isLoading} = useQuery<IGetSearchResult>(["keyword", keyword],
    () => getSearch(keyword || ''));
    console.log(data);
    return (
        <Wrapper>
            {isLoading ? 
            <Loader>...loader</Loader> :
            <>
            <Ul>
            {data?.results.map((movie)=>(
                <Box key={movie.id}>
                    <Img bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}>
                        
                    </Img>
                    <Info>
                        <MovieTitle>{movie.title}</MovieTitle> 
                        <MovieData>{movie.release_date}  <ReactStars
                                    count={5}
                                    value={movie?.vote_average ? movie?.vote_average / 2 : 0}
                                    color1="#E6E6E6"
                                    color2="#FFCC33"
                                    half
                                    size={20}
                                    edit={false}
                                    className="rating"
                                  />
                                  <span className="ratingValue">
                                    ({movie?.vote_average.toFixed(1)}점)
                                  </span></MovieData>
                        <OverView> {movie && movie?.overview.length > 390
                                ? movie?.overview.slice(0, 390) + "..."
                                : movie?.overview}</OverView>
                    </Info>
                    
                  </Box>
                ))}   
            </Ul>
            
            </>
            }
        </Wrapper>
    );
}
export default Search;