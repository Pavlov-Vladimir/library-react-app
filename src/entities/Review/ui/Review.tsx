import { Stack, Text, Heading, Separator } from "@chakra-ui/react";
import { Review as ReviewType } from "@/app/store/types/entities.types";

interface ReviewProps {
  review: ReviewType;
}

export function Review({ review }: ReviewProps) {
  return (
    <>
      <Separator />
      <Stack>
        <Heading as="h4" size="lg">
          {review.reviewer}
        </Heading>
        <Text>{review.message}</Text>
      </Stack>
    </>
  );
}
