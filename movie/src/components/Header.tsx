import { Link } from "react-router-dom";
import { styled } from "styled-components";
import breakPoints from "../styles/breakPoints";
import { motion } from "framer-motion";
import { useState } from "react";
import { tabs } from "../data/tabs";

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  column-gap: 30px;
  height: 60px;
  margin-top: 20px;

  @media only screen and (${breakPoints.device.sm}) {
    font-size: 1rem;
    column-gap: 20px;
  }

  div {
    a {
      padding: 10px 15px;
      position: relative;
    }
  }
`;

const Underline = styled(motion.span)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: ${(props) => props.theme.color.accent};
`;

const Header = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  return (
    <Container>
      {tabs.map((tab) => (
        <motion.div key={tab.id} onClick={() => setSelectedTab(tab.id)}>
          <Link to={tab.path}>
            <span>{tab.name}</span>
            {selectedTab === tab.id && (
              <Underline
                layoutId={`underline`}
                initial={false}
                animate={{ width: "100%" }}
                exit={{ width: "0%" }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        </motion.div>
      ))}
    </Container>
  );
};

export default Header;
