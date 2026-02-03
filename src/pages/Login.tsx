import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Key } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-sm space-y-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Key className="h-6 w-6" />
              Authentication
            </CardTitle>
            <CardDescription>
              Single Sign-On via LPU UMS Integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Future API Integration Notice */}
            <Alert>
              <Key className="h-4 w-4" />
              <AlertDescription>
                <strong>API Integration Coming Soon</strong>
                <p className="text-sm mt-2">
                  Login will be integrated with LPU UMS API for seamless single-step authentication.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  API Source: <a href="https://ums.lpu.in/" target="_blank" rel="noopener noreferrer" className="underline">ums.lpu.in</a>
                </p>
              </AlertDescription>
            </Alert>

            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Key className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">LPU UMS Integration</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Authentication will be handled through LPU&apos;s unified authentication system.
              </p>
              
              <div className="space-y-3">
                <div className="text-left text-sm">
                  <p className="font-semibold mb-2">Features:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Single Sign-On (SSO)</li>
                    <li>Automatic student data sync</li>
                    <li>Secure API-based authentication</li>
                    <li>No separate credentials needed</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Temporary Access */}
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground text-center mb-3">
                For development and testing purposes
              </p>
              <Button 
                onClick={() => navigate("/dashboard")} 
                className="w-full"
                variant="outline"
              >
                Continue to Dashboard (Dev Mode)
              </Button>
            </div>

            <div className="text-center text-sm">
              <Link to="/" className="text-muted-foreground hover:underline">
                Return to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

