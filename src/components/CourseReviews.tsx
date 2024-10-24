import React from "react";
import ReviewCard from "./ReviewCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CourseReviews = ({ reviews }: any) => {
  return (
    <div>
      <Carousel  plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]} className="w-full">
        <CarouselContent className="-ml-1">
          {reviews.map((e : any) => (
            <CarouselItem key={e} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <ReviewCard
                  key={e.id}
                  image={e.user.image}
                  content={e.content}
                  rating={e.rating}
                  fullName={e.user.fullName}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CourseReviews;
