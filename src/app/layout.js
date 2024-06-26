import './globals.css';

export const metadata = {
  title: 'My Next.js App',
  description: 'A basic Next.js app with user registration and login',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
