import { AnimatePresence, motion } from "framer-motion";
import { Key, useState } from "react";
import { useInfiniteQuery, useQueries, useQuery } from "react-query";
import styled from "styled-components";
import { getTv, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
    background: black;
`;

const Banner = styled.div<{bgPhoto:string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)) , url(${props => props.bgPhoto}); 
    background-size: cover;
`;


const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`;

const Overview = styled.p`
    font-size: 36px;
    width: 50%;
`;


const Slider = styled.div`
    position: relative;
    flex-direction: column;
    flex-grow: 1;
    top:-100px;
`;


const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
    position:  relative;
    width: 100%;
    padding: 10px;
`;

const Box = styled(motion.div)<{bgPhoto:string}>`
    background-color: white;
    background-image: url(${props => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    cursor: pointer;
    &: first-child {
        transform-origin: center left;
    }
    &: last-child {
        transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${props => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;

const offset = 6;

function Tv() {

    const tvResults = useQueries([
        { queryKey: ['movies', 1], queryFn: () => getTv({pageParam:1}) },
        { queryKey: ['movies', 2], queryFn: () => getTv({pageParam:2}) },
        { queryKey: ['movies', 3], queryFn: () => getTv({pageParam:3}) },
        { queryKey: ['movies', 4], queryFn: () => getTv({pageParam:4}) },
        { queryKey: ['movies', 5], queryFn: () => getTv({pageParam:5}) },
        { queryKey: ['movies', 6], queryFn: () => getTv({pageParam:6}) },
        { queryKey: ['movies', 7], queryFn: () => getTv({pageParam:7}) },
        { queryKey: ['movies', 8], queryFn: () => getTv({pageParam:8}) },
        { queryKey: ['movies', 9], queryFn: () => getTv({pageParam:9}) },
        { queryKey: ['movies', 10], queryFn: () => getTv({pageParam:10}) },
    ])

    console.log(tvResults);
    const isLoading = tvResults?.[9].status === "success" ? true : false;

    const [index, setIndex] = useState(0);
        
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if(tvResults?.[0].data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = tvResults?.[0].data?.results.length -1;
            const maxIndex = Math.floor(totalMovies / offset)-1;
            setIndex((prev) => prev === maxIndex ? 0 :prev+1)};
    }
        

    const toggleLeaving = () => setLeaving((prev) => !prev);
    
    return <>
    <Wrapper>
        {!isLoading ? <div>loaing...</div>
        :
        <>
        <Banner
        bgPhoto={makeImagePath(tvResults?.[0].data.results[0].backdrop_path ||"")}>
            <Title>{tvResults?.[0].data.results[0].title}</Title>
            <Overview>{tvResults?.[0].data.results[0].overview}</Overview>
        </Banner>
        <Slider>
            <AnimatePresence initial={false}>
                {tvResults.map(tvResult => (
                    <>
                    <div>{+tvResult.data.page*1}위 ~ {+tvResult.data.page*20}위</div>
                    <Row
                    key={tvResult.data.page}
                    >
                        {tvResult.data.results.slice(offset*index, offset*index+offset).map((result:any) =>
                            <Box
                            key={result.id}
                            bgPhoto={makeImagePath(result.backdrop_path, "w500")}
                            >
                                <Info>
                                    <h4>{result.title}</h4>
                                </Info>
                            </Box>
                        )}
                    </Row>
                    </>
                )
                )}
            </AnimatePresence>
        </Slider>
        </>
        }
    </Wrapper>
    </>;
}

export default Tv;
