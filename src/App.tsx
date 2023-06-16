import { Route, Routes } from "react-router-dom";
import { FC, Suspense, lazy } from "react";

import { Container, Spinner } from "components";

const BlogPage = lazy(() => import("./pages/Blog"));
const NewPostPage = lazy(() => import("./pages/NewPost"));
const PostDetailsPage = lazy(() => import("./pages/Post"));
const NotFoundPage = lazy(() => import("./pages/404"));

const App: FC = () => (
  <Container>
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Spinner />}>
            <BlogPage />
          </Suspense>
        }
      />
      <Route
        path="/new"
        element={
          <Suspense fallback={<Spinner />}>
            <NewPostPage />
          </Suspense>
        }
      />
      <Route
        path="/post/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <PostDetailsPage />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Spinner />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  </Container>
);

export default App;
