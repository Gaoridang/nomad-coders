import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { idState } from '../data/atom';

const SetTime = () => {
  const setId = useSetRecoilState(idState);

  return (
    <>
      <Container>
        <Circle onClick={() => setId(1)}>Click to start!</Circle>
      </Container>
    </>
  );
};

export default SetTime;

const Container = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  span {
    grid-column: span 2;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
`;

const Circle = styled(motion.div)`
  width: 200px;
  height: 200px;
  font-size: 1.2rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

// 스타일링 너무 오래 걸림. styled-components 쓸 때 어떻게 줄여야 할까? 재사용 할 수 있게.
// default style 세팅하는 것은 필수? 나중에 쉽게쉽게 하려면 만들어야할 것 같긴 하다.
// timer 숫자를 만드는 여러 방법이 있는데 어떤 것을 써야하나?
// 분 0-25, 초 0-59 이거 그냥 다 써도 될 거 같다..? 애니메이션 만들기는 이게 더 쉽지 않을까?

// useAnimationControls를 이용해서 숫자 모션 적용
// 컴포넌트간 애니메이션을 위해 Pomodoro라는 상위 컴포넌트를 만들고 각각의 컴포넌트에 애니메이션 적용
//

//
