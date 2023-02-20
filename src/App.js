import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import FlashProvider from './contexts/FlashProvider';
import ApiProvider from './contexts/ApiProvider';
import UserProvider from './contexts/UserProvider';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import ExplorePage from './pages/ExplorePage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import EditUserPage from './pages/EditUserPage';
import ChangePasswordPage from './pages/ChangePasswordPage';

export default function App() {
  return (
    <BrowserRouter>
      <FlashProvider>
        <ApiProvider>
          <UserProvider>
            <Container fluid className='App'>
              <Header />
              <Routes>
                <Route path='/login' element={
                  <PublicRoute><LoginPage /></PublicRoute>
                } />
                <Route path='/register' element={
                  <PublicRoute><RegistrationPage /></PublicRoute>
                } />
                <Route path='*' element={
                  <PrivateRoute>
                    <Routes>
                      <Route path='/' element={<ExplorePage />} />
                      <Route path='/user/:username' element={<UserPage />} />
                      <Route path='/edit' element={<EditUserPage />} />
                      <Route path='/password' element={<ChangePasswordPage />} />
                      <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                  </PrivateRoute>
                } />
              </Routes>
            </Container>
          </UserProvider>
        </ApiProvider>
      </FlashProvider>
    </BrowserRouter>
  );
}