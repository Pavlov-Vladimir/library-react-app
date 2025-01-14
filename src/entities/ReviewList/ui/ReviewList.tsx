import { Review, ReviewSchema } from "@/entities/Review";
import { Stack } from "@chakra-ui/react";

interface ReviewListProps {
  reviews: ReviewSchema[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <Stack mt='5' w='full'>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </Stack>
  );
}
