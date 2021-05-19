interface UserState {
  userName: string;
}

const initialState = {
  userName: "",
};

type Action = {
  type: string;
  payload: string;
};

export const userReducer = (
  state: UserState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};
