import { FC, ReactNode } from "react";
import { Helmet } from "react-helmet";

import { Container, Footer } from "components";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
