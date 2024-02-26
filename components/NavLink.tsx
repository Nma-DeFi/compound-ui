import Link from "next/link";
import { useRouter } from "next/router";
import { Path } from "./Layout";

export default function NavLink({ href, children }) {

    const { pathname } = useRouter()
    
    const active = () => {
        const isActive = pathname.startsWith(href) || (pathname === Path.Index && href === Path.Borrow)
        return isActive ? 'active' : ''
    }

    return (
        <Link href={href} passHref legacyBehavior>
            <a className={`nav-link ${active()}`}>
                {children}
            </a>
        </Link>
    );
}
