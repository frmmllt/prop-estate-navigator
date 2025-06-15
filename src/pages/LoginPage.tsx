
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Lock, LogIn, ShieldOff } from "lucide-react";
import { useApiLogin } from "@/hooks/useApiAuth";
import { z } from "zod";

// Validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

const sanitizeEmail = (str: string) =>
  str.replace(/[<>"'&]/g, "_"); // simple neutralisation

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loginMutation = useApiLogin();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInputError(null);

    const safeEmail = sanitizeEmail(email);

    const parse = loginSchema.safeParse({ email: safeEmail, password });
    if (!parse.success) {
      setInputError(parse.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    try {
      await loginMutation.mutateAsync({ email: safeEmail, password });
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur PropEstateNavigator",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error?.response?.data?.message || "Une erreur est survenue lors de la connexion.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-real-blue/10 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-real-blue/10 p-4">
              <Lock className="h-10 w-10 text-real-blue" />
            </div>
          </div>
          <CardTitle className="text-2xl">PropEstateNavigator</CardTitle>
          <CardDescription>Connectez-vous pour accéder à la plateforme</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} autoComplete="off">
          <CardContent className="space-y-4">
            {inputError && (
              <div className="p-2 rounded bg-red-100 text-sm text-red-700">{inputError}</div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-start gap-2 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <ShieldOff className="text-yellow-600 mt-1" size={20} />
              <span className="text-xs text-yellow-800">
                <strong>Attention :</strong> Cette page de connexion est une démo purement front-end.<br />
                <b>Ne jamais utiliser de vrais identifiants ou mots de passe !</b><br />
                Les informations ne sont pas sécurisées, tout comme la mémorisation locale.
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                "Connexion en cours..."
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Se connecter
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;

