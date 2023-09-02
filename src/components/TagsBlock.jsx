import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTagsPosts } from "../redux/slices/posts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "./SideBlock";

export const TagsBlock = ({ items, isLoading = true }) => {
  const dispatch = useDispatch();
  const onClickShowTagsPosts = () => {
    dispatch(fetchTagsPosts(items[0]));
  };

  return (
    <SideBlock title="Тэги">
      <List >
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <a
            style={{ textDecoration: "none", color: "black" }}
            onClick={onClickShowTagsPosts}
          >

            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>

                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
                
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </SideBlock>
  );
};
