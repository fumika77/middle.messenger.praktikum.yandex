import EventBus from './EventBus';

export type Dispatch<State> = (
    nextStateOrAction: Partial<State> | Action<State>,
    payload?: any,
) => void;

export type Action<State> = (
    dispatch: Dispatch<State>,
    state: State,
    payload: any,
) => void;

export class Store<State extends Record<string, any>> extends EventBus {
    private state: State = {} as State;

    constructor(defaultState: State) {
        super();
        this.state = defaultState;
    }

    public getState(): State {
        return this.state;
    }

    public set(nextState: Partial<State>) {
        console.log('nextStatenextState')
        console.log(nextState)
        const prevState = { ...this.state };

        this.state = { ...this.state, ...nextState };
        this.emit('change', prevState, nextState);
    }

    dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
        console.log('nextStateOrAction', {...nextStateOrAction})
        if (typeof nextStateOrAction === 'function') {
            nextStateOrAction(this.dispatch.bind(this), this.state, payload);
        } else {
            this.set({ ...nextStateOrAction, screen: this.state.screen });
        }
    }
}
