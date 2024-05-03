import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useCallback, useMemo } from "react";
import { SimulationConfig, SimulationRun, SimulationSession } from "./types";

// Create an atom to store the list of sessions
export const sessionListAtom = atomWithStorage<
  Record<string, SimulationSession>
>("solar-panel-sims-sessions", {});

// Create an atom to store the list of visible sessions
export const visibleSessionsAtom = atomWithStorage<string[]>(
  "solar-panel-sims-visible-sessions",
  []
);

// Hook to manage visible sessions
export function useVisibleSessions() {
  const [sessionList] = useAtom(sessionListAtom);
  const [visibleSessions, setVisibleSessions] = useAtom(visibleSessionsAtom);

  return [
    visibleSessions,
    {
      show: (id?: string) => {
        if (id) {
          setVisibleSessions((sessions) => [id, ...sessions]);
        } else {
          setVisibleSessions(Object.keys(sessionList));
        }
      },
      hide: (id?: string) => {
        if (id) {
          setVisibleSessions((sessions) =>
            sessions.filter((sessionId) => sessionId !== id)
          );
        } else {
          setVisibleSessions([]);
        }
      },
    },
  ] as const;
}

// Hook to manage sessions
export function useSessions() {
  const [sessionList, setSessionList] = useAtom(sessionListAtom);

  const deleteSessions = useCallback(() => {
    setSessionList({});
  }, []);

  return { deleteSessions };
}

// Hook to manage a specific session
export function useSession(id: string) {
  const [sessionList, setSessionList] = useAtom(sessionListAtom);
  const [visibleSessions, actions] = useVisibleSessions();

  const session = useMemo(() => sessionList[id], [sessionList, id]);

  const setSessionName = useCallback(
    (name: string) => {
      setSessionList((list) => {
        const updatedSession = { ...list[id], name };
        return { ...list, [id]: updatedSession };
      });
    },
    [session]
  );

  return {
    session,
    setSessionName,
    get isVisible() {
      return visibleSessions.includes(id);
    },
    toggleVisibility: () => {
      if (visibleSessions.includes(id)) {
        actions.hide(id);
      } else {
        actions.show(id);
      }
    },
    deleteSession(id: string) {
      setSessionList((list) => {
        const { [id]: _, ...rest } = list;
        return rest;
      });
    },
  };
}

export const addSessionAtom = atom(
  null,
  (
    get,
    set,
    id: string,
    config: SimulationConfig,
    runs: Array<SimulationRun>,
    name?: string
  ) => {
    const createdOn = new Date().toISOString();
    const session: SimulationSession = {
      id,
      name: name || `Session ${new Date().toLocaleTimeString()}`,
      createdOn,
      config,
      runs,
    };

    const sessionList = get(sessionListAtom);
    if (Object.keys(sessionList).length >= 10) {
      return;
    }

    set(sessionListAtom, { ...get(sessionListAtom), [session.id]: session });
    set(visibleSessionsAtom, (sessions) => [session.id, ...sessions]);
  }
);
