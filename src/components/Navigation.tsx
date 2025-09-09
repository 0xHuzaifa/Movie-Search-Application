import React from 'react';
import { motion } from 'framer-motion';
import { Film, Heart, Home, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/trending', label: 'Trending', icon: TrendingUp },
    { path: '/favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect border-b border-border/20 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
          >
            <div className="hero-gradient p-2 rounded-lg">
              <Film className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold glow-text">MovieSearch</span>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              
              return (
                <Button
                  key={path}
                  variant={isActive ? "default" : "ghost"}
                  className={`relative transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-glow' 
                      : 'hover:bg-primary/10 hover:text-primary'
                  }`}
                  onClick={() => navigate(path)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};