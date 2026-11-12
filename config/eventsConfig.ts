export interface WeddingEvent {
  id: string;
  name: string;
  navLabel: string;
  shortDate: string;
  tamilName?: string;
  subTitle?: string;
  illustration: string;
  iconFallback?: "ring" | "turmeric" | "music" | "sacred-fire" | "flower" | "sparkles";
  date: string;
  dayOfWeek?: string;
  startTime: string;
  endTime?: string;
  muhurthamTime?: string;
  venue: string;
  address?: string;
  mapQuery?: string;
  accentColor?: string;
}

export interface EventsConfig {
  sectionTitle: string;
  backgroundImage: string;
  scrollVhPerEvent: number;
  events: WeddingEvent[];
}

export const defaultEventsConfig: EventsConfig = {
  sectionTitle: "WEDDING CELEBRATIONS",
  backgroundImage: "/wedding-events.png",
  scrollVhPerEvent: 58, // Reduced from 130 to 58 for seamless, swift event transitions without getting stuck
  events: [
    {
      id: "nishchithartham",
      name: "Nischithartham",
      navLabel: "NISCHITHARTHAM",
      shortDate: "Fri, Nov 27, 2026",
      tamilName: "நிச்சயதார்த்தம்",
      subTitle: "Traditional Engagement Ceremony",
      illustration: "/events/event-engagement.png",
      iconFallback: "ring",
      date: "Friday, November 27, 2026",
      dayOfWeek: "Friday Evening",
      startTime: "06:00 PM",
      endTime: "09:30 PM",
      venue: "Sri Vijayalakshmi Kalyana Mandapam",
      address: "Grand Ballroom, Rajappa Nagar, Thanjavur",
      mapQuery: "Sri Vijayalakshmi Kalyana Mandapam, Rajappa Nagar, Thanjavur",
      accentColor: "#8e3622",
    },
    {
      id: "haldi",
      name: "Mangala Snanam & Haldi",
      navLabel: "HALDI",
      shortDate: "Sat, Nov 28, 2026",
      tamilName: "மங்கள ஸ்நானம்",
      subTitle: "Auspicious Turmeric Cleansing Ritual",
      illustration: "/events/event-haldi.png",
      iconFallback: "turmeric",
      date: "Saturday, November 28, 2026",
      dayOfWeek: "Saturday Morning",
      startTime: "08:30 AM",
      endTime: "11:30 AM",
      venue: "Royal Courtyard & Heritage Pavilion",
      address: "Chola Heritage Palace, Court Road, Thanjavur",
      mapQuery: "Chola Heritage Palace, Court Road, Thanjavur",
      accentColor: "#d97724",
    },
    {
      id: "sangeet",
      name: "Sangeet & Sandhya",
      navLabel: "SANGEET",
      shortDate: "Sat, Nov 28, 2026",
      tamilName: "சங்கீத மாலை",
      subTitle: "Musical Evening & Celebratory Banquet",
      illustration: "/events/event-sangeet.png",
      iconFallback: "music",
      date: "Saturday, November 28, 2026",
      dayOfWeek: "Saturday Evening",
      startTime: "07:00 PM",
      endTime: "11:00 PM",
      venue: "The Grand Lotus Lawns",
      address: "Palace Gardens, Tanjore Expressway, Thanjavur",
      mapQuery: "The Grand Lotus Lawns, Palace Gardens, Thanjavur",
      accentColor: "#9c3f20",
    },
    {
      id: "wedding",
      name: "Tirukalyanam & Muhurtham",
      navLabel: "WEDDING",
      shortDate: "Sun, Nov 29, 2026",
      tamilName: "திருமங்கல தாரணம்",
      subTitle: "The Holy Vedic Wedding Ceremony",
      illustration: "/events/event-muhurtham.png",
      iconFallback: "sacred-fire",
      date: "Sunday, November 29, 2026",
      dayOfWeek: "Sunday Morning",
      startTime: "08:15 AM",
      endTime: "12:30 PM",
      muhurthamTime: "Sumuhurtham: 09:15 AM - 09:45 AM (Dhanur Lagna)",
      venue: "Ananda Kalyana Mandapam",
      address: "Temple Sanctum Auditorium, South Rampart, Thanjavur",
      mapQuery: "Ananda Kalyana Mandapam, South Rampart, Thanjavur",
      accentColor: "#a3281d",
    },
  ],
};

/**
 * Calculates normalized scroll target for a given event index.
 * Maps event index into the center of its stable active hold window in the section scroll track.
 */
export function getEventScrollProgressTarget(eventIndex: number, totalEvents: number): number {
  if (totalEvents <= 1) return 0.5;
  const step = 1 / totalEvents;
  // Center of active hold is at 50% into the event segment
  return Math.min(0.96, Math.max(0.04, (eventIndex + 0.50) * step));
}
