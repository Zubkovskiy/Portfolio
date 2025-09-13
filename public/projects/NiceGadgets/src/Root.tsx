import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './modules/App/App';
import { HomePage } from './modules/HomePage/HomePage';
import { Favourites } from './modules/FavouritesPages/Favourites';
import { Cart } from './modules/CartPage/Cart';
import { ProductPage } from './modules/ProductPage';
// eslint-disable-next-line max-len
import { NotFoundPage } from './modules/shared/components/NotFoundPage/NotFoundPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';

export const Root = () => {
  return (
    <Router basename="/Portfolio/projects/NiceGadgets">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="home" element={<Navigate to="../" replace />} />
          <Route path=":category" element={<ProductPage />} />
          <Route path=":category/:id" element={<ProductDetailsPage />} />

          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<Cart />} />

          <Route path="not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
