import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

export type CreateNoteProps = {
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
  onSubmit: (data: NoteData) => void;
} & Partial<NoteData>;
/*
 *Partial sayesinde şunu yapmış olduk
 *farklı bir tyepen bütün değerlerini bu
 * "createnoteprops" typena aktardık. aynı zamanda
 *hepsi ? ile tanımlanmış gibi bazı durumlarda
 *undefined olabilir.
 */

const CreateNote = ({
  createTag,
  availableTags,
  onSubmit,
}: CreateNoteProps) => {
  return (
    <div className="container py-5">
      <h1>Yeni Not Oluştur</h1>
      <NoteForm
        createTag={createTag}
        onSubmit={onSubmit}
        availableTags={availableTags}
      />
    </div>
  );
};

export default CreateNote;
