import extractLinks from "./extractLinksFromText";

 // Function to replace URLs, emails, and phone numbers with clickable links

 const TextTOClickableLink = (text) => {
    const links = extractLinks(text);
    if (!links.length) return text; // Return original text if no links found
    return links.reduce((acc, link) => {
      if (link.startsWith("http")) {
        return acc.replace(link, `<a href="${link}">${link}</a>`);
      } else if (link.includes("@")) {
        return acc.replace(link, `<a href="mailto:${link}">${link}</a>`);
      } else if (link.match(/\(\d{3}\)\s*\d{3}-\d{4}/)) {
        return acc.replace(
          link,
          `<a href="tel:${link.replace(/[^\d]/g, "")}">${link}</a>`
        );
      } else if (link.startsWith("www")) {
        return acc.replace(link, `<a href="http://${link}">${link}</a>`);
      }
      return acc;
    }, text);
  };

  export default TextTOClickableLink;