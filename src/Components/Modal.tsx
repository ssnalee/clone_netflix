import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { IDetailMovie, IGenre, getDetailData } from "../Routes/api";
import { makeImagePath } from "../Routes/utils";
import { AiOutlineClose } from "react-icons/ai";
import ReactStars from "react-stars";

const GlobalStyle = createGlobalStyle`
  html{overflow: hidden;}
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 99;
`;
const ModalBox = styled(motion.div)`
  position: fixed;
  top: 18%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 50%;
  min-width: 600px;
  height: 600px;
  overflow: auto;
  border-radius: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.lighter};
  z-index: 100;
 `
 const ModalCover = styled.div`
 position: relative;
 width: 100%;
 height: 320px;
 background-size: cover;
 background-position: center center;
 .closeModal {
   position: absolute;
   top: 30px;
   right: 30px;
   width: 30px;
   height: 30px;
   cursor: pointer;
   transition: all 0.3s ease-in-out;
   &:hover {
     color: #181818;
     scale: 1.3;
   }
 }
`;
const ModalCoverTitle = styled.div`
 position: absolute;
 left: calc(30% + 30px);
 bottom: 20px;
 font-weight: 700;
`;

const ModalTitle = styled.h3`
 font-size: 30px;
`;

const ModalSmallTitle = styled.h3`
 font-size: 15px;
 font-weight: 400;
`;

const ModalContents = styled.div`
 position: relative;
 padding: 10px 20px;
 font-weight: 100;
 clear :both;
`;

const ModalImage = styled.div`
 float: left;
 width: 30%;
 margin-top: -25%;
 img {
   width: 100%;
 }
`;

const ModalInfoTitle = styled.div`
 display: none;
`;

const ModalTextCnt = styled.div`
 float: left;
 width: 70%;
 padding-left:  10px;
`;

const ModalInfo = styled.ul`
 font-size: 14px;
 line-height: 18px;
 display: flex;
 flex-direction : row;
 flex-wrap : wrap;
 align-items :center;
 li ~ li:before {
   content: "";
   position: absolute;
   left: 0;
   top: 50%;
   transform: translateY(-50%);
   width: 4px;
   height: 4px;
   border-radius: 50%;
   background-color: #7e7e7e;
 }
`;
const ModalInfoItem = styled.li`
  margin : 0 8px 8px 0;
  padding-left :8px;
  position: relative;
  .rating {
    display: inline-block;
    margin-top : -2px;
    overflow: hidden;
  }
  .ratingValue {
    display: inline-block;
    vertical-align: top;
    padding-left : 2px;
  }
`;
const ModalTagLine = styled.h3`
 position: relative;
 margin-bottom: 20px;
 padding-left: 25px;
 font-size: 13px;
 &:before {
   content: "";
   position: absolute;
   width: 3px;
   height: 15px;
   left: 15px;
   top: 50%;
   transform: translateY(-50%);
   background-color: #999;
 }
`;

const ModalOverView = styled.p`
 font-size: 14px;
 line-height: 18px;
`;
const ModalItem = styled.div`
 display: block;
 margin: 20px 0 30px;
`;
interface IModaldata{
    dataId : number;
    listType : string;
    menuName : string;
    requestUrl : string;
    returnUrl? : string
}
interface MatchParams {
    movieId: string;
  }
