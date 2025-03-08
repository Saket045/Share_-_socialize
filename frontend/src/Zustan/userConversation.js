import { create } from "zustand";

const userConversation = create((set) => ({
  selectedConversation: null,
  message: [],
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  setMessages: (message) => set({ message }),
  resetConversation: () => set({ selectedConversation: null, message: [] }) // Reset state
}));

export default userConversation;
