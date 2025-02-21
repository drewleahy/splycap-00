
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Agreements = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/LP-Splash">
            <Button variant="ghost" className="mb-4">
              ← Back to Data Room
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold text-sply-dark mb-6">LP Agreements</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600">Content coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agreements;
