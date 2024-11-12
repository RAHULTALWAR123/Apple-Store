import {create} from "zustand";
import axios from "../lib/axios";
import {toast} from "react-hot-toast";


export const useOrderStore = create((set) => ({
    orders: [],
    loading: false,

    fetchAllOrders: async (userId) => {
        set({loading: true});
        try{
            const res = await axios.get(`/orders/${userId}`);
            set({orders: res.data, loading: false});
            console.log(res.data);
        }catch(error){
            set({loading: false});
            toast.error(error.response.data.message || "Something went wrong");
        }

    },

    toggleOrderStatus: async (orderId) => {
        set({ loading: true });
        try {
            const res = await axios.patch(`/orders/${orderId}`);
            
            // Update the state with the new status immediately
            set((state) => ({
                orders: state.orders.map((order) =>
                    order._id === orderId ? { ...order, status: res.data.status } : order
                ),
                loading: false,
            }));
            
            toast.success("Order status updated successfully");
        } catch (error) {
            set({ loading: false });
            const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
            toast.error(errorMessage);
        }
    },

    deleteOrder: async (orderId) => {
        set({ loading: true });
        try {
            await axios.delete(`/orders/cancel/${orderId}`);
            set((state) => ({
                orders: state.orders.filter((order) => order._id !== orderId),
                loading: false
            }))
            toast.success("Order cancelled successfully");
        } catch (error) {
            set({ loading: false });
            const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
            toast.error(errorMessage);
        }
    }
    
}))
