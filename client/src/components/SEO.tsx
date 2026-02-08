import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
}

export default function SEO({ title, description, keywords }: SEOProps) {
    const siteTitle = "Elegance Décor";

    return (
        <Helmet>
            <title>{`${title} | ${siteTitle}`}</title>
            <meta name="description" content={description || "Premium event styling and decoration services."} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
        </Helmet>
    );
}
