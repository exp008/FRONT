import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {E_TenderStatus, T_Tender, T_TendersFilters, T_Participant} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_TendersSlice = {
    draft_tender_id: number | null,
    participants_count: number | null,
    tender: T_Tender | null,
    tenders: T_Tender[],
    filters: T_TendersFilters,
    save_mm: boolean
}

const initialState:T_TendersSlice = {
    draft_tender_id: null,
    participants_count: null,
    tender: null,
    tenders: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0],
        owner: ""
    },
    save_mm: false
}

export const fetchTender = createAsyncThunk<T_Tender, string, AsyncThunkConfig>(
    "tenders/tender",
    async function(tender_id) {
        const response = await api.tenders.tendersRead(tender_id) as AxiosResponse<T_Tender>
        return response.data
    }
)

export const fetchTenders = createAsyncThunk<T_Tender[], object, AsyncThunkConfig>(
    "tenders/tenders",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.tenders.tendersList({
            status: state.tenders.filters.status,
            date_formation_start: state.tenders.filters.date_formation_start,
            date_formation_end: state.tenders.filters.date_formation_end
        }) as AxiosResponse<T_Tender[]>

        return response.data.filter(tender => tender.owner.includes(state.tenders.filters.owner))
    }
)

export const removeParticipantFromDraftTender = createAsyncThunk<T_Participant[], string, AsyncThunkConfig>(
    "tenders/remove_participant",
    async function(participant_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.tenders.tendersDeleteParticipantDelete(state.tenders.tender.id, participant_id) as AxiosResponse<T_Participant[]>
        return response.data
    }
)

export const deleteDraftTender = createAsyncThunk<void, object, AsyncThunkConfig>(
    "tenders/delete_draft_tender",
    async function(_, {getState}) {
        const state = getState()
        await api.tenders.tendersDeleteDelete(state.tenders.tender.id)
    }
)

export const sendDraftTender = createAsyncThunk<void, object, AsyncThunkConfig>(
    "tenders/send_draft_tender",
    async function(_, {getState}) {
        const state = getState()
        await api.tenders.tendersUpdateStatusUserUpdate(state.tenders.tender.id)
    }
)

export const updateTender = createAsyncThunk<void, object, AsyncThunkConfig>(
    "tenders/update_tender",
    async function(data, {getState}) {
        const state = getState()
        await api.tenders.tendersUpdateUpdate(state.tenders.tender.id, {
            ...data
        })
    }
)

export const updateParticipantValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "tenders/update_mm_value",
    async function({participant_id, won},thunkAPI) {
        const state = thunkAPI.getState()
        await api.tenders.tendersUpdateParticipantUpdate(state.tenders.tender.id, participant_id, {won})
    }
)

export const acceptTender = createAsyncThunk<void, string, AsyncThunkConfig>(
    "tenders/accept_tender",
    async function(tender_id,{dispatch}) {
        await api.tenders.tendersUpdateStatusAdminUpdate(tender_id, {status: E_TenderStatus.Completed})
        await dispatch(fetchTenders)
    }
)

export const rejectTender = createAsyncThunk<void, string, AsyncThunkConfig>(
    "tenders/accept_tender",
    async function(tender_id,{dispatch}) {
        await api.tenders.tendersUpdateStatusAdminUpdate(tender_id, {status: E_TenderStatus.Rejected})
        await dispatch(fetchTenders)
    }
)

const tendersSlice = createSlice({
    name: 'tenders',
    initialState: initialState,
    reducers: {
        saveTender: (state, action) => {
            state.draft_tender_id = action.payload.draft_tender_id
            state.participants_count = action.payload.participants_count
        },
        removeTender: (state) => {
            state.tender = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTender.fulfilled, (state:T_TendersSlice, action: PayloadAction<T_Tender>) => {
            state.tender = action.payload
        });
        builder.addCase(fetchTenders.fulfilled, (state:T_TendersSlice, action: PayloadAction<T_Tender[]>) => {
            state.tenders = action.payload
        });
        builder.addCase(removeParticipantFromDraftTender.rejected, (state:T_TendersSlice) => {
            state.tender = null
        });
        builder.addCase(removeParticipantFromDraftTender.fulfilled, (state:T_TendersSlice, action: PayloadAction<T_Participant[]>) => {
            if (state.tender) {
                state.tender.participants = action.payload as T_Participant[]
            }
        });
        builder.addCase(sendDraftTender.fulfilled, (state:T_TendersSlice) => {
            state.tender = null
        });
    }
})

export const { saveTender, removeTender, triggerUpdateMM, updateFilters } = tendersSlice.actions;

export default tendersSlice.reducer