
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img
              src="/lovable-uploads/f7a927cd-a039-40ff-82ba-7da595d28922.png"
              alt="SPLYCAPITAL"
              className="h-8 mb-4"
            />
            <p className="text-gray-600">
              Finding "best in class" deals that investors wouldn't normally have access to
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Locations</h4>
            <div className="space-y-2">
              {["Dallas, TX", "Portland, OR", "Ann Arbor, MI"].map((location) => (
                <div key={location} className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{location}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <div>
                <Link to="/LP-Splash" className="text-gray-600 hover:text-sply-purple transition-colors">
                  LP Data Room
                </Link>
              </div>
              <p className="text-gray-600">
                For general inquiries:
                <br />
                info@splycapital.com
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} SPLYCAPITAL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
