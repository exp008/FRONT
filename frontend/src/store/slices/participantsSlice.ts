import {createSlice} from "@reduxjs/toolkit";

type T_ParticipantsSlice = {
    participant_name: string
}

const initialState:T_ParticipantsSlice = {
    participant_name: "",
}


const participantsSlice = createSlice({
    name: 'participants',
    initialState: initialState,
    reducers: {
        updateParticipantName: (state, action) => {
            state.participant_name = action.payload
        }
    }
})

export const { updateParticipantName} = participantsSlice.actions;

export default participantsSlice.reducer