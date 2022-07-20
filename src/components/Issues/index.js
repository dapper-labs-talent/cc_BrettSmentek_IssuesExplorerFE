import styled from "styled-components";
import commentStripper from "strip-html-comments";
import { NO_DESCRIPTION } from "../../copy";
import { ReactComponent as ClosedIcon } from "../../icons/issue-closed.svg";
import { ReactComponent as PRIcon } from "../../icons/pull-request.svg";

export function Issue({ title, description, tags, isPullRequest, isClosed }) {
  let formattedDescripton = "";

  if (description) {
    formattedDescripton = commentStripper(description);
  }

  return (
    <Card>
      <HeaderRow>
        <Title>{title}</Title>
        <IconRow>
          {isPullRequest ? <PRIcon style={{ width: "14px" }} /> : null}
          {isClosed ? <ClosedIcon style={{ width: "16px" }} /> : null}
        </IconRow>
      </HeaderRow>
      <Description>
        {formattedDescripton ? (
          formattedDescripton
        ) : (
          <NoDescription>{NO_DESCRIPTION}</NoDescription>
        )}
      </Description>
      <Grow />
      <Tags>
        {tags.map((tag, idx) => {
          return <Tag key={`tag-${idx}`}>{tag.name}</Tag>;
        })}
      </Tags>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px black solid;
  padding: 20px;
  width: 30%;
  max-width: 430px;
  aspect-ratio: 2 / 1;

  @media (max-width: 768px) {
    padding: 12px;
    width: 100%;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  padding-left: 8px;
`;

const IconRow = styled.div`
  display: flex;
  right: 22px;
  top: 4px;
  gap: 8px;
`;

const Title = styled.h2`
  font-size: 24px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Description = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    -webkit-line-clamp: 2;
    margin-bottom: 4px;
  }
`;

const NoDescription = styled.div`
  color: #999999;
`;

const Grow = styled.div`
  display: flex;
  flex: 1;
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
`;

const Tag = styled.li`
  border: 2px black solid;
  padding: 4px;
  border-radius: 6px;
  font-size: 10px;
`;
