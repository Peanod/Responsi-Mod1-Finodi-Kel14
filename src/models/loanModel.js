import { supabase } from "../config/supabaseClient.js";

export const LoanModel = {
    async getAll(statusFilter) {
        let query = supabase.from("loans").select("*");
        if (statusFilter) query = query.eq("status", statusFilter);
        
        const { data, error } = await query;
        if (error) throw error;
        return data;
    },
    async getById(id) {
        const { data, error } = await supabase.from("loans").select("*").eq("id", id).single();
        if (error) throw error;
        return data;
    },
    async create(payload) {
        const { data, error } = await supabase.from("loans").insert([payload]).select().single();
        if (error) throw error;
        return data;
    },
    async update(id, payload) {
        const { data, error } = await supabase.from("loans").update(payload).eq("id", id).select().single();
        if (error) throw error;
        return data;
    },
    async remove(id) {
        const { error } = await supabase.from("loans").delete().eq("id", id);
        if (error) throw error;
        return { message: "Data peminjaman berhasil dihapus" };
    }
};
