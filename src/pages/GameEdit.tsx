import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useAuth, Badge } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const GameEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getGameById, updateGame } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  
  const [badges, setBadges] = useState<Badge[]>([]);
  const [newBadge, setNewBadge] = useState({
    name: '',
    description: '',
    icon: ''
  });

  useEffect(() => {
    if (id) {
      const game = getGameById(id);
      if (game) {
        setFormData({
          name: game.name,
          description: game.description
        });
        setBadges(game.badges);
      }
    }
  }, [id, getGameById]);

  const handleAddBadge = () => {
    if (newBadge.name && newBadge.description && newBadge.icon) {
      setBadges([...badges, {
        id: Date.now().toString(),
        ...newBadge
      }]);
      setNewBadge({ name: '', description: '', icon: '' });
    }
  };

  const handleRemoveBadge = (badgeId: string) => {
    setBadges(badges.filter(badge => badge.id !== badgeId));
  };

  const handleSave = () => {
    if (!formData.name || !formData.description || !id) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    updateGame(id, {
      name: formData.name,
      description: formData.description,
      badges
    });

    toast({
      title: "Game Updated!",
      description: `${formData.name} has been updated successfully.`,
    });

    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/create')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Create
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Edit Game</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Game Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name">Game Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter game name"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your game"
                  rows={4}
                />
              </div>

              <div>
                <Label>Badges</Label>
                <div className="space-y-4">
                  {badges.map((badge) => (
                    <div key={badge.id} className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                      <span className="text-2xl">{badge.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold">{badge.name}</h4>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveBadge(badge.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="space-y-3 p-3 border border-dashed border-border rounded-lg">
                    <div className="grid grid-cols-3 gap-3">
                      <Input
                        placeholder="Badge name"
                        value={newBadge.name}
                        onChange={(e) => setNewBadge({...newBadge, name: e.target.value})}
                      />
                      <Input
                        placeholder="Icon (emoji)"
                        value={newBadge.icon}
                        onChange={(e) => setNewBadge({...newBadge, icon: e.target.value})}
                      />
                      <Button onClick={handleAddBadge} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Badge description"
                      value={newBadge.description}
                      onChange={(e) => setNewBadge({...newBadge, description: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className="w-full" size="lg">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameEdit;