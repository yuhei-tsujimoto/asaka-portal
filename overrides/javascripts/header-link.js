// Make the header site name clickable and link to homepage
document.addEventListener("DOMContentLoaded", function() {
  // Find the first header topic (site name) within the header title
  const siteName = document.querySelector('.md-header__title .md-header__topic:first-child');

  if (siteName) {
    // Make the site name clickable
    siteName.style.cursor = 'pointer';

    // Add click event to navigate to homepage
    siteName.addEventListener('click', function(e) {
      // Get the base URL from the page (configured site URL)
      const baseUrl = document.querySelector('link[rel="canonical"]')?.href.replace(/\/$/, '') + '/';

      // Navigate to homepage
      if (baseUrl) {
        window.location.href = baseUrl;
      }
    });
  }
});
