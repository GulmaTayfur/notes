import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import CreateNote from "./components/Form/CreateNote";
import { NoteData, RawNote, Tag } from "./types";
import { useLocaleStorage } from "./useLocaleStorage";
import { v4 } from "uuid";
import Layout from "./components/Layout";
import NoteDetail from "./components/NoteDetail";
import { useMemo } from "react";
import EditNote from "./components/Form/EditNote";

function App() {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);

  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  /*
   *Localden aldığımız notlarda etiket ismi yerine id geliyor
   *Bizim yapacağımız id'lerin herbirine karşılık gelen etiketleri bulacağız ve objeye ekleriz.
   */

  const noteWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
    [notes, tags]
  );

  const addNote = ({ tags, ...data }: NoteData) => {
    setNotes((prev) => {
      return [
        ...prev,
        {
          ...data,
          id: v4(),
          // elemanın etiketlerini dön ve diziye aktar
          tagIds: tags.map((tag) => tag.id),
        },
      ];
    });
  };

  const createTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    /*
    1.Adım: Notu alacağız
    2.Adım: Notu state'te tuttuğumuz dizideki halini bulacağız.
    3.Adım: Dizideki eski versiyonunu kaldıracağız.
    4.Adım: Yerine yeni aldığımız yeni notu koyacağız.
    */
    const updated = notes.map((note) =>
      note.id === id
        ? { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        : note
    );
    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage availableTags={tags} notes={noteWithTags} />}
        />
        <Route
          path="/new"
          element={
            <CreateNote
              onSubmit={addNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<Layout notes={noteWithTags} />}>
          <Route index element={<NoteDetail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                availableTags={tags}
                createTag={createTag}
                onSubmit={updateNote}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
