import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Participant, T_ParticipantAddData, T_ParticipantsListResponse} from "modules/types.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
import {saveTender} from "store/slices/tendersSlice.ts";
import {Participant} from "src/api/Api.ts";

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

export const deleteParticipant = createAsyncThunk<T_Participant[], string, AsyncThunkConfig>(
    "delete_participant",
    async function(participant_id) {
        const response = await api.participants.participantsDeleteDelete(participant_id) as AxiosResponse<T_Participant[]>
        return response.data
    }
)

export const updateParticipant = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_participant",
    async function({participant_id, data}) {
        await api.participants.participantsUpdateUpdate(participant_id as string, data as Participant)
    }
)

export const updateParticipantImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_participant_image",
    async function({participant_id, data}) {
        await api.participants.participantsUpdateImageCreate(participant_id as string, data as {image?: File})
    }
)

export const createParticipant = createAsyncThunk<void, T_ParticipantAddData, AsyncThunkConfig>(
    "update_participant",
    async function(data) {
        await api.participants.participantsCreateCreate(data)
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
        builder.addCase(deleteParticipant.fulfilled, (state:T_ParticipantsSlice, action: PayloadAction<T_Participant[]>) => {
            state.participants = action.payload
        });
    }
})

export const { updateParticipantName, removeSelectedParticipant} = participantsSlice.actions;

export default participantsSlice.reducer