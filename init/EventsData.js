const sampleListings = [
  {
    name: "Hackathon",
    date: "2024-06-15",
    time: "4:40",
    description:
      "A 24-hour coding competition for students to showcase their skills.",
    location: "University Auditorium",

    organizer: "Computer Science Department",
    image: {
      filename: "listingimage",
      url: "https://images.squarespace-cdn.com/content/v1/5e6542d2ae16460bb741a9eb/1603318636443-A846ACUKNYUBA0RPLJ94/marvin-meyer-SYTO3xs06fU-unsplash.jpg",
    },
  },
  {
    name: "Codathon",
    date: "2024-07-20",
    time: "4:40",
    description:
      "A coding marathon where participants solve algorithmic problems.",
    location: "Engineering Building",

    organizer: "Engineering Society",
    image: {
      url: "https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg?cs=srgb&dl=codes-coding-programming-270366.jpg&fm=jpg",
      filename: "listingimage",
    },
  },
  // Ensure all other listings use "description" instead of "description" similarly
  {
    name: "Tech Expo",
    date: "2024-08-25",
    time: "4:40",
    description:
      "An exhibition showcasing the latest technological innovations.",
    location: "Campus Convention Center",

    organizer: "Information Technology Club",
    image: {
      url: "https://makefri.jp/wp-content/uploads/2021/11/AdobeStock_428083894-1-scaled.jpeg",
      filename: "listingimage",
    },
  },
  // Continue with other listings...
  {
    name: "Startup Summit",
    date: "2024-09-10",
    time: "4:40",
    description: "A conference bringing together entrepreneurs and investors.",
    location: "Business School Auditorium",

    organizer: "Entrepreneurship Club",
    image: {
      url: "https://static.vecteezy.com/system/resources/previews/003/512/525/non_2x/business-startup-concept-isolated-launch-of-new-project-creation-and-development-people-scene-in-flat-cartoon-design-illustration-for-blogging-website-mobile-app-promotional-materials-vector.jpg",
      filename: "listingimage",
    },
  },
  {
    name: "Art Exhibition",
    date: "2024-10-05",
    time: "4:40",
    description: "An art show featuring works of students and local artists.",
    location: "Fine Arts Gallery",
    organizer: "Art Club",
    image: {
      url: "https://www.indiaart.com/images/khula-aasmaan/exhibitions/23.webp",
      filename: "listingimage",
    },
  },
  {
    name: "Science Fair",
    date: "2024-11-15",
    time: "4:40",
    description: "A showcase of scientific experiments and innovations.",
    location: "Science Building",

    organizer: "Science Department",
    image: {
      url: "https://t3.ftcdn.net/jpg/01/96/96/66/360_F_196966690_7iqTNZZ08zx1am1mytyshlKn0U0WuVVs.jpg",
      filename: "listingimage",
    },

  },
  {
    name: "Cultural Fest",
    date: "2024-12-20",
    time: "4:40",
    description:
      "A celebration of diversity with music, dance, and food from different cultures.",
    location: "Campus Grounds",

    organizer: "Cultural Society",
    image: {
      url: "https://hls.harvard.edu/wp-content/uploads/2022/07/Culture-Fest-Image-1-1024x576-1.png",
      filename: "listingimage",
    },
  },
  {
    name: "Literary Symposium",
    date: "2025-01-25",
    time: "4:40",
    description:
      "An event featuring poetry readings,book discussions, and author talks.",
    location: "Library Auditorium",
    organizer: "English Department",
    image: {
      url: "https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MjAyMTMxMDY2NDg2NTMxMTQw/writing-styles-of-english-literature.jpg",
      filename: "listingimage",
    },
  },
  {
    name: "Environmental Conference",
    date: "2025-02-15",
    time: "4:40",

    description:
      "A conference focusing on environmental issues and sustainability.",
    location: "Environmental Science Building",

    organizer: "Environmental Club",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSooV6FOLZl6DaEU9Lif5YUsJjS2dVLoCSDUHkzJMpOzbiOvBR0lK5bUOYAs-fAWHEv9Ic&usqp=CAU",
      filename: "listingimage",
    },
  },
  {
    name: "Music Concert",
    date: "2025-03-20",
    time: "4:40",
    description:
      "A concert featuring performances by student musicians and bands.",
    location: "Campus Amphitheater",
    organizer: "Music Society",
    image: {
      url: "https://img.freepik.com/premium-vector/cartoon-people-music-festival-festivalgoer-characters-crowd-have-fun-live-concert-show-background_109722-1151.jpg",
      filename: "listingimage",
    },
  },
];
module.exports = { data: sampleListings };
