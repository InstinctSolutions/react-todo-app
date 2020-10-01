import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useState
} from "react";
import { Item } from "../types/";
interface Action {
  type: "CREATED" | "DELETED" | "UPDATED";
  payload?: any;
}

// export interface State {
//   id: number;
//   data: string;
//   isCompleted: boolean;
// }

const TodosContext = createContext({
  state: [],
  dispatch: "CREATED",
  searchData: [
    {
      id: 0,
      data: "",
      isCompleted: false,
      created_time: ""
    }
  ],
  handleSearchData: (data: Array<object>) => {}
});

const reducer = (state: any, action: Action) => {
  const mutatedItem = action.payload;
  if (!state) {
    return;
  }
  if (!mutatedItem) {
    return;
  }
  const mutatedIndex = state.findIndex(
    (item: Item) => item.id === mutatedItem.id
  );
  switch (action.type) {
    case "CREATED":
      if (mutatedIndex < 0) {
        state.push(mutatedItem);
      }
      break;
    case "DELETED":
      if (mutatedIndex >= 0) {
        state.splice(mutatedIndex, 1);
      }
      break;
    case "UPDATED":
      state[mutatedIndex] = mutatedItem;
      break;
    default:
  }
  return [...state];
};

interface TodoProps {
  children: React.ReactNode;
  todos: never;
}

export const TodosProvider: React.FC<TodoProps> = (props: TodoProps) => {
  const [state, dispatch] = useReducer(reducer, props.todos);
  const [searchData, setSearchData] = useState<Array<object>>([{}]);

  const value = useMemo(() => {
    const handleSearchData = (data: Array<object>) => {
      setSearchData(data);
    };
    return {
      state,
      dispatch,
      searchData,
      handleSearchData
    };
  }, [state, dispatch, searchData]);
  return (
    <TodosContext.Provider value={value}>
      {props.children}
    </TodosContext.Provider>
  );
};

export const useTodosStore = () => useContext(TodosContext);
