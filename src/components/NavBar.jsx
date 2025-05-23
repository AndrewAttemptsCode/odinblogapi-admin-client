import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 4px 8px;
  color: #111827;
  position: relative;

  @media (max-width: 450px) {
    font-size: 14px;
  }

  &.active {
    font-weight: bold;

    &::before {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #3B82F6;
    }
  } 
`

export const NavBar = () => {
  return (
    <nav>
      <NavLink to={`${import.meta.env.VITE_PUBLIC_URL}`}>Home</NavLink>
      <NavLink to={'posts'}>Posts</NavLink>
      <NavLink to={'comments'}>Comments</NavLink>
      <NavLink to={'create-post'}>Create Post</NavLink>
    </nav>
  );
};