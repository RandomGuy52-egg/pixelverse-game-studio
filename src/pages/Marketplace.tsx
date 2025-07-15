import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Plus, Coins, ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';
import UserDropdown from '@/components/UserDropdown';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Marketplace = () => {
  const { user, updateCurrency } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const items = [
    {
      id: 1,
      name: 'Teapot',
      price: 10,
      icon: '🫖'
    }
  ];

  const handlePurchase = (item: typeof items[0]) => {
    if (!user) return;
    
    if (user.currency >= item.price) {
      updateCurrency(-item.price);
      toast({
        title: "Purchase Successful!",
        description: `You bought ${item.name} for ${item.price} coins.`,
      });
    } else {
      toast({
        title: "Insufficient Funds",
        description: `You need ${item.price} coins to buy this item.`,
        variant: "destructive",
      });
    }
  };

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
                className="flex items-center gap-2 bg-secondary"
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
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/home')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="hover:bg-secondary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="text-6xl mb-2">{item.icon}</div>
                <CardTitle className="text-foreground">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Coins className="w-5 h-5 text-primary" />
                  <span className="text-lg font-bold text-foreground">{item.price}</span>
                </div>
                <Button 
                  onClick={() => handlePurchase(item)}
                  disabled={!user || user.currency < item.price}
                  className="w-full"
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;