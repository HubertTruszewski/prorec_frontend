import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from '../components/layout/Layout'
import {AuthVerify} from "../services/AuthVerify";
import {AuthService} from "../services/AuthService";

export default function App({ Component, pageProps }: AppProps) {
    const logOut = () => {
        AuthService.logout();
    }

    return (
    <Layout>
        <Component {...pageProps} />
        <AuthVerify logOut={logOut} />
    </Layout>
    )
  }
