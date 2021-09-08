import React from "react";
import Carousel from "react-material-ui-carousel";

interface StatsCarouselProps {
  items: React.ReactNode[];
}
export default function StatsCarousel({ items }: StatsCarouselProps) {
  return <Carousel>{items}</Carousel>;
}
