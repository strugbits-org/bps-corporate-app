 // Function to parse URLs, emails, and phone numbers from text
 const extractLinks = (text) => {
    const linkRegex =
      /((?:https?:\/\/)?(?:www\.)?\S+\.\S+)|(?:\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)|(?:\(\d{3}\)\s*\d{3}-\d{4})/gi;
    return text.match(linkRegex) || [];
  };

  export default extractLinks;