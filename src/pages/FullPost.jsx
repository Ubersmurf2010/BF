import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, SetLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`/posts/${id}`).then(res => {
      
      setData(res.data);
      SetLoading(false);
    }).catch((err) => {
      console.log('Ошибка при рендере статьи', err);
      alert('Ошибка при рендере статьи');
    }); 
    }, []);

    console.log(data)

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `https://bb-gamma-three.vercel.app${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
          <ReactMarkdown children={data.text} />
        </p>
      </Post>    
    </>
  );
};
