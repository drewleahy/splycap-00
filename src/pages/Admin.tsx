import { WealthPerspectiveEditor } from "@/components/admin/WealthPerspectiveEditor";
import { PartnersEditor } from "@/components/admin/PartnersEditor";
import { CTAEditor } from "@/components/admin/CTAEditor";
import { FooterEditor } from "@/components/admin/FooterEditor";

const Admin = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>
      <div className="space-y-8">
        <WealthPerspectiveEditor />
        <PartnersEditor />
        <CTAEditor />
        <FooterEditor />
      </div>
    </div>
  );
};

export default Admin;