import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Participant, T_ParticipantsListResponse} from "modules/types.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";
import {saveTender} from "store/slices/tendersSlice.ts";

type T_ParticipantsSlice = {
    participant_name: string
    participant: null | T_Participant
    participants: T_Participant[]
}

const initialState:T_ParticipantsSlice = {
    participant_name: "",
    participant: null,
    participants: []
}

export const fetchParticipant = createAsyncThunk<T_Participant, string, AsyncThunkConfig>(
    "fetch_participant",
    async function(id) {
        const response = await api.participants.participantsRead(id) as AxiosResponse<T_Participant>
        return response.data
    }
)

export const fetchParticipants = createAsyncThunk<T_Participant[], object, AsyncThunkConfig>(
    "fetch_participants",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.participants.participantsList({
            participant_name: state.participants.participant_name
        }) as AxiosResponse<T_ParticipantsListResponse>

        thunkAPI.dispatch(saveTender({
            draft_tender_id: response.data.draft_tender_id,
            participants_count: response.data.participants_count
        }))

        return response.data.participants
    }
)

export const addParticipantToTender = createAsyncThunk<void, string, AsyncThunkConfig>(
    "participants/add_participant_to_tender",
    async function(participant_id) {
        await api.participants.participantsAddToTenderCreate(participant_id)
    }
)

const participantsSlice = createSlice({
    name: 'participants',
    initialState: initialState,
    reducers: {
        updateParticipantName: (state, action) => {
            state.participant_name = action.payload
        },
        removeSelectedParticipant: (state) => {
            state.participant = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchParticipants.fulfilled, (state:T_ParticipantsSlice, action: PayloadAction<T_Participant[]>) => {
            state.participants = action.payload
        });
        builder.addCase(fetchParticipant.fulfilled, (state:T_ParticipantsSlice, action: PayloadAction<T_Participant>) => {
            state.participant = action.payload
        });
    }
})

export const { updateParticipantName, removeSelectedParticipant} = participantsSlice.actions;

export default participantsSlice.reducer