
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
];

const horizontalPartners = [
  {
    name: "Tristan Schaeffer",
    role: "Venture Partner",
    location: "Chicago, IL",
    linkedin: "https://www.linkedin.com/in/tristanschaeff/",
    bio: "Tristan Schaeffer is a seasoned operator and investor, currently serving as a strategic Venture Partner at SPLYCAP and the Founding Managing Partner at Worldview. A serial entrepreneur, Tristan successfully exited his first company at just 22 and has since built a distinguished career driving growth, forging strategic partnerships, and creating transformative value across multiple sectors.\n\nA recognized leader in the Heartland Economy, Tristan has achieved two successful exits, built a $120M+ credit portfolio, and played a pivotal role in tripling revenue at a nationally leading nonprofit. He has also spearheaded numerous strategic initiatives for some of the nation's largest brands, organizations, and political leaders.\n\nWith an extensive network and deep expertise in the venture ecosystem, Tristan excels at identifying and capitalizing on exceptional investment opportunities, delivering outsized value to SPLYCAP's investor network.",
    image: "/lovable-uploads/7324186b-c059-42d6-9532-5edc7d9e716d.png"
  },
  {
    name: "Michael Challinger",
    role: "Venture Partner",
    location: "New York, NY",
    linkedin: "https://www.linkedin.com/in/mchallinger",
    bio: "Michael Challinger is a seasoned C-suite executive in consumer e-retail and brands across multiple verticals. His career spans two decades of leadership roles driving high growth outcomes, beginning with Build.com's journey from seven figures in eComm revenue to north of $1B (now under public parent Ferguson - FERG).\n\nMichael most recently served as CEO of Houzer, a legacy kitchenware brand where he drove digital transformation toward direct-to-consumer and omnichannel capabilities. In addition to his last two roles leading companies, Michael has increasingly pursued advisor and investor opportunities.\n\nAs a Venture Partner at SPLYCAP, Michael brings deep subject matter expertise and an operator-centric approach to catalyze companies transforming the future of commerce. He hopes to bring his extensive network to bear both in allocating to SPLY's investments and facilitating their continued growth.",
    image: "/lovable-uploads/282978ab-1206-4497-90c2-3ba6c6d12dcd.png"
  },
  {
    name: "Vishnupriya R. Bohra",
    role: "Venture Partner",
    location: "Dubai, UAE",
    linkedin: "https://www.linkedin.com/in/vishnupriya-bohra/",
    bio: `Trinity SFO is a Dubai-based single-family office with deep roots in real estate and alternative investments, lead by Vishnupriya R. Bohra. The Bohra family was among the earliest underwriters in Dubai's real estate boom, underwriting AED 8 billion across 13 towers between 2006 and 2007. Over time, the family expanded into public markets and private equity, including a successful early investment in India's National Stock Exchange in 2017.

A graduate of UCLA with Phi Beta Kappa honors in Econometrics & Quantitative Economics, Vishnupriya brings a research-driven, values-led approach to investing. She began her career in M&A at a boutique investment bank before joining her family's investment business. During her time in Los Angeles, she also launched a startup and led community events focused on conscious living.

Trinity SFO works selectively with venture funds and investment platforms as a distribution partner across the GCC and India. With close ties to the Indian UHNI community in the UAE, Trinity introduces high-conviction investors to pre-IPO and alternative investment opportunities—playing a trusted, strategic role in bridging capital with global innovation.`,
    image: "/lovable-uploads/2d33db90-72e3-4386-91fc-76821dc65dc1.png",
  },
  {
    name: "Manny Larcher",
    role: "Venture Partner",
    location: "Columbus, OH",
    linkedin: "https://www.linkedin.com/in/mannylarcher/",
    bio: `Manny Larcher has dedicated his career empowering businesses. After exiting a venture backed startup to a global healthcare services and products company, he cofounded a highly sought out consulting firm, supporting clients through 7, 8, and 9 figure exits. 

During the pandemic, he launched Colaeb, a software company which 10x access to resources, supporting thousands of businesses worldwide. His work connecting early-stage technology companies with critical funding has had a meaningful impact to Ohio's tech ecosystem, his home state.

Manny has received endorsement from organizations like Social Justice Awards and the Better Business Bureau, an affable speaker at numerous Universities and industry events, connecting with leaders and mentoring the next generation. `,
    image: "/lovable-uploads/1f3af4bf-0d62-4977-ad4e-fb50c0bb64e4.png",
  },
];

export const Partners = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Our Partners</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
        
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          {horizontalPartners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.2 }}
              className={`bg-white p-8 rounded-lg shadow-sm ${isMobile ? 'text-center flex flex-col' : 'flex flex-col md:flex-row items-center md:items-start gap-8'}`}
            >
              {isMobile ? (
                <>
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <img 
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{partner.name}</h3>
                  <p className="text-gray-600 mb-4">{partner.role}</p>
                  <p className="text-gray-700 mb-6 text-sm leading-relaxed whitespace-pre-line">{partner.bio}</p>
                  <p className="text-gray-800 mb-4">{partner.location}</p>
                  <a
                    href={partner.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-32 h-32 mb-6 rounded-full overflow-hidden">
                      <img 
                        src={partner.image}
                        alt={partner.name}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{partner.name}</h3>
                    <p className="text-gray-600 mb-4">{partner.role}</p>
                    <p className="text-gray-800 mb-4">{partner.location}</p>
                    <a
                      href={partner.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{partner.bio}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
