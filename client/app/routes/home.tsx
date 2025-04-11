import type { Route } from "./+types/home";
import App from "~/App";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DappsConnector" },
    { name: "description", content: "Seamlessly connect to decentralized applications" },
    { property: "og:title", content: "DappsConnector" },
    { property: "og:description", content: "Seamlessly connect to decentralized applications" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://dappsconnector.vercel.app" },
    { property: "og:image", content: "https://dappsconnector.vercel.app/asset/cbimage.png" },
    { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    { rel: "apple-touch-icon", href: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    { rel: "icon", href: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { rel: "icon", href: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { rel: "manifest", href: "/favicon/site.webmanifest" },
  ];
}

export default function Home() {
  return <App />;
}
