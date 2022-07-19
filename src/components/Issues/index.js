import styled from "styled-components";
import { NO_DESCRIPTION } from "../../copy";

export function Issue({ title, description, tags }) {
  return (
    <Card>
      <Title>{title}</Title>
      <Description>
        {description ? (
          description
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

const Title = styled.h2`
  font-size: 24px;
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
