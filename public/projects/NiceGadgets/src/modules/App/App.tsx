import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import styles from './App.module.scss';
import { ScrollToTop } from '../../utils/ScrollToTop';

export const App = () => {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <ScrollToTop />
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
