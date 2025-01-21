import { Review } from "@/entities/Review";
import { Review as ReviewType } from "@/app/store/types/entities.types";
import { Stack } from "@chakra-ui/react";

interface ReviewListProps {
  reviews: ReviewType[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <Stack mt="5" w="full">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </Stack>
  );
}
