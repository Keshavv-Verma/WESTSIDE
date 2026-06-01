import "../utils/patchFetch";
import "./globals.css";
import Footer from "./Footer";
import NavDataComponent from "./components/NavDataComponent";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "WestSide",
  description: "An Online Clothing Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="modal">
        <LayoutClient
          googleClientId={process.env.GOOGLE_CLIENT_ID}
          navDataComponent={<NavDataComponent />}
          footer={<Footer />}
        >
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
