import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from '~/components/layouts/RootLayout';
import HowToLayout from '~/components/layouts/HowToLayout';
import HomePage from '~/pages/HomePage';
import EditHowToPage from '~/pages/EditHowToPage';
import ExplorePage from '~/pages/ExplorePage';
import HowToPage from '~/pages/HowToPage';
import BookmarksPage from '~/pages/BookmarksPage';
import CreatePage from '~/pages/CreatePage';
import SearchPage, { SearchResults } from '~/pages/SearchPage';
import SettingsPage from '~/pages/SettingsPage';
import UserPage from '~/pages/UserPage';
import ProtectedRoutes from './components/ProtectedRoutes';
import SearchResultsPage from './pages/SearchResultsPage';

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
