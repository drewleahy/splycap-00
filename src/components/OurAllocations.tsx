export const OurAllocations = () => {
  const logos = [
    {
      src: "/lovable-uploads/4c197ce4-4071-49a5-af43-b0014a013104.png",
      alt: "Postscript Logo"
    },
    {
      src: "/lovable-uploads/946aa284-7968-4b81-97d2-f2ac59b38050.png",
      alt: "Nanotronics Logo"
    },
    {
      src: "/lovable-uploads/c8408217-6c9d-46e1-8f77-bfaaafda0992.png",
      alt: "Klear Logo"
    },
    {
      src: "/lovable-uploads/4d34521a-ea49-4a2b-b987-dcc2d7d4a685.png",
      alt: "Hammerspace Logo"
    },
    {
      src: "/lovable-uploads/4588b3a9-0bcc-4af2-9fe2-fe1c586a4712.png",
      alt: "Blink Health Logo"
    },
    {
      src: "/lovable-uploads/d5fca2ae-c2c1-46df-814c-344b23552c49.png",
      alt: "Superfiliate Logo"
    },
    {
      src: "/lovable-uploads/04fd2081-a49d-4fc9-ba7d-659e52a0a3fc.png",
      alt: "Legacy EV Logo"
    },
    {
      src: "/lovable-uploads/075f4cf1-45a4-4851-b90d-49b0f1d6ac0e.png",
      alt: "Axel Automotive Logo"
    },
    {
      src: "/lovable-uploads/ac5dd086-8744-449a-820b-8fb756702589.png",
      alt: "Ondas Logo"
    },
    {
      src: "/lovable-uploads/0cad8683-488e-4792-af7f-754928cabaf9.png",
      alt: "Psionic Logo"
    },
    {
      src: "/lovable-uploads/ebde123b-be23-4a30-852c-3f81783c1bca.png",
      alt: "Parcel Logo"
    },
    {
      src: "/lovable-uploads/efced77d-4224-4349-9764-eea14d72867d.png",
      alt: "Qualtik Logo"
    },
    {
      src: "/lovable-uploads/0adce2c0-3c4c-4939-9e79-e9ba43cdfce7.png",
      alt: "Facteus Logo"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Our Allocations</h2>
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600 leading-relaxed">
            Over the past two decades, our partners have allocated to a host of top performing deals. 
            Including personal investments, venture capital funds, SPVs, and other private investments, 
            SPLYCAP has placed tens of millions of private capital
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="w-full h-32 flex items-center justify-center p-4 bg-white rounded-lg transition-transform hover:scale-105"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-xl text-gray-600 italic">And many more...</p>
        </div>
      </div>
    </section>
  );
};