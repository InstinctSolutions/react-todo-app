import React from "react";
import { useTodosStore } from "../../providers/todoStore";
import moment from "moment";

it("Test Todo Context", () => {
  const TestComponent: React.FC = ({ children }) => {
    const { state, dispatch } = useTodosStore();
    dispatch({
      type: "CREATED",
      payload: {
        id: 1,
        data: "test",
        isCompleted: false,
        created_time: moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
      }
    });

    expect(dispatch).toBeCalled();
    expect(state).toBe([
      {
        id: 1,
        data: "test",
        isCompleted: false,
        created_time: moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
      }
    ]);
    return <>{children}</>;
  };
  expect(<TestComponent />).not.toBeNull();
});
