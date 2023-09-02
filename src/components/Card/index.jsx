import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { UserInfo } from "../UserInfo";


//импорты, которые необходимо пределеать
import { CardSkeleton } from "./Skeleton";
import { fetchRemoveCard } from "../../redux/slices/cards";
import styles from "./Card.module.scss";

export const Card = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  isFullCard,
  isLoading,
  isEditable,
}) => {
  
  const dispatch = useDispatch();
  if (isLoading) {
    return <CardSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить товар?')) {
      dispatch(fetchRemoveCard(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullCard })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/cards/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullCard })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullCard })}
          >
            {isFullCard ? title : <Link to={`/cards/${id}`}>{title}</Link>}
          </h2>
        </div>
      </div>
    </div>
  );
};
