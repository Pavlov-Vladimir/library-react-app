import { Stack, Text, Heading, Separator } from "@chakra-ui/react";
import { ReviewSchema } from "../model/types/reviewSchema";

interface ReviewProps {
  review: ReviewSchema;
}

export function Review({ review }: ReviewProps) {
  return (
    <>
      <Separator />
      <Stack>
        <Heading as="h4" size='lg'>{review.reviewer}</Heading>
        <Text>{review.message}</Text>
      </Stack>
    </>
  );
}
