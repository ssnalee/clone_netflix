import {useQuery} from "react-query";
import { 
    IGetMoviesResult,
    getPopularTvShows,
    getTodayTvShows,
    getOnTheAirTvShows,
    getTopTvShows,
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

function TV(){
    const {data: popularTvShows, isLoading} = useQuery<IGetMoviesResult>(
        [LIST_TYPE[4],'popularTvShows'], 
        getPopularTvShows
    );
    const {data: todayTvShows} = useQuery<IGetMoviesResult>(
        [LIST_TYPE[5],'todayTvShows'], 
        getTodayTvShows
    );
    const {data: onTheAirTvShows} = useQuery<IGetMoviesResult>(
        [LIST_TYPE[6],'onTheAirTvShows'], 
        getOnTheAirTvShows
    );
    const {data: topRatedTvShows} = useQuery<IGetMoviesResult>(
        [LIST_TYPE[7],'topRatedTvShows'], 
        getTopTvShows
    );

    return (
        <Wrapper>
            {isLoading ? 
            ( <Loader>Loading...</Loader>) : (
            <>
                <Banner bgPhoto={makeImagePath(topRatedTvShows?.results[0].backdrop_path || "")}>
                    <Title>
                        {topRatedTvShows?.results[0].title ? topRatedTvShows?.results[0].title : topRatedTvShows?.results[0].name}
                    </Title>
                    <OverView>{topRatedTvShows?.results[0].overview}</OverView>
                </Banner>
                <AllSliders>
                    <Slider
                      data = {popularTvShows as IGetMoviesResult}
                      title = {"Popular TvShows"}
                      listType = {LIST_TYPE[4]}
                      mediaType={"tv"}
                      menuName={"tv"}
                    ></Slider>
                      <Slider
                      data = {todayTvShows as IGetMoviesResult}
                      title = {"Airing Today TvShows"}
                      listType = {LIST_TYPE[5]}
                      mediaType={"tv"}
                      menuName={"tv"}
                    ></Slider>
                      <Slider
                      data = {onTheAirTvShows as IGetMoviesResult}
                      title = {"On The Air TvShows"}
                      listType = {LIST_TYPE[6]}
                      mediaType={"tv"}
                      menuName={"tv"}
                    ></Slider>
                      <Slider
                      data = {topRatedTvShows as IGetMoviesResult}
                      title = {"Top Rated TvShows"}
                      listType = {LIST_TYPE[7]}
                      mediaType={"tv"}
                      menuName={"tv"}
                    ></Slider>
                </AllSliders>       
            </>)}
        </Wrapper>
    );
}
export default TV;