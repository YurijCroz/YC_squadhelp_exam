const env = process.env.NODE_ENV || "development";
const serverIP = "localhost";
const serverPort = 3000;
export default Object.freeze({
  CONTACTS: {
    TEL: "(877) 355-3585",
  },
  CUSTOMER: "customer",
  CREATOR: "creator",
  MODER: "moderator",
  CONTEST_STATUS_ACTIVE: "active",
  CONTEST_STATUS_FINISHED: "finished",
  CONTEST_STATUS_PENDING: "pending",
  MODER_STATUS_CONTESTS: "contests",
  MODER_STATUS_OFFERS: "offers",
  STATUS_MODERATION: {
    INSPECTION: "inspection",
    PASSED: "passed",
    BANNED: "banned",
  },
  NAME_CONTEST: "name",
  LOGO_CONTEST: "logo",
  TAGLINE_CONTEST: "tagline",
  OFFER_STATUS_REJECTED: "rejected",
  OFFER_STATUS_WON: "won",
  OFFER_STATUS_PENDING: "pending",
  STATIC_IMAGES_PATH: "/staticImages/",
  ANONYM_IMAGE_PATH: "/staticImages/anonym.png",
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  ACCESS_TOKEN: "accessToken",
  PUBLIC_URL:
    env === "production"
      ? `http://${serverIP}:80/`
      : `http://${serverIP}:${serverPort}/public/`,
  NORMAL_PREVIEW_CHAT_MODE: "NORMAL_PREVIEW_CHAT_MODE",
  FAVORITE_PREVIEW_CHAT_MODE: "FAVORITE_PREVIEW_CHAT_MODE",
  BLOCKED_PREVIEW_CHAT_MODE: "BLOCKED_PREVIEW_CHAT_MODE",
  CATALOG_PREVIEW_CHAT_MODE: "CATALOG_PREVIEW_CHAT_MODE",
  CHANGE_BLOCK_STATUS: "CHANGE_BLOCK_STATUS",
  ADD_CHAT_TO_OLD_CATALOG: "ADD_CHAT_TO_OLD_CATALOG",
  CREATE_NEW_CATALOG_AND_ADD_CHAT: "CREATE_NEW_CATALOG_AND_ADD_CHAT",
  USER_INFO_MODE: "USER_INFO_MODE",
  CASHOUT_MODE: "CASHOUT_MODE",
  HEADER_ANIMATION_TEXT: [
    "a Company",
    "a Brand",
    "a Website",
    "a Service",
    "a Book",
    "a Business",
    "an App",
    "a Product",
    "a Startup",
  ],
  FOOTER_ITEMS: [
    {
      title: "SQUADHELP",
      items: ["About", "Contact", "How It Works?", "Testimonials", "Our Work"],
    },
    {
      title: "RESOURCES",
      items: [
        "How It Works",
        "Become a Creative",
        "Business Name Generator",
        "Discussion Forum",
        "Blog",
        "Download eBook",
        "Pricing",
        "Help & FAQs",
      ],
    },
    {
      title: "OUR SERVICES",
      items: [
        "Naming",
        "Logo Design",
        "Taglines",
        "Premium Names For Sale",
        "Creative Owned Names For Sale",
        "Audience Testing",
        "Trademark Research & Filling",
        "Managed Agency Service",
      ],
    },
    {
      title: "LEGAL",
      items: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
    },
  ],
  EVENT_KEY: "events",
  EVENT_INTERVAL: 10000,
});
