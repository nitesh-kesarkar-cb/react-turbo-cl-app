import { BiomarkerConfig, ScoreEngineState, Tier } from '@/types/ScoreEngine';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ScoreEngineState = {
    score: 0,
    history: [],
    tiers: [],
    biomarkers: [],
};

const scoreEngineSlice = createSlice({
    name: 'scoreEngine',
    initialState,
    reducers: {
        setTiers(state, action: PayloadAction<Tier[]>) {
            state.tiers = action.payload;
        },
        setBiomarkers(state, action: PayloadAction<BiomarkerConfig[]>) {
            state.biomarkers = action.payload;
        },
    },
});

export const { setTiers, setBiomarkers } = scoreEngineSlice.actions;
export const scoreEngineReducer = scoreEngineSlice.reducer;