import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotesStore } from "./notes-store";

function createNote() {
  const notes = useNotesStore.getState().notes;
  const id = Math.random().toString(36).substring(2, 9);
  const newNote = {
    id,
    title: "New Note",
    description: "",
  };
  return newNote;
}

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 16,
        backgroundColor: "#F2F2F7",
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "700", color: "#1C1C1E" }}>
        FastNotes
      </Text>
      

      <ScrollView>
        
          <NotePreview />
          
        
      </ScrollView>
      <View style={{ width: "100%", marginTop: 8 }}>
        <Pressable
          onPress={() => {
            const newNote = createNote();
            useNotesStore.getState().addNote(newNote);
            router.push({ pathname: "/note/[id]", params: { id: newNote.id } });
          }}
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
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            Add Note
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export function NotePreview() {
  const notes = useNotesStore(state => state.notes);

  return (
    <View
      style={{
        paddingTop: 12,
        display: "flex",
        gap: 12,
        width: "100%",
      }}
      
    >
     {notes.map(note => (
        <Pressable
          key={note.id}
          style={({ pressed }) => ({
            backgroundColor: "#FFFFFF",
            padding: 18,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#E5E5EA",
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 6 },
            elevation: 2,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
          onPress={() =>
            router.push({
              pathname: "/note/[id]" as const,
              params: { id: String(note.id) },
            })
          }
        >
          <Text style={{ fontWeight: "600", fontSize: 18, color: "#1C1C1E" }}>
            {note.title}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: 13, color: "#8E8E93" }}>
            {note.description}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}