import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// hooks

// components
// import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
// import LoadingScreen from './components/LoadingScreen';
// import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import ThemeLocalization from './components/ThemeLocalization';
import './App.css';
// ----------------------------------------------------------------------

export default function App() {
  // const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <ThemeLocalization>
          <RtlLayout>
            {/* <NotistackProvider> */}
            {/* <Settings /> */}
            <ScrollToTop />
            <Router />
            {/* </NotistackProvider> */}
          </RtlLayout>
          <ToastContainer />
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
