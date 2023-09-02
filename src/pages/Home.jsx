import React from "react";
import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fetchPosts, fetchNewPosts, fetchPopularPosts, fetchTags } from "../redux/slices/posts";
import { Post } from "../components/Post";
import Grid from "@mui/material/Grid";
import { CommentsBlock } from "../components/CommentsBlock";
import { TagsBlock } from "../components/TagsBlock";




export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags} = useSelector((state) => state.posts);
  const isPostsLoading = (posts.status === 'loading');
  const isTagsLoading = (tags.status === 'loading');
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [] );

  

  // имена компонентов React должны начинаться с заглавной буквы.
  //Это связано с тем, что React рассматривает компоненты, начинающиеся со строчной буквы, как теги DOM.
  
  const OnClickShowNew = () => {
    dispatch(fetchNewPosts());
  };

  const OnClickShowPopular = () => {
    dispatch(fetchPopularPosts());
  };

  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  return (
    <>

      <Tabs
        style={{ marginBottom: 10 }}
        value={currentTabIndex}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="primary"
      >
        <Tab onClick={OnClickShowNew} label="Новые" />
        <Tab onClick={OnClickShowPopular} label="Популярные" />
        <Tab label='Статьи' />
        <Tab label='Привелегии' />
      </Tabs>

      {/* TAB 1 Contents */}
      {currentTabIndex === 0 && (
        <Box sx={{ p: 3 }}>
          <Typography variant='h5' >Отсортировано по дате добавления</Typography>
          <Typography variant='p'>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
finibus odio eget orci bibendum, ac hendrerit mi porta. Nullam
volutpat libero tempus leo lacinia ornare. In hac habitasse platea
dictumst. Pellentesque facilisis ex eget vulputate tincidunt.
Curabitur fringilla ultrices commodo.
          </Typography>
        </Box>
      )}
 
      {/* TAB 2 Contents */}
      {currentTabIndex === 1 && (

        <Box sx={{ p: 3 }}>
          <Typography variant='h5'>Отсортировано по популярности</Typography>
          <Typography variant='p'>
Lorem Ipsum is simply dummy text of the printing and typesetting
industry. Lorem Ipsum has been the industry's standard dummy text
ever since the 1500s, when an unknown printer took a galley of type
and scrambled it to make a type specimen book.
          </Typography>
        </Box>
      )}
 
      {/* TAB 3 Contents */}
      {currentTabIndex === 2 && (
        <Box sx={{ p: 3 }}>
          <Typography variant='h5'>Конструктор </Typography>
          <Typography variant='p'>
            Описание статьи
          </Typography>
        </Box>
      )}
 
      {/* TAB 4 Contents */}
      {currentTabIndex === 3 && (
        <Box sx={{ p: 3 }}>
          <Typography variant='h5'>База данных </Typography>
          <Typography variant='p'>
            Здесь будет собрана вся информация
          </Typography>
        </Box>
      )}
      
      <Grid container spacing={2}>
      <Grid container xs={8} item spacing={2}>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
          (isPostsLoading ) ? (<Post
            key={index}
            isLoading={true} />
            ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData ?._id === obj.user._id}
            />
          ),
          )}
        </Grid>
        <Grid xs >
          <TagsBlock
            items={tags.items}
            isLoading={isTagsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
