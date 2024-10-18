interface Props {
  id: string;
  content: string;
  userid: string;
}

const Message = ({ content, userid }: Props) => {
  return <div>{content}</div>;
};

export default Message;
