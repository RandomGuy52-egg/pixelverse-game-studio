interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const Logo = ({ size = 'md', onClick, className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-20 h-20 text-4xl'
  };

  return (
    <div 
      className={`${sizeClasses[size]} bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors ${className}`}
      onClick={onClick}
    >
      AJ
    </div>
  );
};

export default Logo;