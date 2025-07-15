import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const { giveUserCurrency } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [giveMoneyForm, setGiveMoneyForm] = useState({
    username: '',
    amount: ''
  });

  const handleGiveMoney = () => {
    const amount = parseInt(giveMoneyForm.amount);
    if (!giveMoneyForm.username || isNaN(amount)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid username and amount.",
        variant: "destructive",
      });
      return;
    }

    const success = giveUserCurrency(giveMoneyForm.username, amount);
    if (success) {
      toast({
        title: "Success!",
        description: `Gave ${amount} coins to ${giveMoneyForm.username}.`,
      });
      setGiveMoneyForm({ username: '', amount: '' });
    } else {
      toast({
        title: "Error",
        description: "User not found or operation failed.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 left-4 w-10 h-10 rounded-full p-0 font-bold"
        >
          P
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Panel</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Give Money</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={giveMoneyForm.username}
                  onChange={(e) => setGiveMoneyForm({...giveMoneyForm, username: e.target.value})}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={giveMoneyForm.amount}
                  onChange={(e) => setGiveMoneyForm({...giveMoneyForm, amount: e.target.value})}
                  placeholder="Enter amount"
                />
              </div>
              <Button onClick={handleGiveMoney} className="w-full">
                Activate
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;