import { defaultStore } from "./store";

const store = () => JSON.parse(localStorage.getItem("store")) || defaultStore;
const updateStore = newStore =>
  localStorage.setItem("store", JSON.stringify(newStore));

const SET_STORE_KEY = (key, value) => {
  let state = store();
  state = {
    ...state,
    [key]: value
  };
  updateStore(state);
};

export const GET_IDEAS = () =>
  new Promise(resolve => {
    const { ideas } = store();
    resolve({ data: ideas });
  });

export const GET_IDEA = () =>
  new Promise(resolve => {
    let { ideas } = store();
    const newIdea = {
      id: `IDEA${Date.now() % 100000}`,
      created_date: Date.now(),
      title: "Edit title",
      body: "Edit Body"
    };

    ideas = [newIdea, ...ideas];

    SET_STORE_KEY("ideas", ideas);
    resolve({ data: { ideas, newIdea } });
  });

export const DELETE_IDEA = toDeleteId =>
  new Promise(resolve => {
    let { ideas } = store();
    ideas = ideas.filter(({ id }) => id !== toDeleteId);

    SET_STORE_KEY("ideas", ideas);
    resolve({ data: ideas });
  });

export const UPDATE_IDEA = updatedIdea =>
  new Promise(resolve => {
    let { ideas } = store();
    ideas = ideas.map(idea => {
      if (idea.id === updatedIdea.id) {
        return updatedIdea;
      }

      return idea;
    });

    SET_STORE_KEY("ideas", ideas);
    resolve({ data: ideas });
  });
