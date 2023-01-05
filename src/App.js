// import logo from './logo.svg';
// import LocalNavbar from './layouts/navbar/navbar.js';
import AuthPage from './pages/auth-page.js';
import Beranda from './components/pages/beranda.js';
import './App.css';
// import Jajaja from './components/pages/jajaja.js';
import './components/fonts/font.css';
// import Dashboard from './seller_space/dashboard.js';
// import ProductDetail from './components/pages/productDetail.js';
import { Navigate, Route, Routes } from 'react-router-dom'
// import jwt_decode from 'jwt-decode'
// import { useEffect } from 'react';
import LoginForm from "./components/forms/login-form";
import Loading from './components/loadings/loading';
import RegisterForm from './components/pages/registerForm.js';
import ItemShow from './pages/itemShow.js';
import AccountVerificationPage from './pages/account-verification-page.js';
import EmailVerificationRequestPage from './pages/email-verification-request-page.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { login, logout } from "./components/stateSlice/loginSlice"
import { onLoad, onDone } from './components/stateSlice/loadingSlice.js';
import PrivateTemplate from './layouts/privateTemplate.js';
import PublicTemplate from './layouts/publicTemplate.js';
import AccountSettingPage from './pages/account-setting-page.js';
import ChatPage from './pages/chat-page.js';
import PembayaranPage from './pages/pembayaran-page.js';
import TransaksiPage from './pages/transaksi-page.js';
import KategoriPage from './pages/kategori.js';
import ItemByKategoriPage from './pages/itemByKategori.js';
import TokoPage from './pages/tokoPage.js';
import Article from './pages/article.js';
import AktivitasPage from './pages/aktivitas-page.js';
import SearchResult from './pages/search-result.js';
// import Coba from './pages/coba.js';
// import { useLocation } from 'react-router-dom'
axios.defaults.withCredentials = true

function App() {

  const dispatch = useDispatch()
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     const user = jwt_decode(token)
  //     if (!user) {
  //       localStorage.removeItem('token')
  //     }
  //   }
  // })

  // const location = useLocation()

  const checkLogin = async () => {
    dispatch(onLoad())
    await axios.get('http://localhost:4001/user/getUser', {
      withCredentials: true
    }).then((response) => {
      dispatch(onDone())
      console.log(response.data.message)
      dispatch(login(response.data.user))
      // return response.data
    })
      .catch((err) => {
        dispatch(onDone())
        console.log(err.response.data.message);
        dispatch(logout())
        // return err.response.data
      })
  }

  useEffect(() => {
    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-slate-50">
      {/* <Dashboard /> */}
      {/* <LocalNavbar/> */}
      <Loading />
      {/* <div id='main' style={{paddingTop:"60px"}} className="lg:container mx-auto"> */}
      {/* <ProductDetail /> */}
      {/* <Dashboard /> */}
      <Routes>
        <Route element={<PublicTemplate />}>
          <Route
            path="/"
            element={<Navigate to="/beranda" />}
          />
          <Route
            path="/register"
            element={<AuthPage >
              <RegisterForm />
            </AuthPage>}
          />
          <Route
            path="/login"
            element={<AuthPage>
              <LoginForm />
            </AuthPage>}
          />
          <Route
            path='/kategori'
            element={<KategoriPage />}
          ></Route>
          <Route
            path='/itemKategori'
            element={<ItemByKategoriPage />}
          ></Route>
          <Route
            path='/toko'
            element={<TokoPage />}
          ></Route>
          <Route
            path='/item'
            element={<ItemShow />}
          ></Route>
          <Route
            path="/beranda"
            element={<Beranda />}
          />
          <Route
            path="/search"
            element={<SearchResult />}
          />
          <Route
            path="/article"
            element={<Article />}
          />
          <Route
            path="/confirm"
            element={<AccountVerificationPage />}
          />
          <Route />
          <Route
            path="/email-verify-request"
            element={<EmailVerificationRequestPage />}
          />
          {/* <Route
            path="/coba"
            element={<Coba />}
          /> */}
        </Route>
        <Route path="/dashboard" element={<PrivateTemplate />}>
          <Route path="" element={<Navigate to="akun" />} />
          <Route
            path="akun"
            element={<AccountSettingPage />}
          />
          <Route
            path="pembayaran"
            element={<PembayaranPage />}
          />
          <Route
            path="chat"
            element={<ChatPage />}
          />
          <Route
            path="transaksi"
            element={<TransaksiPage />}
          />
          <Route
            path="aktivitas"
            element={<AktivitasPage />}
          />
          <Route path="*" element={<Navigate to="akun" />} />
        </Route>
      </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
