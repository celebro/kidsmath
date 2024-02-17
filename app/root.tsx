import { Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import './tailwind.css';
import { RemixNavLinkProps } from '@remix-run/react/dist/components';

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <nav className="flex gap-4 py-4">
                    <MyNavLink to="/add">Seštevanje</MyNavLink>
                    <MyNavLink to="/mul">Množenje</MyNavLink>
                </nav>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

function MyNavLink(props: RemixNavLinkProps) {
    return <NavLink className={({ isActive }) => `px-2 ${isActive ? 'border-b-4 border-current' : ''}`} {...props} />;
}
