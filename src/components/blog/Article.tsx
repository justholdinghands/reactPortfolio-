import { BASE_URL, Blog } from "./Blog";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import marked from "marked";
import moment from "moment";
import styled from "styled-components";

const DivArticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${theme.blog.primary};
  padding: 0.5em;
  border-radius: 0.5em;
  box-shadow: 12px 12px 2px 1px ${theme.blog.secondary};
  padding-bottom: 3em;
  word-wrap: break-word;
  overflow: hidden;
  border-radius: 4px;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  border: solid 2px ${theme.blog.primary};
  margin: 2em;
  width: 50vw;

  h1 {
    font-size: larger;
  }
  h2 {
    font-size: large;
  }
  h3 {
    font-size: medium;
  }
`;
const DivTitle = styled.div`
  font-size: xx-large;
  line-height: 1em;
  padding: 0.2em;
  background: ${theme.blog.secondaryTextColor};
`;
const DivDate = styled.div`
  padding: 0.5em;
  color: ${theme.blog.secondaryTextColor};
  font-size: x-large;
`;

const DivWrapAuthor = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const DivAuthor = styled.div`
  padding: 0.5em;
  color: ${theme.blog.secondaryTextColor};
  font-size: x-large;
`;
const DivBody = styled.div`
  padding: 0.5em;
  font-size: small;
`;

type Props = {
  blog: Blog;
  fulltext: boolean;
};

export const Article = (props: Props) => {
  const createMarkup = () => {
    const articleBody = marked(
      props.fulltext ? props.blog.text : props.blog.text.slice(0, 200)
    );
    return {
      __html: articleBody,
    };
  };

  return (
    <div>
      <div>
        <DivArticle>
          {props.fulltext ? (
            <DivTitle>{props.blog.title}</DivTitle>
          ) : (
            <Link
              to={`${BASE_URL}${props.blog.author}/${props.blog.articleURL}`}
            >
              <DivTitle>{props.blog.title}</DivTitle>
            </Link>
          )}
          <DivDate>{moment(props.blog.date).format("DD. MM. YYYY")}</DivDate>
          <DivBody dangerouslySetInnerHTML={createMarkup()}></DivBody>
          <DivWrapAuthor>
            <DivAuthor>{props.blog.author}</DivAuthor>
          </DivWrapAuthor>
        </DivArticle>
      </div>
    </div>
  );
};
