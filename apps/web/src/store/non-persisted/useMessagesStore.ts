import type { CachedConversation } from '@xmtp/react-sdk';

import { createTrackedSelector } from 'react-tracked';
import { create } from 'zustand';

interface State {
  selectedConversation: CachedConversation | null;
  setSelectedConversation: (
    selectedConversation: CachedConversation | null
  ) => void;
}

const store = create<State>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set(() => ({ selectedConversation }))
}));

export const useMessagesStore = createTrackedSelector(store);
