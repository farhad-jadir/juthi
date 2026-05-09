"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Heart, 
  Share2 
} from "lucide-react";

// কাস্টম আইকন কম্পোনেন্ট
const YoutubeIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Gallery categories
const categories = ["All", "Hair", "Makeup", "Facial", "Bridal", "Videos"];

// Type definitions
type GalleryItemType = {
  id: number;
  title: string;
  category: string;
  type: "image" | "youtube" | "facebook";
  url?: string;
  videoId?: string;
  videoUrl?: string;
  thumbnail?: string;
  description: string;
  date: string;
  likes: number;
};

// Gallery items - Images, YouTube Videos & Facebook Videos
const galleryItems: GalleryItemType[] = [
  // ==================== IMAGES ====================
  {
    id: 1,
    title: "Blowout Perfection",
    category: "Hair",
    type: "image",
    url: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/484533599_1209662037830915_7554255306457497638_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeF2PnSJ4OAM-mIdABnOpEUoqQX_f8hSO16pBf9_yFI7XqF1EgfYqf4sk02UVh9M0o7x4GWX6clJ37ImHebk9GsQ&_nc_ohc=KFcZumPSEGgQ7kNvwFhqsmG&_nc_oc=AdorThCu1UR_UgJneofeW8lS_0r7JMeyjWVgeOjINPnHhDNvZ78y5lsbGlu-rDh47-s&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=kVZvDPljLREOy7Am5eJvbQ&_nc_ss=7b2a8&oh=00_Af7dEUA99kcKAVsH6uNqlHItILGoomxPRl768a1X1RbKPQ&oe=6A04C0E0",
    description: "Sleek and voluminous blowout styling",
    date: "2024-02-15",
    likes: 45
  },
  
  // Makeup Loo
  {
    id: 6,
    title: "Natural Beauty Look",
    category: "Makeup",
    type: "image",
    url: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/658752116_1557621599701622_8360412637518369965_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEGwSrt2lPjMR4g_zffToWMCRMu6EVPEmsJEy7oRU8Sa-XdEY2Ac1t0V7qMwajOyOjxZgEiZlXPjhpsJIgfMo-p&_nc_ohc=D_prMed3wLgQ7kNvwH0yVBo&_nc_oc=Adqha6o-op1269zCT010C9hWXxWFwRKr6dM6SLeXYBoLbhgzehkKBVP0psGzPVbBmko&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=9LqgqhA7kdxkA3t4MYxQqA&_nc_ss=7b2a8&oh=00_Af5TMx8keJcm0YvEL2FTN3WSzuL-4AKe7UjmFliBlmZ01g&oe=6A04CC50",
    description: "Soft natural everyday makeup",
    date: "2024-02-08",
    likes: 43
  },
  {
    id: 7,
    title: "Party Glam Makeup",
    category: "Makeup",
    type: "image",
    url: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/667741947_1569704278493354_2069965141017580924_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEHlv692i9MgzIP0Na5nA-d9rKtvxXjveb2sq2_FeO95lZHsU-RNrmxJHHNA4F7IlAjS0aC5n6rc49m1no9K6Nh&_nc_ohc=hcskYUixJcEQ7kNvwHeL2Rg&_nc_oc=AdpUZjb4uktYDNo25_uEA-Y8G_Us0RNqz7qhh9z-OlHfPR3nVjj3XgerEXzK0wSRFJI&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=x9FcgisfI_Uosfy4aLBAug&_nc_ss=7b2a8&oh=00_Af7f_mZ56RlFPTS2ayH7n6D0j4_nqzDcZXTxeezCUe5WXw&oe=6A04C9FC",
    description: "Bold party makeup with glitter",
    date: "2024-02-01",
    likes: 67
  },
  {
    id: 8,
    title: "Editorial Fashion Look",
    category: "Makeup",
    type: "image",
    url: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/659789557_1562383755892073_3787460854569063434_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHV7XLFYM0lvq6_VXlOds7j3wuJW9uc1cvfC4lb25zVy-rXKLFAaol7-iEVrHff7Q9LkfufdL-CDedsK5sXcvFH&_nc_ohc=iR-iAFTw6gAQ7kNvwFqRdOy&_nc_oc=AdqdqQeFc3VBVTfp61h9xFWBc4mln5LCDskcObVz9UN9-EjVTAyP6y9gjvDFicV5Tr4&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=R9QT2abILdno_L1G5UTyIw&_nc_ss=7b2a8&oh=00_Af4VaYMLU0dMtb2i8j3Ml7V15b4Skz71m6n4RGSPURDliw&oe=6A04BB7D",
    description: "High-fashion editorial makeup",
    date: "2024-01-25",
    likes: 72
  },
  
  // Facial Treatments
  {
    id: 9,
    title: "Hydrafacial Glow",
    category: "Facial",
    type: "image",
    url: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/638212236_1522174356579680_3168293687886828193_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEI_nO9CfPEO8mAkRJ9NhVA1m0QCnapXEjWbRAKdqlcSNWgl8wLjHWDvYk2VziT4FzU7pllbbWAlzeduQXOLb3l&_nc_ohc=IycTmXNyzDUQ7kNvwFXULN6&_nc_oc=Adq9LYaxL2f5bmu-QFrokXjPYJXn3U6bVYi-wNeziJ5oQ3lHo71e0VHStog5m8Orvas&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=xUqYHtpDnVArxBqS0Vd_RQ&_nc_ss=7b2a8&oh=00_Af5umafJ-35l4u-lxhPaquZ7WwtA3P1QmMIaoFiszxHn8A&oe=6A04B8C8",
    description: "Deep cleansing hydrafacial treatment",
    date: "2024-02-14",
    likes: 34
  },
  
  
  // Bridal Specials
  {
    id: 12,
    title: "Complete Bridal Package",
    category: "Bridal",
    type: "image",
    url: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/488421281_1229934735803645_6912216010517547876_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGxeBh2j7JDGU2AcR5lh0MNR3E2zs-AJu1HcTbOz4Am7TAwYl4f8ib_2psPBtTteO8ATCf2njWkg44-TO8yJ3CW&_nc_ohc=qcIw8Xo4psMQ7kNvwE77NE-&_nc_oc=AdqRfBO6GJVS14js33FcM8yFIn4qkddWfXki61MRhBLzYBayJcOdszBlwKT6e70pcOg&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=t4sE1mgfU1SGUU30Z8Drng&_nc_ss=7b2a8&oh=00_Af4Kp3v69Eue8wC_Ppe2SVAiwNoJYoDodjk5bEHDElcrlA&oe=6A04C9B9",
    description: "Complete bridal transformation package",
    date: "2024-02-09",
    likes: 94
  },
  

  // ==================== YOUTUBE VIDEOS ====================
  {
    id: 15,
    title: "Client Transformation Story",
    category: "Videos",
    type: "facebook",
    videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F950465424392724%2F&show_text=false&width=267&t=0",
    thumbnail: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/681634187_1585686593561789_5328865067437932238_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEWXGxc9co1TzzYGik88SLQ6iOGOd8YmP_qI4Y53xiY_83bHWj_EE7NYx0fgCGp29y13twbr8dj4cG-0UlLlDEY&_nc_ohc=6Uh7Tj1KjwIQ7kNvwGw__cN&_nc_oc=AdqLkOMa2X1mdgHUjLcMcW3EV1WbFrp4GcdbfkmWIf_jCI8a9EU5ht9j7_axGnhTkIs&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=-hA27YhfvvwidAp3ObvzKg&_nc_ss=7b2a8&oh=00_Af5unxGL426vFAIj7twb5xqp4C79HgIi_NOp3nISaX4_qA&oe=6A04DF04",
    description: "Amazing before and after transformation",
    date: "2024-02-12",
    likes: 203
  },
  {
    id: 16,
    title: "Client Transformation Story",
    category: "Videos",
    type: "facebook",
    videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F950465424392724%2F&show_text=false&width=267&t=0",
    thumbnail: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/681634187_1585686593561789_5328865067437932238_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEWXGxc9co1TzzYGik88SLQ6iOGOd8YmP_qI4Y53xiY_83bHWj_EE7NYx0fgCGp29y13twbr8dj4cG-0UlLlDEY&_nc_ohc=6Uh7Tj1KjwIQ7kNvwGw__cN&_nc_oc=AdqLkOMa2X1mdgHUjLcMcW3EV1WbFrp4GcdbfkmWIf_jCI8a9EU5ht9j7_axGnhTkIs&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=-hA27YhfvvwidAp3ObvzKg&_nc_ss=7b2a8&oh=00_Af5unxGL426vFAIj7twb5xqp4C79HgIi_NOp3nISaX4_qA&oe=6A04DF04",
    description: "Amazing before and after transformation",
    date: "2024-02-12",
    likes: 203
  },
  {
    id: 17,
    title: "Client Transformation Story",
    category: "Videos",
    type: "facebook",
    videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F950465424392724%2F&show_text=false&width=267&t=0",
    thumbnail: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/681634187_1585686593561789_5328865067437932238_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEWXGxc9co1TzzYGik88SLQ6iOGOd8YmP_qI4Y53xiY_83bHWj_EE7NYx0fgCGp29y13twbr8dj4cG-0UlLlDEY&_nc_ohc=6Uh7Tj1KjwIQ7kNvwGw__cN&_nc_oc=AdqLkOMa2X1mdgHUjLcMcW3EV1WbFrp4GcdbfkmWIf_jCI8a9EU5ht9j7_axGnhTkIs&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=-hA27YhfvvwidAp3ObvzKg&_nc_ss=7b2a8&oh=00_Af5unxGL426vFAIj7twb5xqp4C79HgIi_NOp3nISaX4_qA&oe=6A04DF04",
    description: "Amazing before and after transformation",
    date: "2024-02-12",
    likes: 203
  },

  // ==================== FACEBOOK VIDEOS ====================
  {
    id: 18,
    title: "Client Transformation Story",
    category: "Videos",
    type: "facebook",
    videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F950465424392724%2F&show_text=false&width=267&t=0",
    thumbnail: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/681634187_1585686593561789_5328865067437932238_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEWXGxc9co1TzzYGik88SLQ6iOGOd8YmP_qI4Y53xiY_83bHWj_EE7NYx0fgCGp29y13twbr8dj4cG-0UlLlDEY&_nc_ohc=6Uh7Tj1KjwIQ7kNvwGw__cN&_nc_oc=AdqLkOMa2X1mdgHUjLcMcW3EV1WbFrp4GcdbfkmWIf_jCI8a9EU5ht9j7_axGnhTkIs&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=-hA27YhfvvwidAp3ObvzKg&_nc_ss=7b2a8&oh=00_Af5unxGL426vFAIj7twb5xqp4C79HgIi_NOp3nISaX4_qA&oe=6A04DF04",
    description: "Amazing before and after transformation",
    date: "2024-02-12",
    likes: 203
  },
  {
    id: 19,
    title: "Client Transformation Story",
    category: "Videos",
    type: "facebook",
    videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F950465424392724%2F&show_text=false&width=267&t=0",
    thumbnail: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/681634187_1585686593561789_5328865067437932238_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEWXGxc9co1TzzYGik88SLQ6iOGOd8YmP_qI4Y53xiY_83bHWj_EE7NYx0fgCGp29y13twbr8dj4cG-0UlLlDEY&_nc_ohc=6Uh7Tj1KjwIQ7kNvwGw__cN&_nc_oc=AdqLkOMa2X1mdgHUjLcMcW3EV1WbFrp4GcdbfkmWIf_jCI8a9EU5ht9j7_axGnhTkIs&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=-hA27YhfvvwidAp3ObvzKg&_nc_ss=7b2a8&oh=00_Af5unxGL426vFAIj7twb5xqp4C79HgIi_NOp3nISaX4_qA&oe=6A04DF04",
    description: "Amazing before and after transformation",
    date: "2024-02-12",
    likes: 203
  },
];

