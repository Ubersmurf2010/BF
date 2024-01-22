import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor"; //библиотека для создания редактора
import "easymde/dist/easymde.min.css";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "../../axios";

import styles from "./AddCard.module.scss";

export const AddCard = () => {
  const { id } = useParams();
  const [text, setText] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState(""); 
  const [isLoading, setLoading] = React.useState("false");
  const inputFileRef = React.useRef(null);
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      
      setImageUrl(data.url);
      console.log(data);
 
    } catch(err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };


  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true)
      const fields = {
        title,
        imageUrl,
        text
      };

      const { data } = isEditing
      ? await axios.patch(`/cards/${id}`, fields)
      : await axios.post('/cards', fields);


      const _id = isEditing ? id : data._id;

      navigate(`/cards/${_id}`);

    } catch(err) {
      console.warn(err);
      alert("Ошибка при создании товара");
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/cards/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.imageUrl);
      }).catch( err => {
        console.warn(err);
        alert();
      });
    }
  }, []);


  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );


  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/shop" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить карточку товара
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
         </Button>
        <img className = {styles.image} src={`'http://bb-gamma-three.vercel.app'${imageUrl}`} alt="Uploaded" />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Название товара"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      
      
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained" >
          {isEditing ? 'Сохранить' : 'Опубликовать' }
        </Button>
        <a href='/'>
          <Button size="large">Отмена</Button>
          </a>
      </div>
    </Paper>
  );
};
