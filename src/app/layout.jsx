import { Montserrat, Poppins } from "next/font/google";
import "../index.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-display",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  title: "1 Nation Pakistan | Be a Nation, Not Separation",
  description: "1 Nation Pakistan is a welfare organization fostering national unity, social cohesion, and community welfare. Join our volunteer drives, ration distributions, and clean water campaigns across KP and Pakistan.",
  keywords: ["1 Nation Pakistan", "Welfare", "NGO Pakistan", "Volunteer Pakistan", "Mushtaq Ahmed Ghani", "Abbottabad Welfare", "Pakistan Charity", "Social Cohesion", "Youth Empowerment"],
  authors: [{ name: "1 Nation Pakistan" }],
  openGraph: {
    type: "website",
    title: "1 Nation Pakistan | Be a Nation, Not Separation",
    description: "Fostering national integrity and community welfare. Participate in volunteer drives, healthcare setups, and clean water filtration campaigns.",
    images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"],
  },
  twitter: {
    card: "summary_large_image",
    title: "1 Nation Pakistan | Be a Nation, Not Separation",
    description: "Join our regional volunteer wings and help deliver food, clean water, and healthcare relief to communities.",
  },
  icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <head>
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=85" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
