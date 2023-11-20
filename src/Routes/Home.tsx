import {useQuery} from "react-query";
import { 
    IGetMoviesResult,
    getNowMovies,
    getPopularMovies,
    getTopMovies,
    getUpMovies,
    IMovie,
    LIST_TYPE,
 } from "./api";
import styled from "styled-components";
import { makeImagePath } from "./utils";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
    height:'200vh'
    overflow-x: hidden;
`;
const Loader = styled.div`
    width: 100vw;
    height : 100vh;
    display :flex;
    align-items : center;
    justify-content : center;
    font-size: 20px;
`;
const Banner = styled.div<{bgPhoto : string}>`
    height:100vh;
    display: flex;
    flex-direction : column;
    justify-content : center;
    padding: 60px;
    background-image : linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0)), url(${(props)=>props.bgPhoto});
    background-size : cover;
`;

const Title =styled.h2`
    font-size : 68px;
    margin-bottom : 10px;
`
const OverView =styled.p`
    font-size: 28px;
    width: 60%;
`
const AllSliders = styled.div`
   position : relative;
   top: -100px;
`;

function Home(){
    const {data: nowPlayingMovies, isLoading} = useQuery<IGetMoviesResult>(
        [LIST_TYPE[0],'nowPlayingMovies'], 
        getNowMovies
    );
    const {data: popularMovies} = useQuery<IGetMoviesResult>(
        [LIST_TYPE[1],'popularMovies'], 
        getPopularMovies
    );
    const {data: topRatedMovies} = useQuery<IGetMoviesResult>(
        [LIST_TYPE[2],'topRatedMovies'], 
        getTopMovies
    );
    const {data: upComingMovies} = useQuery<IGetMoviesResult>(
        [LIST_TYPE[3],'upComingMovies'], 
        getUpMovies
    );

    return (
        <Wrapper>
            {isLoading ? 
            (<Loader>Loading...</Loader>) : (
            <>
                <Banner bgPhoto={makeImagePath(nowPlayingMovies?.results[0].backdrop_path || "")}>
                    <Title>{nowPlayingMovies?.results[0].title}</Title>
                    <OverView>{nowPlayingMovies?.results[0].overview}</OverView>
                </Banner>
                <AllSliders>
                    <Slider
                      data = {nowPlayingMovies as IGetMoviesResult}
                      title = {"Now Playing Movies"}
                      listType = {LIST_TYPE[0]}
                      mediaType={"movie"}
                      menuName={"home"}
                    ></Slider>
                      <Slider
                      data = {popularMovies as IGetMoviesResult}
                      title = {"Popular Movies"}
                      listType = {LIST_TYPE[1]}
                      mediaType={"movie"}
                      menuName={"home"}
                    ></Slider>
                      <Slider
                      data = {topRatedMovies as IGetMoviesResult}
                      title = {"Top Rated Movies"}
                      listType = {LIST_TYPE[2]}
                      mediaType={"movie"}
                      menuName={"home"}
                    ></Slider>
                      <Slider
                      data = {upComingMovies as IGetMoviesResult}
                      title = {"UpComing Movies"}
                      listType = {LIST_TYPE[3]}
                      mediaType={"movie"}
                      menuName={"home"}
                    ></Slider>
                </AllSliders>       
            </>)}
        </Wrapper>
    );
}
export default Home;