import Head from 'next/head';
import NavLink from './NavLink';
import ConnectButton from './ConnectButton';
import NetworkSelector from './NetworkSelector';
import { cloneElement, useState } from 'react';
import { mainnet } from 'wagmi';

export default function Layout({ children }) {

    const [ chainId, setChainId ] = useState(mainnet.id);    

    const renderChildren = () => {
        return cloneElement(children, { chainId });
    };

    return (
        <> 
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Compound UI</title>
            </Head>
            <nav className="navbar navbar-expand-xl sticky-top bg-white border-bottom shadow-sm px-1 py-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="/images/compound-logo.svg" alt="Compound" width="185" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav d-flex d-lg-none">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Borrow</a>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="#">Farm</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Claim</a></li>
                        </ul>
                        <div className="d-none d-xl-flex justify-content-center flex-grow-1 text-center">
                            <div className="px-5">
                                <div className="fw-semibold">Total collateral</div> 
                                <div className="text-body-tertiary">$543.12M</div>
                            </div>
                            <div className="px-5">
                                <div className="fw-semibold">Total borrowing</div> 
                                <div className="text-body-tertiary">$345.78M</div>
                            </div>
                            <div className="px-5">
                                <div className="fw-semibold">Total farming</div> 
                                <div className="text-body-tertiary">$480.78M</div>
                            </div>
                        </div>
                        <div className="d-none d-lg-block"><ConnectButton /></div>
                    </div>
                </div>
            </nav>
            <div id="main-container" className="container-fluid px-4">
                <div className="row">
                    <div className="col-2 d-none d-xl-flex flex-column">
                        <div id="menu-column">
                            <NetworkSelector currentId={chainId} onChange={setChainId} />
                            <div id="pages-navigation" className="bg-body px-3 py-4 border rounded-4 shadow">
                                <ul className="nav nav-pills flex-column mb-auto">
                                    <li className="nav-item"><NavLink href="/borrow"><i className="bi bi-box-arrow-down me-1"></i> Borrow</NavLink></li>
                                    <li className="nav-item"><NavLink href="/farm"><i className="bi bi-flower2 me-1"></i> Farm</NavLink></li>
                                    <li className="nav-item"><NavLink href="/claim"><i className="bi bi-stars me-1"></i> Claim</NavLink></li>
                                </ul>
                            </div>
                            <div className="d-flex justify-content-around fs-4 text-primary">
                                <a href="#"><i className="bi bi-github"></i></a>
                                <a href="#"><i className="bi bi-discord"></i></a>
                                <a href="#"><i className="bi bi-twitter"></i></a>
                                <a href="#"><i className="bi bi-medium"></i></a>
                            </div>
                        </div>
                    </div>
                    {renderChildren()}
                </div>
            </div>
        </>
    );
}