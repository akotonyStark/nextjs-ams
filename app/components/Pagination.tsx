import { Button, HStack, Spacer } from "@chakra-ui/react";

const Pagination = (props: any) => {
  const { pages, pageIndex, totalNumberOfPages, setpageIndex } = props;

  const handleNext = () => {
    setpageIndex((page: number) => page + 1);
  };

  const handlePrev = () => {
    setpageIndex((page: number) => page - 1);
  };

  return (
    <HStack>
      <div>
        Page {pageIndex + 1} of {totalNumberOfPages}
      </div>
      <Spacer />
      <span>
        <Button isDisabled={pageIndex < 1} onClick={handlePrev}>Prev</Button>{" "}
        {pages?.map((page: number) => (
          <span
            key={page}
            style={{ cursor: "pointer" }}
            onClick={() => setpageIndex(page)}
          >
            {page + 1} |{" "}
          </span>
        ))}
        <Button isDisabled={pageIndex == totalNumberOfPages-1} onClick={handleNext}>Next</Button>
      </span>
    </HStack>
  );
};

export default Pagination;
