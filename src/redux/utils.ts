import { Action } from "redux";

type ActionHandlers<S> = {
  [key: string]: (state: S, action: any) => S; // eslint-disable-line @typescript-eslint/no-explicit-any
};
export interface ActionWithPayload<T> extends Action {
  payload: T;
} 

export function createReducer<TState>(
  initialState: TState,
  handlers: ActionHandlers<TState>
) {
  return function (state: TState, action: Action) {
    state ??= initialState;
    const handler = handlers[action.type];
    const nextState = handler?.(state, action) ?? state;

    return nextState;
  };
}
