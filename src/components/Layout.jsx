import { Outlet } from "react-router-dom"
import styled from "styled-components"

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
  return (
    <Container>
      <Header>
        Header
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
