import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 4px 8px;
  color: black;

  &.active {
    font-weight: bold;
    border-bottom: 1px solid black;
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