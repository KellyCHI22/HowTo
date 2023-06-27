import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {
  HomePage,
  EditHowToPage,
  ExplorePage,
  HowToPage,
  BookmarksPage,
  CreatePage,
  SearchPage,
  SearchResultsPage,
  SettingsPage,
  UserPage,
} from '~/pages';
import { RootLayout, HowToLayout } from '~/components/layouts';
import ProtectedRoutes from './components/ProtectedRoutes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route element={<HowToLayout />}>
        <Route path="howtos">
          <Route index element={<ExplorePage />} />
          <Route path=":id">
            <Route index element={<HowToPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="edit" element={<EditHowToPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="users/:id" element={<UserPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="search/:query" element={<SearchResultsPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="create" element={<CreatePage />} />
          <Route path="bookmarks" element={<BookmarksPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
