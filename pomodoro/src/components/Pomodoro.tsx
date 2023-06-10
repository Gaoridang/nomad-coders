import { AnimatePresence, motion } from 'framer-motion';
import SetTime from './SetTime';
import Timer from './Timer';
import { useRecoilValue } from 'recoil';
import { idState } from '../data/atom';
import styled from 'styled-components';

const timer = {
  hidden: {
    opacity: 0,
    y: -200,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 5,
      stiffness: 100,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -400,
    transition: {
      ease: [0.74, 0, 0.54, 0.99],
      duration: 0.3,
    },
  },
};

const setTime = {
  initial: {
    opacity: 0,
    borderRadius: '100px',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#fff',
    transition: {
      delay: 0.3,
      duration: 0.5,
      ease: [0.74, 0, 0.54, 0.99],
    },
  },
  animate: {
    opacity: 1,
    borderRadius: '100px',
    backgroundColor: '#6229ff',
    width: '200px',
    height: '200px',
    transition: {
      delay: 0.3,
      duration: 0.5,
      ease: [0.74, 0, 0.54, 0.99],
    },
  },
  exit: {
    opacity: 1,
    borderRadius: 0,
    backgroundColor: '#fff',
    width: '100vw',
    height: '100vh',
  },
};

const Pomodoro = () => {
  const id = useRecoilValue(idState);

  return (
    <>
      <Div>
        <AnimatePresence>
          {id === 1 ? (
            <Wrapper key="timer" variants={timer} initial="hidden" animate="visible" exit="exit">
              <Timer />
            </Wrapper>
          ) : (
            <Wrapper
              key="setTime"
              variants={setTime}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SetTime />
            </Wrapper>
          )}
        </AnimatePresence>
      </Div>
    </>
  );
};

export default Pomodoro;

const Div = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;
