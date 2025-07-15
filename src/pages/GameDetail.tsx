import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Plus, Coins, ArrowLeft, Play, ThumbsUp, ThumbsDown, Award, Server } from 'lucide-react';
import Logo from '@/components/Logo';
import UserDropdown from '@/components/UserDropdown';
import { useAuth } from '@/contexts/AuthContext';

const GameDetail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [likes, setLikes] = useState(42);
  const [dislikes, setDislikes] = useState(3);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);

  const game = {
    id: 1,
    name: 'Test Site 1',
    description: 'An amazing test game with lots of fun features!'
  };

  const handleVote = (type: 'like' | 'dislike') => {
    if (userVote === type) {
      // Remove vote
      if (type === 'like') setLikes(likes - 1);
      else setDislikes(dislikes - 1);
      setUserVote(null);
    } else {
      // Change or add vote
      if (userVote === 'like') {
        setLikes(likes - 1);
        setDislikes(dislikes + 1);
      } else if (userVote === 'dislike') {
        setDislikes(dislikes - 1);
        setLikes(likes + 1);
      } else {
        if (type === 'like') setLikes(likes + 1);
        else setDislikes(dislikes + 1);
      }
      setUserVote(type);
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
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/home')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              {/* Game Logo */}
              <div className="w-32 h-32 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-4xl mx-auto mb-6">
                T1
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">{game.name}</h1>
              
              {/* Play Button */}
              <Button size="lg" className="mb-6 text-lg px-8 py-4 h-auto">
                <Play className="w-6 h-6 mr-2" />
                Play Game
              </Button>
              
              {/* Like/Dislike Buttons */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <Button 
                  variant={userVote === 'like' ? 'default' : 'outline'}
                  onClick={() => handleVote('like')}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="w-4 h-4" />
                  {likes}
                </Button>
                
                <Button 
                  variant={userVote === 'dislike' ? 'destructive' : 'outline'}
                  onClick={() => handleVote('dislike')}
                  className="flex items-center gap-2"
                >
                  <ThumbsDown className="w-4 h-4" />
                  {dislikes}
                </Button>
              </div>
              
              {/* Additional Buttons */}
              <div className="flex items-center justify-center gap-4">
                <Button variant="secondary" className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Badges
                </Button>
                
                <Button variant="secondary" className="flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Servers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GameDetail;