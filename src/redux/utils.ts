import { Action } from "redux";

export interface ActionWithPayload<T> extends Action {
  payload: T;
} 

type ActionHandlers<S> = {
  [key: string]: (state: S, action: any) => S; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export function createReducer<TState>(
  initialState: TState,
  handlers: ActionHandlers<TState>
) {
  return function (state: TState, action: Action) {
    state ??= initialState;
    const handler = handlers[action.type];
    return handler?.(state, action) ?? state;
  };
}
