import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 4px 8px;
  color: black;
  position: relative;

  &.active {
    font-weight: bold;

    &::before {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: black;
    }
  } 
`

export const NavBar = () => {
  return (
    <nav>
      <NavLink to={'posts'}>Posts</NavLink>
      <NavLink to={'comments'}>Comments</NavLink>
      <NavLink to={'create-post'}>Create Post</NavLink>
    </nav>
  );
};