/* ==========================================================================
   SITE CONTENT: the one file to edit when the client sends new work.

   - videos:   shows on the Home page ("Latest Work", first 3) and the
               Portfolio page (all). Leave empty and those sections stay hidden.
   - photos:   shows in the Portfolio page gallery with filter buttons.
               Filter buttons are built automatically from the categories used.
   - formEndpoint: the Formspree URL for the booking form (see PLAN.md).
               Leave as '' until the client's inbox email is set up.

   Only add real, client-approved work here.
   ========================================================================== */

window.SITE_CONTENT = {
  formEndpoint: '',

  videos: [
    // YouTube: use the video ID (the part after "v=" or after "youtu.be/")
    // { platform: 'youtube', id: 'dQw4w9WgXcQ', title: 'Senior Season Highlights' },
    //
    // Instagram: paste the full post or reel URL
    // { platform: 'instagram', url: 'https://www.instagram.com/reel/XXXXXXXX/', title: 'Game day recap' },
  ],

  photos: [
    // Put image files in an "images/" folder, then list them here.
    // category must be one of: 'sports', 'portraits', 'music'
    // { src: 'images/state-finals-01.jpg', category: 'sports', alt: 'Sprinter crossing the finish line', caption: 'State finals' },
  ],
};
