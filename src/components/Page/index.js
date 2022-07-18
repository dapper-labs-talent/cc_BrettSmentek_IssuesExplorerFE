function Page({ children }) {
  return <PageLayout>{children}</PageLayout>;
}

const PageLayout = styled.div`
  display: flex;
`;

export default Page;
