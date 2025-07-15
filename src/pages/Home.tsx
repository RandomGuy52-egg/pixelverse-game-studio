import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Plus, Coins } from 'lucide-react';
import Logo from '@/components/Logo';
import UserDropdown from '@/components/UserDropdown';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      name: 'Test Site 1',
      image: '/placeholder.svg'
    }
  ];

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
                className="flex items-center gap-2"
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
        {/* Player Info */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto mb-4">
            {user?.username.charAt(0).toUpperCase() || 'U'}
          </div>
          <h1 className="text-2xl font-bold text-foreground">{user?.username || 'Player'}</h1>
        </div>

        {/* Games Section */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <Card 
                key={game.id} 
                className="cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => navigate(`/game/${game.id}`)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-secondary rounded-lg mb-3 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                      T1
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground text-center">{game.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;