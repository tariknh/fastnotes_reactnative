import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { useNotesStore } from "../notes-store";

export default function NoteDetailed() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const noteId = Array.isArray(id) ? id[0] : id;
  const updateNote = useNotesStore(state => state.updateNote);
  const note = useNotesStore(state =>
    noteId ? state.notes.find(item => item.id === noteId) : undefined
  );

  if (!noteId) {
    if (__DEV__) {
      console.warn("[note] Missing note id", { id });
    }
    return (
      <View style={{ padding: 16 }}>
        <Text>Missing note id.</Text>
        <Button title="Tilbake" onPress={() => router.back()} />
      </View>
    );
  }

  if (!note) {
    if (__DEV__) {
      console.warn("[note] Note not found", { noteId });
    }
    return (
      <View style={{ padding: 16 }}>
        <Text>Fant ikke notat.</Text>
        <Button title="Tilbake" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Rediger notat</Text>

      <TextInput
        placeholder="Tittel"
        autoFocus={true}
        value={note.title}
        onChangeText={title => updateNote(note.id, { title })}
        style={{ borderWidth: 1, borderColor: "#aaa", padding: 10 }}
      />

      <TextInput
        placeholder="Beskrivelse"
        value={note.description}
        onChangeText={description => updateNote(note.id, { description })}
        multiline
        style={{ borderWidth: 1, borderColor: "#aaa", padding: 10, minHeight: 120 }}
      />
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => ({
          width: "100%",
          backgroundColor: "#007AFF",
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.85 : 1,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        })}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>Lagre</Text>
      </Pressable>
    </View>
  );
}
