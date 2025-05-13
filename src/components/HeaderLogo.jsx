import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = styled.h1`
  color: #3B82F6;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  & span {
    color: #111827;
  }

  @media (max-width: 450px) {
    font-size: 1.5rem;
  }
`

const StyledLink = styled(Link)`
  margin-right: auto;
  text-decoration: none;
`

const HeaderLogo = () => {
  return (
    <StyledLink to={'/'}>
      <Logo>B<span>logger</span></Logo>
    </StyledLink>
  );
};

export default HeaderLogo;