// Video Card Component with hover play
function VideoCard({ item }: { item: GalleryItemType }) {
  const [isHovering, setIsHovering] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getVideoSrc = () => {
    if (item.type === "youtube" && item.videoId) {
      return `https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&loop=1&playlist=${item.videoId}&controls=0&modestbranding=1&rel=0`;
    } else if (item.type === "facebook" && item.videoUrl) {
      return item.videoUrl;
    }
    return "";
  };

  return (
    <div 
      className="relative overflow-hidden rounded-2xl shadow-lg bg-white aspect-[4/5]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering ? (
        // Video playing on hover
        <iframe
          ref={iframeRef}
          src={getVideoSrc()}
          title={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        // Thumbnail when not hovering
        <>
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-4">
              {item.type === "youtube" ? (
                <YoutubeIcon size={32} className="text-red-600" />
              ) : (
                <FacebookIcon size={32} className="text-blue-600" />
              )}
            </div>
          </div>
        </>
      )}
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
        </div>
      </div>
      
      {/* Category Badge */}
      <div className="absolute top-3 right-3 bg-pink-600/90 text-white px-3 py-1 rounded-full text-xs font-medium">
        {item.category}
      </div>

      {/* Video Type Badge */}
      <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
        {item.type === "youtube" ? (
          <YoutubeIcon size={14} />
        ) : (
          <FacebookIcon size={14} />
        )}
        <span>{item.type === "youtube" ? "YouTube" : "Facebook"}</span>
      </div>
    </div>
  );
}

