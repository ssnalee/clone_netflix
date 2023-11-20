import { useState, useEffect, useRef} from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { IGetMoviesResult } from "../Routes/api";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { makeImagePath } from "../Routes/utils";
import Modal from "./Modal";

const Wrapper = styled(motion.div)`
  position: relative;
  min-height: 300px;
  margin-top: 30px;
  overflow: hidden;
  :hover .arrow {
    opacity: 1;
  }
`;

const Title = styled.div`
  font-size: 40px;
  padding: 0 0 20px 15px;
  font-weight: 700;
  font-family : 'Black Han Sans', sans-serif;
`;

const ArrowBtn = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
  z-index: 90;
  cursor: pointer;
  &:hover {
    color: #000;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &:blur {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
  }
  svg {
    width: 40px;
    height: 40px;
  }
`;

const LeftArrowBtn = styled(ArrowBtn)`
  left: 0;
`;

const RightArrowBtn = styled(ArrowBtn)`
  right: 0;
`;

const Row = styled(motion.div)<{ gridcnt: number }>`
  position: absolute;
  left: 0;
  width: 100%;
  display : flex;
  flex-direction : row;
  justify-content : center;
  &:after {
    content: "";
    display: block;
  }
`;

const Box = styled(motion.div)<{ bgphoto: string; offset: number }>`
  display: block;
  position : relative;
  width: calc(100% / ${(props) => props.offset} - 5px);
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  & ~ & {
    margin : 0 5px;
  }
  &:first-child {
    transform-origin: center left;
    margin : 0;
  }
  &:last-child {
    transform-origin: center right;
    margin : 0;
  }
 
`;

const Info = styled(motion.div)`
  position: absolute;
  bottom : 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(0,0,0,0.7);
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 20px;
  }
`;
const rowVariants = {
    hidden : (right : number) => {
        return {
            x : right === 1 ? window.innerWidth + 5 : -window.innerWidth - 5,
        }
    },
    visible : {
        x : 0,
        y : 0
    },
    exit : (right : number) => {
        return {
            x : right === 1 ? -window.innerWidth - 5 : window.innerWidth + 5,
        }
    },
}
const boxVariants = {
    normal : {
        scale : 1,
    },
    hover : {
        zIndex : 99,
        scale : 1.2,
        y : 0,
        transition : {
            delay :0.5,
            duration : 0.3,
            type : "tween"
        }
    }
}
const infoVariants= {
    hover : {
        opacity : 1,
        transition : {
            delay :0.5,
            duration : 0.3,
            type : "tween"
        }
    },
}
interface ISlider{
    data : IGetMoviesResult;
    title : string;
    listType : string;
    mediaType : string;
    menuName : string;
}
function Slider({
    data,
    title,
    listType,
    mediaType,
    menuName,
} : ISlider){
    const offset = 5; //보여주고 싶은 영화의 수
    const [isRight, setIsRight] = useState(1); // left: -1, right: 1
    const [index,setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = (v : boolean) => {
        setLeaving(v);
    }
    const changeIndex = (right : number) => {
        if (leaving) return;
        if (data){
            toggleLeaving(true);
            setIsRight(right);
            const totalMovies = data?.results.length;
            const maxMovies = 
              totalMovies % offset === 0 ?
              Math.floor(totalMovies / offset) - 1 :
              Math.floor(totalMovies / offset);          
            right === 1 ?
            setIndex((prev)=>(prev >= maxMovies ? 0 : prev+1)) :
            setIndex((prev)=>(prev === 0 ? maxMovies : prev-1));
        }
    }
    useEffect(()=>{
        if(data){
            const totalLength =  data.results.length;
            const maxIndex = 
              totalLength % offset === 0 ? 
              Math.floor(totalLength / offset) - 1 :
              Math.floor(totalLength / offset);
            if(index > maxIndex){
                setIndex(maxIndex);
            }
        }
    },[offset,data,index,setIndex]);
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>(`/${menuName}/${listType}/:movieId`);
    const onBoxClicked = (menu: string, type: string, id: number) => {
        history.push(`/${menu}/${type}/${id}`);
    };
    // row Props
    const rowProps = { 
        gridcnt : offset,
        custom : isRight,
        variants : rowVariants,
        initial : "hidden",
        animate : "visible",
        exit : "exit",
        key : index,
        transition : { type:"tween" ,duration : 1,}
    }
    const onClickArrowBtn = (right : number) => {
        if(!leaving){
            changeIndex(right);
        }
    }
    // const {scrollY} = useScroll();
    // const onOverlayClicked = () => {
    //     history.push('/');
    // }
    // const clickMovie = bigMovieMatch?.params.movieId && 
    //     data?.results.find((movie)=> movie.id+'' === bigMovieMatch.params.movieId);
    return(
        <Wrapper>
            <Title>{title}</Title>
            <LeftArrowBtn
                className="arrow"
                onClick={() => onClickArrowBtn(-1)}
            >
                <AiOutlineLeft />
            </LeftArrowBtn>
            <RightArrowBtn
                className="arrow"
                onClick={() => onClickArrowBtn(1)}
            >
                <AiOutlineRight />
            </RightArrowBtn>
            <AnimatePresence
                initial={false}
                onExitComplete={() => toggleLeaving(false)}
                custom={isRight}
            >
                <Row
                  {...rowProps}
                  {...{}}
                 
                >
                      {data?.results
            .slice(offset * index, offset * index + offset)
            .map((d) => (
              <Box
                key={d.id}
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
                layoutId={d.id + "" + listType}
                bgphoto={makeImagePath(d.backdrop_path || "", "w500")}
                offset={offset}
                onClick={() => {
                  onBoxClicked(menuName, listType, d.id);
                }}
              >
                <Info variants={infoVariants}>
                  <h4>{d.title ?  d.title : d.name}</h4>
                </Info>
              </Box>
            ))}

                </Row>
            </AnimatePresence>
            <AnimatePresence>
              {bigMovieMatch ? (
                <Modal 
                   dataId = {Number(bigMovieMatch?.params.movieId)}
                   listType = {listType}
                   menuName = {menuName}
                   requestUrl = {mediaType}
              />
              ) : null} 
            </AnimatePresence>
        </Wrapper>
    )
}

export default Slider