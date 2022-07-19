import styled from "styled-components";

function Page({ children }) {
  return <PageLayout>{children}</PageLayout>;
}

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Page;