function Modal({dataId, listType, menuName, requestUrl, returnUrl} : IModaldata){
    const history = useHistory();
    const modalMatch = useRouteMatch<MatchParams>(`/${menuName}/${listType}/:movieId`);
    const onOverlayClicked =()=>{
        if(menuName ==="home") menuName="";
        if(returnUrl){
            history.push(returnUrl);
        } else {
            history.push(`/${menuName}`);
        }
    }
    const {data, isLoading} = useQuery<IDetailMovie>([listType + dataId, "detail" + dataId],()=> getDetailData(requestUrl, dataId) || null);
    const getGenreToString = (arr: IGenre[]): string => {
        if (arr && arr.length > 0) {
          return (
            arr.map((g, idx) => {
              return idx + 1 === arr.length ? `${g.name}` : `${g.name}`;
            }) + ""
          );
        }
        return "";
      };

    return(
        <>
            <GlobalStyle/>
            <Overlay 
              onClick={onOverlayClicked}
              animate={{opacity:1}}
              exit={{opacity:0}}
            />
            <ModalBox layoutId={ modalMatch?.params.movieId + listType }
              initial={{scale :1}}
              animate={{}}
              exit={{scale :0}}>
                {
                    <>
                    <ModalCover 
                      style={{
                        backgroundImage:`linear-gradient(to top, black, transparent), url(${makeImagePath(data?.backdrop_path || "", "w500")})`}}
                    >
                        <AiOutlineClose
                           onClick={onOverlayClicked}
                           className="closeModal"
                           size={"30px"}
                        />
                        <ModalCoverTitle>
                            <ModalTitle>
                              {data?.title ? data?.title : data?.name}
                            </ModalTitle>
                            <ModalSmallTitle>
                              {data?.original_title ? data?.original_title : ""}
                            </ModalSmallTitle>
                        </ModalCoverTitle>
                      </ModalCover>
                      <ModalContents>
                        <ModalImage>
                            <img
                              src={makeImagePath(data?.poster_path || "", "w500")}
                              alt="poster"
                            />
                        </ModalImage>
                        <ModalTextCnt>
                          <ModalInfoTitle>
                            <ModalTitle>
                              {data?.title ? data?.title : data?.name}
                            </ModalTitle>
                            <ModalSmallTitle>
                              {data?.original_title ? data?.original_title : ""}
                            </ModalSmallTitle>
                          </ModalInfoTitle>
                          <ModalInfo>
                            {data?.release_date ? ( <ModalInfoItem>{data?.release_date}</ModalInfoItem>) : null}
                            {data?.first_air_date ? (<ModalInfoItem>{data?.first_air_date}</ModalInfoItem> ) : null}
                            {data?.runtime ? (<ModalInfoItem>{`${data?.runtime}분`}</ModalInfoItem>) : null}
                            {data?.release_date ? (<ModalInfoItem>{getGenreToString(data?.genres || [])}</ModalInfoItem> ) : null}
                            {/* <ModalInfoItem>{data?.release_date ? data?.release_date : ""}</ModalInfoItem>
                            <ModalInfoItem>{data?.first_air_date ? data?.first_air_date : ""}</ModalInfoItem> 
                            <ModalInfoItem>{data?.runtime ? `${data?.runtime}분` : ""}</ModalInfoItem>
                            <ModalInfoItem>{getGenreToString(data?.genres || [])}</ModalInfoItem>  */}
                              {data?.vote_average ? (
                                <ModalInfoItem>
                                  <ReactStars
                                    count={5}
                                    value={data?.vote_average ? data?.vote_average / 2 : 0}
                                    color1="#E6E6E6"
                                    color2="#FFCC33"
                                    half
                                    size={20}
                                    edit={false}
                                    className="rating"
                                  />
                                  <span className="ratingValue">
                                    ({data?.vote_average.toFixed(1)})
                                  </span>
                                </ModalInfoItem>
                              ) : null}
                          </ModalInfo>
                            <ModalItem>
                              {data?.tagline ? (
                                <ModalTagLine>{data?.tagline}</ModalTagLine>
                              ) : null}
                              <ModalOverView title={data?.overview}>
                                {data && data?.overview.length > 390
                                ? data?.overview.slice(0, 390) + "..."
                                : data?.overview}
                              </ModalOverView>
                            </ModalItem>
                        </ModalTextCnt>
                      </ModalContents>
                    </>
                }
            </ModalBox>
        </>
    )
 }

export default Modal;