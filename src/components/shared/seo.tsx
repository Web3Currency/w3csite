import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogType?: string;
  ogImage?: string;
  schema?: Record<string, any>;
}

export function SEO({
  title,
  description,
  path = "",
  ogType = "website",
  ogImage = "/opengraph.jpg",
  schema,
}: SEOProps) {
  useEffect(() => {
    // 1. Update document title
    const fullTitle = title.includes("W3C") ? title : `${title} | W3C Digital Network`;
    document.title = fullTitle;

    // 2. Helper to set or update meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 3. Update Meta Description
    setMetaTag("name", "description", description);

    // 4. Update Open Graph tags
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    
    // Build absolute URL for canonical / sharing
    const canonicalHost = "https://w3cdigital.network";
    // Normalize path to have leading slash and remove trailing slash unless it's just root
    const formattedPath = path.startsWith("/") ? path : `/${path}`;
    const absoluteUrl = `${canonicalHost}${formattedPath === "/" ? "" : formattedPath}`;
    
    setMetaTag("property", "og:url", absoluteUrl);

    // Use absolute URL for image if it starts with slash
    const absoluteOgImage = ogImage.startsWith("http") 
      ? ogImage 
      : `${canonicalHost}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;
    setMetaTag("property", "og:image", absoluteOgImage);

    // 5. Update Twitter tags
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", absoluteOgImage);

    // 6. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", absoluteUrl);

    // 7. Inject Structured Data (Schema.org)
    let schemaScript = document.getElementById("json-ld-schema") as HTMLScriptElement | null;
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "json-ld-schema";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      // Remove schema script if no schema is specified for the page
      schemaScript.remove();
    }

    // Cleanup on unmount (to avoid leaking schema scripts between navigations)
    return () => {
      const existingScript = document.getElementById("json-ld-schema");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, path, ogType, ogImage, schema]);

  return null;
}
