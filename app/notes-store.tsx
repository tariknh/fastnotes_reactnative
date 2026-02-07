import { create } from "zustand";

export type Note = {
  id: string;
  title: string;
  description: string;
};

type NotesState = {
  notes: Note[];
  getNoteById: (id: string) => Note | undefined;
  updateNote: (id: string, updates: Partial<Pick<Note, "title" | "description">>) => void;
    addNote: (note: Note) => void;
};

const initialNotes: Note[] = [
  {
    id: "1",
    title: "Sjekke om hunden sover",
    description:
      "Veldig viktig å sjekke om hunden sover. Hvis hunden ikke sover så må man finne en løsning",
  },
  {
    id: "2",
    title: "Vekke hunden",
    description: "Hvis hunden sover må man vekke hunden",
  },
];

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: initialNotes,
  getNoteById: id => get().notes.find(note => note.id === id),
  addNote: (note: Note) => {
    set(state => ({
      notes: [...state.notes, note],
    }));
  },
  updateNote: (id, updates) => {
   
    console.log("Updating note", id, updates);

    set(state => ({
      notes: state.notes.map(note =>
        note.id === id ? { ...note, ...updates } : note
      ),
    }));
  },
}));
