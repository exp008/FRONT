import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import tendersReducer from "./slices/tendersSlice.ts"
import participantsReducer from "./slices/participantsSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        tenders: tendersReducer,
        participants: participantsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;