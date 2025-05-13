import styled from "styled-components";
import { PostList } from "../components/PostList";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const PageTitle = styled.h1`
  color: #3B82F6;
  font-size: 3rem;
  
  & span {
    color: #111827;
  }

  @media (max-width: 450px) {
    font-size: 2rem;
  }
`

export const PostsPage = () => {
  return (
    <Section>
      <PageTitle>Manage <span>Posts</span></PageTitle>
      <PostList />
    </Section>
  );
};
