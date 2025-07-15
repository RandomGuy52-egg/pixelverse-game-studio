import { useState } from 'react';
import { ChevronDown, LogOut, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';

const UserDropdown = () => {
  const { user, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    deleteAccount();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-secondary">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <span className="text-foreground">{user.username}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="cursor-pointer text-destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Account
        </DropdownMenuItem>
      </DropdownMenuContent>
      
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={handleDeleteAccount}
      />
    </DropdownMenu>
  );
};

export default UserDropdown;