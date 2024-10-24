import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, StarHalf } from "lucide-react";

interface ReviewCardProps {
  fullName: string;
  content: string;
  rating: number;
  image: string;
}

const ReviewCard = ({ fullName, image, content, rating }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar >
          <AvatarImage src={image} alt={fullName} />
          <AvatarFallback>
            {fullName.split(" ").map((e) => e[0])}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{fullName}</h3>
          <div className="flex" aria-label={`Rating: ${rating} out of 5 stars`}>
            {renderStars(rating)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-40">
        <p className="text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
