import { Tenant } from "@/types/tenant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TenantState {
  tenant: Tenant | null;
  tenants: Tenant[];
}

const initialState: TenantState = {
  tenant: null,
  tenants: [],
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<Tenant | null>) => {
      state.tenant = action.payload;
    },
    setTenants: (state, action: PayloadAction<Tenant[] | []>) => {
      state.tenants = action.payload;
    },
  },
});

export const { setTenant, setTenants } = tenantSlice.actions;
export const tenantReducer = tenantSlice.reducer;
