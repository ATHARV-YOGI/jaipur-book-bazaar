
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface LocationInputProps {
  onLocationSet: (location: string) => void;
  initialLocation?: string;
}

const LocationInput = ({ onLocationSet, initialLocation = '' }: LocationInputProps) => {
  const { currentUser, updateUserLocation } = useAuth();
  const [location, setLocation] = useState(initialLocation || currentUser?.location || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location.trim()) {
      toast({
        variant: 'destructive',
        title: 'Location required',
        description: 'Please enter your location in Jaipur',
      });
      return;
    }
    
    if (!location.toLowerCase().includes('jaipur')) {
      toast({
        title: 'Location information',
        description: 'We have added Jaipur to your location for clarity',
      });
      const updatedLocation = `${location}, Jaipur`;
      setLocation(updatedLocation);
      onLocationSet(updatedLocation);
      
      if (currentUser) {
        updateUserLocation(updatedLocation);
      }
    } else {
      onLocationSet(location);
      
      if (currentUser) {
        updateUserLocation(location);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Enter your location in Jaipur"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" className="whitespace-nowrap bg-bookBrown hover:bg-bookBrown-dark">
          Set Location
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Enter your area in Jaipur (e.g. Malviya Nagar, Vaishali Nagar)
      </p>
    </form>
  );
};

export default LocationInput;
