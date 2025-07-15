import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Plus, Coins, ArrowLeft, Upload } from 'lucide-react';
import Logo from '@/components/Logo';
import UserDropdown from '@/components/UserDropdown';
import { useAuth } from '@/contexts/AuthContext';

const Create = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo size="sm" onClick={() => navigate('/home')} />
            
            <nav className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/marketplace')}
                className="flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Marketplace
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => navigate('/create')}
                className="flex items-center gap-2 bg-secondary"
              >
                <Plus className="w-4 h-4" />
                Create
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg">
              <Coins className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">{user?.currency || 0}</span>
            </div>
            <UserDropdown />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/home')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Create Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:bg-secondary/50 transition-colors cursor-pointer">
            <CardHeader className="text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-foreground">Publish New Game</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Upload and publish your game to the platform
              </p>
              <Button className="w-full">
                Start Publishing
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:bg-secondary/50 transition-colors cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                📊
              </div>
              <CardTitle className="text-foreground">Analytics</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                View statistics for your published games
              </p>
              <Button variant="secondary" className="w-full">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:bg-secondary/50 transition-colors cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                🎮
              </div>
              <CardTitle className="text-foreground">My Games</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Manage your published games
              </p>
              <Button variant="secondary" className="w-full">
                Manage Games
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Create;