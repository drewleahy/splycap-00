
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user, resetPassword, sendPasswordResetEmail } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Password reset states
  const [isResetMode, setIsResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordResetDialogOpen, setPasswordResetDialogOpen] = useState(false);
  const [passwordResetEmail, setPasswordResetEmail] = useState("");

  useEffect(() => {
    console.log("Auth component mounted", { location });
    
    // Check URL for recovery token
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get('type');
    const token = searchParams.get('token');
    
    if (type === 'recovery' && token) {
      console.log("Found recovery token in URL, enabling reset mode");
      setIsResetMode(true);
    } else {
      console.log("No recovery token found in URL");
      if (user) {
        console.log("User is logged in, redirecting to dashboard");
        navigate("/venturepartners/dashboard");
      }
    }
    
    // Check URL for error parameters
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error) {
      console.error("Auth error from URL:", error, errorDescription);
      setAuthError(`Authentication error: ${errorDescription || error}`);
    }
  }, [user, navigate, location]);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    if (newPassword !== confirmPassword) {
      setAuthError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Submitting password reset");
      await resetPassword(newPassword);
      toast({
        title: "Password reset successful",
        description: "You can now sign in with your new password.",
      });
      setIsResetMode(false);
      navigate("/venturepartners/auth");
    } catch (error: any) {
      console.error("Password reset failed:", error);
      setAuthError(error.message || "An error occurred during password reset.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendPasswordResetEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await sendPasswordResetEmail(passwordResetEmail);
      setPasswordResetDialogOpen(false);
    } catch (error) {
      console.error("Failed to send password reset email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      await signIn(email, password);
      const { data: profile } = await supabase
        .from("profiles")
        .select("status")
        .eq("id", user?.id)
        .maybeSingle();

      if (profile?.status === "pending") {
        setPendingApproval(true);
        return;
      } else if (profile?.status === "rejected") {
        throw new Error("Your application has been rejected");
      }

      navigate("/venturepartners/dashboard");
    } catch (error: any) {
      console.error("Sign in failed:", error);
      setAuthError(error.message);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("signupEmail") as string;
    const password = formData.get("signupPassword") as string;
    
    try {
      await signUp(email, password, firstName, lastName);
      setPendingApproval(true);
      toast({
        title: "Sign up successful",
        description: "Your account has been created and is pending approval.",
      });
    } catch (error: any) {
      setAuthError(error.message);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenResetPasswordDialog = () => {
    setPasswordResetDialogOpen(true);
  };

  // Add signOut function
  const signOut = async () => {
    await supabase.auth.signOut();
    setPendingApproval(false);
    setAuthError(null);
  };

  if (pendingApproval) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Application Pending</h2>
          <p className="text-gray-600 text-center mb-4">
            Your application is currently under review. You will be notified once it has been approved.
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={signOut}
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (isResetMode) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">SPLY CAPITAL</h1>
            <p className="text-gray-600 mt-2">Reset Your Password</p>
          </div>
          
          {authError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Set New Password</CardTitle>
              <CardDescription>
                Please enter and confirm your new password.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordReset}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="text-sm font-medium">
                    New Password
                  </label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Resetting Password..." : "Reset Password"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">SPLY CAPITAL</h1>
          <p className="text-gray-600 mt-2">Venture Partner Portal</p>
        </div>
        
        {authError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access the venture partner portal.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email" 
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <button 
                        type="button" 
                        onClick={handleOpenResetPasswordDialog}
                        className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create a new account to join as a venture partner.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signupEmail" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="signupEmail"
                      name="signupEmail"
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signupPassword" className="text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id="signupPassword"
                      name="signupPassword"
                      type="password"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        terms and conditions
                      </a>
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Password Reset Dialog */}
      <Dialog open={passwordResetDialogOpen} onOpenChange={setPasswordResetDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a password reset link.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendPasswordResetEmail}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="resetEmail" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="resetEmail"
                  type="email"
                  placeholder="name@example.com"
                  value={passwordResetEmail}
                  onChange={(e) => setPasswordResetEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setPasswordResetDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
