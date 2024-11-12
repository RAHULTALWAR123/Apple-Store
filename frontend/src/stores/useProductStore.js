import {create} from "zustand";
import axios from "../lib/axios";
import {toast} from "react-hot-toast";



export const useProductStore = create((set) => ({
    products: [],
    product: null,
    loading: false,
    setProducts: (products) => set({products}),

    createProduct: async (productData) => {
        set({loading: true});
        try {
            const res = await axios.post("/products", productData);
            set((prevState)=>({
                products: [...prevState.products, res.data],
                loading: false
            }))
            toast.success("Product created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            set({loading: false});
        }
    },

    editProduct: async (productId, productData) => {
        set({loading: true});
        try {
            const res = await axios.post(`/products/${productId}`, productData);
            set((prevState) => ({
                products: prevState.products.map((product) =>
                    product._id === productId ? {...product, ...res.data} : product
                ),
                loading: false
            }))
            toast.success("Product updated successfully");
        }catch(error){
            toast.error(error.response.data.message);
            set({loading: false});
        }
    },

    fetchAllProducts: async () => {
        set({loading: true});
        try {
            const res = await axios.get("/products");
            set({products: res.data.products, loading: false});
        } catch (error) {
            set({loading: false});
            toast.error(error.response.data.message || "Something went wrong");
        }
    },

    fetchProduct: async (id) => {
        set({loading: true});
        try {
            const res = await axios.get(`/products/${id}`);
            set({product: res.data, loading: false});
            console.log(res.data);
        } catch (error) {
            set({loading: false});
            toast.error(error.response.data.message || "Something went wrong");
        }
    },

    fetchProductByName: async (name) => {
        set({loading: true, products: []});
        try{
            const res = await axios.get(`/products/name/${name}`);
            set({products: res.data, loading: false});
            console.log(res.data);
        }
        catch(error){
            set({loading: false});
            toast.error(error.response.data.message || "Something went wrong");
        }
    },

    


    deleteProduct: async (id) => {
        set({loading: true});
        try {
            await axios.delete(`/products/${id}`);
            set((prevState) => ({
                products: prevState.products.filter((product) => product._id !== id),
                loading: false,
            }));
            toast.success("Product deleted successfully");
        }catch (error) {
            toast.error(error.response.data.message);
            set({loading: false});
        }
    },

    toggleFeaturedProduct: async (id) => {
        set({loading: true});
        try {
            const res = await axios.patch(`/products/${id}`);
            set((prevState) => ({
                products: prevState.products.map((product) =>
                    product._id === id ? {...product, isFeatured: res.data.isFeatured} : product
                ),
                loading: false,
            }));
            // toast.success("Product updated successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            set({loading: false});
        }
    },

    fetchProductsByCategory: async (category) => {
        set({loading: true});
        try {
        const res = await axios.get(`/products/category/${category}`);
        set({products: res.data.products, loading: false});
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            set({loading: false});
        }
    },

    fetchLowToHighProducts: async (category) => {
        set({loading: true});
        try {
            const res = await axios.get(`/products/category1/${category}`);
            set({products: res.data.products, loading: false});
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            set({loading: false});
        }
    },

    fetchHighToLowProducts: async (category) => {
        set({loading: true});
        try {
            const res = await axios.get(`/products/category2/${category}`);
            set({products: res.data.products, loading: false});
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            set({loading: false});
        }
    },


    fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},

}));