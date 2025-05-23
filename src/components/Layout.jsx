import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../contexts/useAuth"
import { NavBar } from "./NavBar"
import HeaderLogo from "./HeaderLogo"
import LoadingSpinner from "./LoadingSpinner"

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas: 
    'header'
    'main';
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #F9FAFB;
`

const Header = styled.div`
  grid-area: header;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const Main = styled.div`
  grid-area: main;
  padding: 1rem;
`

const Layout = () => {
  const { isAdmin, logout, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const token = sessionStorage.getItem('token');
    if (!token || !isAdmin) {
      logout();
      window.location.href = `${import.meta.env.VITE_PUBLIC_URL}/login`;
    }
  }, [isAdmin, logout, loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Header>
        <HeaderLogo />
        <NavBar />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Container>
  )
}

export default Layout;
