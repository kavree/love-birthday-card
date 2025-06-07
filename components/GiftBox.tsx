import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const openBox = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const ribbonFloat = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-50px) rotate(10deg); }
  100% { transform: translateY(-100px) rotate(20deg); opacity: 0; }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5e6ff 0%, #e6d7ff 100%);
  padding: 20px;
`;

const GiftBoxWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  cursor: pointer;
  perspective: 1000px;
`;

interface BoxProps {
  isOpen: boolean;
}

const Box = styled.div<BoxProps>`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 1.5s ease-in-out;
  transform: ${(props: BoxProps) => props.isOpen ? 'rotateY(180deg)' : 'rotateY(0)'};
  animation: ${(props: BoxProps) => props.isOpen ? openBox : 'none'} 1s ease-in-out;
`;

const BoxFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #d8b4fe;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  color: white;
  font-size: 24px;
  text-align: center;
  padding: 20px;
`;

const BoxBack = styled(BoxFace)`
  transform: rotateY(180deg);
  background: #c084fc;
`;

interface RibbonProps {
  isOpen: boolean;
}

const Ribbon = styled.div<RibbonProps>`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 100px;
  background: #e9d5ff;
  border-radius: 30px;
  animation: ${(props: RibbonProps) => props.isOpen ? ribbonFloat : 'none'} 2s ease-in-out forwards;
  z-index: 2;
`;

const Message = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const GiftBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      <GiftBoxWrapper onClick={handleClick}>
        <Ribbon isOpen={isOpen} />
        <Box isOpen={isOpen}>
          <BoxFace>
            <Message>Click to open your special gift!</Message>
          </BoxFace>
          <BoxBack>
            <Message>
              Happy Birthday! 🎉<br />
              Wishing you a day filled with love and joy! 💜
            </Message>
          </BoxBack>
        </Box>
      </GiftBoxWrapper>
    </Container>
  );
};

export default GiftBox;