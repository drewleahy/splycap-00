
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Define partners explicitly without Omar
const partners = [
  {
    name: "Tyler Williams",
    role: "General Partner",
    location: "Dallas, TX",
    linkedin: "https://www.linkedin.com/in/tyler-williams-476283101/",
    bio: "Tyler Williams is a serial entrepreneur turned seasoned investor, with a proven track record of building and scaling successful companies, culminating in multiple successful exits. This entrepreneurial foundation has honed his expertise in private equity and alternative investments.\n\nAs a General Partner at SPLYCAP, Tyler leverages his deep knowledge in deal sourcing, due diligence, and portfolio management to uncover high-potential investments. His extensive industry network provides access to exclusive opportunities, driving exceptional results for SPLYCAP investors.",
    image: "/lovable-uploads/4d28451c-7efa-4856-983e-004c1c3a5142.png"
  },
  {
    name: "Drew Leahy",
    role: "General Partner",
    location: "Ann Arbor, MI",
    linkedin: "https://www.linkedin.com/in/drewleahy/",
    bio: "Drew Leahy is a General Partner at SPLYCAP as a 3x entrepreneur and 3x venture capital fund manager. Previously, he served as a founding partner at Hawke Ventures ($25M AUM), General Partner for a New Zealand venture fund ($50M AUM), and a family office investment manager in alternatives. Drew has developed a comprehensive understanding of venture capital dynamics, from early to late stage investing, and maintains strong relationships within the investment community. His analytical approach and deep market knowledge contribute to SPLYCAP's ability to source and evaluate exceptional investment opportunities.",
    image: "/lovable-uploads/452e0ed4-d482-48a7-b740-0c0d3d1defc7.png"
  },
  {
    name: "Tristan Schaeffer",
    role: "Venture Partner",
    location: "Chicago, IL",
    linkedin: "https://www.linkedin.com/in/tristanschaeff/",
    bio: "Tristan Schaeffer is a seasoned operator and investor, currently serving as a strategic Venture Partner at SPLYCAP and the Founding Managing Partner at Worldview. A serial entrepreneur, Tristan successfully exited his first company at just 22 and has since built a distinguished career driving growth, forging strategic partnerships, and creating transformative value across multiple sectors.\n\nA recognized leader in the Heartland Economy, Tristan has achieved two successful exits, built a $120M+ credit portfolio, and played a pivotal role in tripling revenue at a nationally leading nonprofit. He has also spearheaded numerous strategic initiatives for some of the nation's largest brands, organizations, and political leaders.\n\nWith an extensive network and deep expertise in the venture ecosystem, Tristan excels at identifying and capitalizing on exceptional investment opportunities, delivering outsized value to SPLYCAP's investor network.",
    image: "/lovable-uploads/7324186b-c059-42d6-9532-5edc7d9e716d.png"
  },
];

export const Partners = () => {
  const isMobile = useIsMobile();
  // Split the partners into two groups - main partners and Tristan
  const mainPartners = partners.slice(0, 2);
  const tristanPartner = partners[2];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Our Partners</h2>
        
        {/* Main partners - now a 2 column layout since we removed Omar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {mainPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg shadow-sm text-center flex flex-col h-full"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                <img 
                  src={partner.image} 
                  alt={partner.name}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{partner.name}</h3>
              <p className="text-gray-600 mb-4">{partner.role}</p>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed flex-grow whitespace-pre-line">{partner.bio}</p>
              <p className="text-gray-800 mb-4">{partner.location}</p>
              <a
                href={partner.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </motion.div>
          ))}
        </div>
        
        {/* Tristan's card - desktop: horizontal layout, mobile: same as others */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={tristanPartner.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`bg-white p-8 rounded-lg shadow-sm ${isMobile ? 'text-center flex flex-col' : 'flex flex-col md:flex-row items-center md:items-start gap-8'}`}
          >
            {isMobile ? (
              // Mobile layout - matches the other partner cards
              <>
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src={tristanPartner.image} 
                    alt={tristanPartner.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{tristanPartner.name}</h3>
                <p className="text-gray-600 mb-4">{tristanPartner.role}</p>
                <p className="text-gray-700 mb-6 text-sm leading-relaxed whitespace-pre-line">{tristanPartner.bio}</p>
                <p className="text-gray-800 mb-4">{tristanPartner.location}</p>
                <a
                  href={tristanPartner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </>
            ) : (
              // Desktop layout - horizontal with image on left
              <>
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-32 h-32 mb-6 rounded-full overflow-hidden">
                    <img 
                      src={tristanPartner.image} 
                      alt={tristanPartner.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{tristanPartner.name}</h3>
                  <p className="text-gray-600 mb-4">{tristanPartner.role}</p>
                  <p className="text-gray-800 mb-4">{tristanPartner.location}</p>
                  <a
                    href={tristanPartner.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{tristanPartner.bio}</p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
