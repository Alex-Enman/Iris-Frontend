import { Star, MapPin, BadgeCheck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProducerCardProps {
  name: string;
  image: string;
  distance: string;
  rating: number;
  verified?: boolean;
  category?: string;
  onClick?: () => void;
}

export function ProducerCard({
  name,
  image,
  distance,
  rating,
  verified = false,
  category,
  onClick,
}: ProducerCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-250 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-250 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-250 group-hover:opacity-100" />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="flex-1">{name}</h3>
          {verified && (
            <BadgeCheck className="ml-2 h-5 w-5 flex-shrink-0 text-primary" />
          )}
        </div>
        {category && (
          <p className="mb-3 text-sm text-muted-foreground">{category}</p>
        )}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{distance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
