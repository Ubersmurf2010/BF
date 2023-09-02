import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { CommentsBlock } from "../components/CommentsBlock";


//импорты, которые подлежат замене
import { fetchCard } from "../redux/slices/cards";
import { Card } from "../components/Card";

export const ShopVitrin = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.data);
    const { cards } = useSelector((state) => state.cards);
    const isCardLoading = (cards.status === 'loading');
 
    React.useEffect(() => {
        dispatch(fetchCard());
    }, [] );

    return (
        <>
        <Tabs
          style={{ marginBottom: 15 }}
          value={0}
          aria-label="basic tabs example"
        >
          <Tab label="Новые" />
          <Tab label="Популярные" />
        </Tabs>
        
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6} md={8}>
                {(isCardLoading ? [...Array(5)] : cards.items).map((cardObj, index) => 
                isCardLoading ? (<Card
                key={index}
                isLoading={true} />
            ) : (
                <Card
                id={cardObj._id}
                title={cardObj.title}
                imageUrl={cardObj.imageUrl ? `${procces.env.REACT_APP_API_URL}${cardObj.imageUrl}` : ''}
                user={cardObj.user}
                createdAt={cardObj.createdAt}
                isEditable={userData ?._id === cardObj.user._id}
              />
            ),
            )}
          </Grid>

            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: "Вася Пупкин",
                    avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                  },
                  text: "Это тестовый комментарий",
                },
                {
                  user: {
                    fullName: "Иван Иванов",
                    avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                  },
                  text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                },
              ]}
              isLoading={false}
            />
          </Grid>

      </>
);
};