// Image Card Component
function ImageCard({ item, onClick }: { item: GalleryItemType; onClick: () => void }) {
  return (
    <div 
      className="relative overflow-hidden rounded-2xl shadow-lg bg-white aspect-[4/5] cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={item.url}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
        </div>
      </div>
      
      {/* Category Badge */}
      <div className="absolute top-3 right-3 bg-pink-600/90 text-white px-3 py-1 rounded-full text-xs font-medium">
        {item.category}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItemType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter items based on category
  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  // Handle item click (only for images)
  const handleImageClick = (item: GalleryItemType, index: number) => {
    if (item.type === "image") {
      setSelectedItem(item);
      setCurrentIndex(index);
    }
  };

  // Navigate through items
  const nextItem = () => {
    if (currentIndex < filteredItems.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedItem(filteredItems[newIndex]);
    }
  };

  const prevItem = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedItem(filteredItems[newIndex]);
    }
  };

  // Handle share
  const handleShare = async () => {
    if (selectedItem) {
      try {
        await navigator.share({
          title: selectedItem.title,
          text: selectedItem.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    }
  };

  // Render video in lightbox
  const renderVideoLightbox = (item: GalleryItemType) => {
    if (item.type === "youtube" && item.videoId) {
      return (
        <div className="relative aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`}
            title={item.title}
            className="w-full h-full rounded-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    } else if (item.type === "facebook" && item.videoUrl) {
      return (
        <div className="relative aspect-video w-full">
          <iframe
            src={item.videoUrl}
            title={item.title}
            className="w-full h-full rounded-2xl"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            scrolling="no"
            frameBorder="0"
          ></iframe>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-pink-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-pink-600">Gallery</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hover on videos to play instantly | Click on images to view larger
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Sparkles className="text-pink-600" size={20} />
            <span className="text-sm text-gray-500">{galleryItems.length}+ Photos & Videos</span>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2 rounded-full font-medium transition-all duration-300
                ${selectedCategory === category
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30 scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
                }
              `}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {item.type === "image" ? (
                <ImageCard item={item} onClick={() => handleImageClick(item, index)} />
              ) : (
                <VideoCard item={item} />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </motion.div>
        )}

        {/* Lightbox Modal - Only for images */}
        <AnimatePresence>
          {selectedItem && selectedItem.type === "image" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
              onClick={() => setSelectedItem(null)}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-white hover:text-pink-500 transition-colors z-10"
              >
                <X size={32} />
              </button>

              <div className="absolute top-4 left-4 z-10">
                <button
                  onClick={handleShare}
                  className="bg-white/20 hover:bg-pink-600 text-white p-2 rounded-full transition-colors"
                  title="Share"
                >
                  <Share2 size={20} />
                </button>
              </div>

              {currentIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevItem();
                  }}
                  className="absolute left-4 text-white hover:text-pink-500 transition-colors z-10"
                >
                  <ChevronLeft size={40} />
                </button>
              )}

              {currentIndex < filteredItems.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextItem();
                  }}
                  className="absolute right-4 text-white hover:text-pink-500 transition-colors z-10"
                >
                  <ChevronRight size={40} />
                </button>
              )}

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-6xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-2xl">
                  <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                  <p className="text-white/90 mb-2">{selectedItem.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="bg-pink-600/80 px-3 py-1 rounded-full">
                      {selectedItem.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={16} className="text-red-400" />
                      {selectedItem.likes} likes
                    </span>
                    <span className="text-white/70">
                      {selectedItem.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}