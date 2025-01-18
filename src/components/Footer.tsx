import { MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-sply-dark text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img
              src="/lovable-uploads/f7a927cd-a039-40ff-82ba-7da595d28922.png"
              alt="SPLYCAPITAL"
              className="h-8 mb-4"
            />
            <p className="text-gray-400">
              Finding "best in class" deals that investors wouldn't normally have access to
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Locations</h4>
            <div className="space-y-2">
              {["Dallas, TX", "Portland, OR", "Ann Arbor, MI"].map((location) => (
                <div key={location} className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{location}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">
              For general inquiries:
              <br />
              info@splycapital.com
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SPLYCAPITAL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};