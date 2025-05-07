import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../contexts/useAuth"

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas: 
    'header'
    'main';
  min-height: 100vh;
  background-color: aliceblue;
`

const Header = styled.div`
  grid-area: header;
  padding: 1rem;
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
      window.location.href = 'http://localhost:5173/login';
    }
  }, [isAdmin, logout, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Header>
        Header
        {/* All posts(publish/unpublish)
        /All comments
        /Create post */}
        {/* <AdminPanel />
        <AuthButton /> */}
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Container>
  )
}

export default Layout;
