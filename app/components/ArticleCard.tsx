import { Avatar, Badge, Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Article } from "../pages/Articles";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

type PropTypes = {
  article: Article;
  onOpen: () => void;
  onOpenEdit: () => void;
  setSelectedArticle: React.Dispatch<React.SetStateAction<Article | null>>;
};

const ArticleCard = ({
  article,
  onOpen,
  onOpenEdit,
  setSelectedArticle,
}: PropTypes) => {
  const handleDelete = () => {
    onOpen();
  };

  const handleUpdate = () => {
    onOpenEdit();
  };

  return (
    <Box
      maxH={500}
      key={article.id}
      className="article"
      onClick={() => setSelectedArticle(article)}
    >
      <Box
        style={{
          fontWeight: 600,
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Flex>
          <Avatar src={""} bg={"gold"} name={article?.userId} />

          <Flex direction={"column"} ml={4}>
            <span>{article?.title.split(" ").slice(0, 3).join(" ")}</span>
            <span style={{ fontSize: 12, fontWeight: 300 }}>
              {new Date(article.dateOfPublication).toDateString()}
            </span>
          </Flex>
        </Flex>

        <Box>
          <Button
            title="Edit"
            size={"sm"}
            color={"blue"}
            as={EditIcon}
            onClick={handleUpdate}
          ></Button>{" "}
          <Button
            title="Delete"
            as={DeleteIcon}
            size={"sm"}
            color={"red"}
            onClick={handleDelete}
          ></Button>
        </Box>
      </Box>

      <Box maxH={400} overflowY={"auto"}>
        <blockquote data-testid="article-content">{article?.body}</blockquote>

        <Stack direction="row" mt={5} wrap={"wrap"}>
          {article.tags?.map((tag) => (
            <Badge key={tag.id}>{tag.label}</Badge>
          ))}
        </Stack>
        <div style={{ marginTop: 20, fontSize: 14, color: "teal" }}>
          {"~"}
          <i>
            <em>{article?.userId}</em>
          </i>
        </div>
      </Box>
    </Box>
  );
};

export default ArticleCard;
