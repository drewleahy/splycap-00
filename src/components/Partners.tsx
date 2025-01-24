import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const partners = [
  {
    name: "Tyler Williams",
    role: "General Partner",
    location: "Dallas, TX",
    linkedin: "https://www.linkedin.com/in/tyler-williams-476283101/",
    bio: "Tyler Williams is a seasoned investment professional with extensive experience in private equity and alternative investments. As a General Partner at SPLY Capital, he focuses on identifying and evaluating unique investment opportunities in the private markets. His expertise spans across deal sourcing, due diligence, and portfolio management, with a particular emphasis on off-market transactions. Tyler has built a strong network of industry relationships that enables him to access exclusive investment opportunities for SPLY Capital's investors. Prior to SPLY Capital, Tyler was a Vice President at Gauge Capital, a middle market private equity firm with $2B+ in AUM.",
    image: "/lovable-uploads/4d28451c-7efa-4856-983e-004c1c3a5142.png"
  },
  {
    name: "Omar Marquez",
    role: "General Partner",
    location: "Portland, OR",
    linkedin: "https://www.linkedin.com/in/omarquezportland/",
    bio: "Omar Marquez brings a wealth of experience in investment management and business development to SPLY Capital. As a General Partner, he specializes in identifying high-potential investment opportunities and building strategic partnerships. Omar's background includes extensive work in private markets, where he has demonstrated a strong track record of successful investments and portfolio management. His approach combines rigorous analysis with innovative thinking to uncover unique investment opportunities.",
    image: "/lovable-uploads/d4ba0cd2-04c8-44f5-9b52-bd4cca8dbacd.png"
  },
  {
    name: "Drew Leahy",
    role: "General Partner",
    location: "Ann Arbor, MI",
    linkedin: "https://www.linkedin.com/in/drewleahy/",
    bio: "Drew Leahy is a General Partner at SPLY Capital with significant experience in investment strategy and portfolio management. Previously, he served as a founding partner at Hawke Ventures ($25M AUM) and as a general partner for a New Zealand venture fund ($50M AUM). Drew has developed a comprehensive understanding of private market dynamics and maintains strong relationships within the investment community. His analytical approach and deep market knowledge contribute to SPLY Capital's ability to source and evaluate exceptional investment opportunities.",
    image: "/lovable-uploads/452e0ed4-d482-48a7-b740-0c0d3d1defc7.png"
  },
];

export const Partners = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Our Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
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
              <p className="text-gray-700 mb-6 text-sm leading-relaxed flex-grow">{partner.bio}</p>
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
      </div>
    </section>
  );
};