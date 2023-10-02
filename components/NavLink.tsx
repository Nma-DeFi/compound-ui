import Link from "next/link";
import { useRouter } from "next/router";

export default function NavLink({ href, children }) {

    const { pathname } = useRouter();
    const active = pathname === href || pathname === '/' && href === '/borrow' ? 'active' : '';

    return (
        <Link href={href} passHref legacyBehavior>
            <a className={`nav-link ${active}`}>
                {children}
            </a>
        </Link>
    );
}
