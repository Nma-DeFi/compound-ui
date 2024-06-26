import Head from 'next/head';
import NavLink from './NavLink';
import ConnectButton from './ConnectButton';
import NetworkSelector from './NetworkSelector';
import { useNetworkEvents } from "../hooks/useNetworkEvents";
import ProtocolStats from './ProtocolStats';
import { useAutoRefreshAccruedPositions } from '../hooks/useAutoRefreshAccruedPositions';
import { useEffect } from 'react';
import { useBootstrap } from '../hooks/useBootstrap';
import { useAutoRefreshRewardsOwed } from '../hooks/useAutoRefreshRewardsOwed';
import css from '../styles/components/Layout.module.scss'

const SocialLinks = {
    Discord: 'https://discord.gg/compound',
    X: 'https://x.com/compoundfinance',
    Github: 'https://github.com/compound-finance',
}

export const Path = {
    Index: '/',
    Borrow: '/borrow',
    Earn: '/earn',
    Claim: '/claim',
} 

export default function Layout({ children }) {

    useNetworkEvents()
    //useAutoRefreshAccruedPositions()
    //useAutoRefreshRewardsOwed()
    
    const { getOrCreateCollapse } = useBootstrap()

    useEffect(() => {
        if (!getOrCreateCollapse) return
        const menuToggle = document.getElementById('navbarSupportedContent')
        if (menuToggle) {
            const bsCollapse = getOrCreateCollapse(menuToggle, { toggle: false })
            const navLinks = menuToggle.querySelectorAll('.nav-item')
            navLinks.forEach(l => l.addEventListener('click', () => bsCollapse.toggle()))    
        }
    }, [getOrCreateCollapse])

    return (
        <> 
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Compound Lite</title>
            </Head>
            <nav className="navbar navbar-expand-xl sticky-top bg-white border-bottom shadow-sm px-1 py-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href={Path.Index}>
                        <img src="/images/compound-logo.svg" alt="Compound" width="185" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-block d-xl-none mt-4">
                            <NetworkSelector id="navbar-chain-selector" fontSize="120%" collapseNavbar={true} />
                        </div>
                        <ul className={`${css['collapse-menu']} navbar-nav d-flex d-xl-none fs-5`}>
                            <li className="nav-item"><NavLink href={Path.Borrow}><i className="bi bi-box-arrow-down me-1"></i> Borrow</NavLink></li>
                            <li className="nav-item"><NavLink href={Path.Earn}><i className="bi bi-stars me-1"></i> Earn</NavLink></li>
                            <li className="nav-item"><NavLink href={Path.Claim}><i className="bi bi-balloon me-1"></i> Claim</NavLink></li>
                        </ul>
                        <div className="d-none d-xl-flex justify-content-center flex-grow-1 text-center">
                            <ProtocolStats />
                        </div>
                        <div>
                            <ConnectButton />
                        </div>
                    </div>
                </div>
            </nav>
            <div id="main-container" className="container-fluid px-4">
                <div className="row">
                    <div className="col-2 d-none d-xl-flex flex-column">
                        <div id="menu-column">
                            <NetworkSelector />
                            <div id="pages-navigation" className="bg-body px-3 py-4 border rounded-4 shadow">
                                <ul className="nav nav-pills flex-column mb-auto">
                                    <li className="nav-item"><NavLink href={Path.Borrow}><i className="bi bi-box-arrow-down me-1"></i> Borrow</NavLink></li>
                                    <li className="nav-item"><NavLink href={Path.Earn}><i className="bi bi-stars me-1"></i> Earn</NavLink></li>
                                    <li className="nav-item"><NavLink href={Path.Claim}><i className="bi bi-balloon me-1"></i> Claim</NavLink></li>
                                </ul>
                            </div>
                            <div className={`${css['social-links']} d-flex justify-content-around text-primary`}>
                                <a href={SocialLinks.Github}><i className="bi bi-github"></i></a>
                                <a href={SocialLinks.Discord}><i className="bi bi-discord"></i></a>
                                <a href={SocialLinks.X}><i className="bi bi-twitter-x"></i></a>
                            </div>
                        </div>
                    </div>
                    { children }
                </div>
            </div>
        </>
    )
}