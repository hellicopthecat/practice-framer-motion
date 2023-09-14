import styled from "styled-components";
import {Globalstyle} from "./styled/styled";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import {useEffect, useRef, useState} from "react";

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #fe7def, #fe7daa);
`;
const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: darkgreen;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.5);
  /* margin: 15px; */
`;
const BoxTwo = styled(motion.div)`
  display: grid;
  width: 330px;
  height: 330px;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.5);
  margin: 15px;
  overflow: hidden;
`;
const Circle = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 100%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.5);
  place-self: center;
`;
const boxVar = {
  start: {scale: 0.5, opacity: 0},
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
};
const circleVar = {
  start: {scale: 0, opacity: 0},
  end: {
    scale: 1,
    opacity: 1,
    transition: {type: "spring", duration: 2, bounce: 0.5},
  },
};
const variant = {
  start: {scale: 0},
  end: {scale: 1, rotateZ: 360, transition: {type: "spring", duration: 1}},
};

const hoverTap = {
  hover: {scale: 2},
  click: {scale: 1},
};
const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;
const icon = {
  hidden: {
    pathLength: 0,
    fill: "rgba(255,255,255,0)",
  },
  visible: {
    pathLength: 1,
    fill: "rgba(255,255,255,1)",
  },
};
const boxAppear = {
  hidden: {opacity: 0, scale: 0},
  visible: {opacity: 1, scale: 1, rotateZ: 360},
  leaving: {opacity: 0, y: 10},
};
const boxAppear2 = {
  hidden: (back: boolean) => {
    return {x: back ? -500 : 500, opacity: 0, scale: 0};
  },
  visible: {x: 0, opacity: 1, scale: 1, rotateZ: 360},
  leaving: (back: boolean) => {
    return {x: back ? 500 : -500, opacity: 0, scale: 0};
  },
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  div:first-child,
  div:last-child {
    width: 45vw;

    grid-column: span 2;
  }
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-800, 0, 800], [-360, 0, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, #b37dfe, #7d9ffe)",
      "linear-gradient(135deg, #fe7def, #fe7daa)",
      "linear-gradient(135deg, #7db9fe, #7dfed7)",
    ]
  );
  const {scrollY, scrollYProgress} = useScroll();
  const scale = useTransform(scrollYProgress, [0, 2], [1, 2]);

  const [showing, setShowing] = useState(false);
  const toggleShow = () => setShowing((prev) => !prev);

  const [box, setBox] = useState(1);
  const [back, setBack] = useState(false);
  const nextBox = () => {
    setBack(false);
    setBox((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevBox = () => {
    setBack(true);
    setBox((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const [click, setClick] = useState(false);
  const toggleClick = () => {
    setClick((prev) => !prev);
  };

  const [id, setId] = useState<null | string>(null);

  useEffect(() => {
    // x.on("change", () => console.log(x.get()));
    scrollY.on("change", () =>
      console.log(scrollY.get(), scrollYProgress.get())
    );
  }, [x, scrollY, scrollYProgress]);
  return (
    <>
      <Globalstyle />

      {/*  <Wrapper>
        <motion.div
          animate={{x: 150}}
          transition={{ease: "easeInOut", duration: 0.3}}
        >
          hihi 시작하는 방식을 명시하려면 initial을 사용해야한다.
        </motion.div>
        <Box
          animate={{borderRadius: "50px"}}
          transition={{ease: "easeInOut", duration: 3}}
        />
        <Box initial={{scale: 0}} animate={{scale: 1, rotateZ: 360}} />
        <Box variants={variant} initial="start" animate="end" />
        <Box variants={variant} initial="start" animate="end" />
        <BoxTwo variants={boxVar} initial="start" animate="end">
          <Circle variants={circleVar} />
          <Circle variants={circleVar} />
          <Circle variants={circleVar} />
          <Circle variants={circleVar} />
        </BoxTwo>
        <BoxTwo ref={biggerBoxRef}>
          <Box
            variants={hoverTap}
            drag
            dragSnapToOrigin
            dragElastic
            dragConstraints={biggerBoxRef}
            whileHover="hover"
            whileTap="click"
            whileDrag={{
              backgroundColor: "rgb(46,204,113)",
              transition: {duration: 2},
            }}
          />
          <Box whileHover={{scale: 2}} />
          <Box whileTap={{scale: 2}} />
        </BoxTwo>
      </Wrapper> */}
      <Wrapper style={{background: gradient}} onClick={toggleClick}>
        {/* <Box style={{x, rotate, scale}} drag="x" dragSnapToOrigin /> */}
        {/* <Svg
          xmlns="http://www.w3.org/2000/svg"
          height="10em"
          viewBox="0 0 448 512"
        >
          <motion.path
            variants={icon}
            initial={"hidden"}
            animate={"visible"}
            transition={{
              default: {duration: 5},
              fill: {duration: 2, delay: 2},
            }}
            d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
          />
        </Svg> */}
        {/* <AnimatePresence>
          {showing ? (
            <Box
              variants={boxAppear}
              initial="hidden"
              animate="visible"
              exit="leaving"
            />
          ) : null}
        </AnimatePresence>
        <button onClick={toggleShow}>show</button> */}

        {/*      <AnimatePresence mode="wait" custom={back}>
          <Box
            custom={back}
            variants={boxAppear2}
            initial="hidden"
            animate="visible"
            exit="leaving"
            key={box}
          >
            {box}
          </Box>
        </AnimatePresence>
        <button onClick={prevBox} disabled={box > 1 ? false : true}>
          Click
        </button>
        <button onClick={nextBox} disabled={box < 10 ? false : true}>
          Click
        </button> */}
        {/*   <Box>
          {!click ? (
            <Circle layoutId="circle" style={{borderRadius: 100}} />
          ) : null}
        </Box>
        <Box>
          {click ? (
            <Circle layoutId="circle" style={{borderRadius: 0, scale: 2}} />
          ) : null}
        </Box> */}
        <Grid>
          {["1", "2", "3", "4"].map((n) => (
            <Box onClick={() => setId(n)} key={n} layoutId={n + ""}>
              {n}
            </Box>
          ))}
        </Grid>
        <AnimatePresence>
          {id ? (
            <Overlay
              onClick={() => {
                setId(null);
              }}
              initial={{backgroundColor: "rgba(0, 0, 0, 0)"}}
              animate={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}
              exit={{backgroundColor: "rgba(0, 0, 0, 0)"}}
            >
              <Box layoutId={id} style={{width: 400, height: 300}}>
                {id}
              </Box>
            </Overlay>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}

export default App;
