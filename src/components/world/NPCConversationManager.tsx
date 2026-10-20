
import { useEffect, useState } from "react";

type NPCRegistration = {
  id: string;
  name: string;
  messages: string[];
};

type ActiveConversation = {
  id: string;
  name: string;
  message: string;
};

const listeners = new Set<
  (conversation: ActiveConversation | null) => void
>();

const registeredNPCs = new Map<string, NPCRegistration>();
const queue: NPCRegistration[] = [];

let activeNPCId: string | null = null;
let busy = false;
let nextTimer: ReturnType<typeof setTimeout> | undefined;
let finishTimer: ReturnType<typeof setTimeout> | undefined;

function publish(conversation: ActiveConversation | null) {
  listeners.forEach((listener) => listener(conversation));
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function scheduleNext(minDelay = 7000, maxDelay = 12000) {
  if (nextTimer) clearTimeout(nextTimer);

  nextTimer = setTimeout(() => {
    nextTimer = undefined;
    speakNext();
  }, randomBetween(minDelay, maxDelay));
}

function speakNext() {
  if (busy || queue.length === 0) return;

  const npc = queue.shift();
  if (!npc || !registeredNPCs.has(npc.id)) {
    scheduleNext(1000, 2000);
    return;
  }

  busy = true;
  activeNPCId = npc.id;

  const message =
    npc.messages[Math.floor(Math.random() * npc.messages.length)] ??
    "There is always something new to discover here.";

  publish({
    id: npc.id,
    name: npc.name,
    message,
  });

  finishTimer = setTimeout(() => {
    finishTimer = undefined;
    publish(null);

    activeNPCId = null;
    busy = false;

    if (registeredNPCs.has(npc.id)) {
      queue.push(npc);
    }

    scheduleNext();
  }, randomBetween(5000, 7500));
}

export function registerNPC(npc: NPCRegistration) {
  registeredNPCs.set(npc.id, npc);

  if (!queue.some((item) => item.id === npc.id)) {
    queue.push(npc);
  }

  if (!nextTimer && !busy) {
    scheduleNext(5000, 9000);
  }
}

export function unregisterNPC(id: string) {
  registeredNPCs.delete(id);

  for (let i = queue.length - 1; i >= 0; i--) {
    if (queue[i].id === id) queue.splice(i, 1);
  }

  if (activeNPCId === id) {
    if (finishTimer) clearTimeout(finishTimer);
    finishTimer = undefined;

    publish(null);
    activeNPCId = null;
    busy = false;
    scheduleNext(1500, 3000);
  }

  if (registeredNPCs.size === 0) {
    if (nextTimer) clearTimeout(nextTimer);
    if (finishTimer) clearTimeout(finishTimer);

    nextTimer = undefined;
    finishTimer = undefined;
    activeNPCId = null;
    busy = false;
    queue.length = 0;
  }
}

export function useNPCConversation(id: string) {
  const [conversation, setConversation] =
    useState<ActiveConversation | null>(null);

  useEffect(() => {
    const listener = (next: ActiveConversation | null) => {
      setConversation(next?.id === id ? next : null);
    };

    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, [id]);

  return conversation?.id === id ? conversation : null;
}
