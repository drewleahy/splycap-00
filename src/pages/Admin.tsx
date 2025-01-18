import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { InvestmentFocus, Partner, PastInvestment, ContentSection } from "@/types/cms";

const Admin = () => {
  const [session, setSession] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Button
          onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
        >
          Sign in with Google
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Content Management System</h1>
      
      {/* Add your content management forms here */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Investment Focus</h2>
          {/* Add investment focus management */}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Partners</h2>
          {/* Add partner management */}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Past Investments</h2>
          {/* Add past investments management */}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Content Sections</h2>
          {/* Add content sections management */}
        </section>
      </div>
    </div>
  );
};

export default Admin;