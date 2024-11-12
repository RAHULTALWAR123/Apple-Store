import Order from "../models/order.model.js";

export const getUserOrders = async (req, res) => {
	try {
		const userId = req.params.userId;
        

		const orders = await Order.find({ user: userId })
			.populate("products.product", "quantity name image description price") 
			.sort({ createdAt: -1 }); 

			if(orders.length === 0){
				return res.status(404).json({ message: "No orders found" });
			}
		

		res.status(200).json(orders);
	} catch (error) {
		console.error("Error fetching user orders:", error);
		res.status(500).json({ message: "Unable to fetch orders", error });
	}
};


export const toggleStatus = async (req, res) => {
	try {
		const {orderId} = req.params;

		const order = await Order.findById(orderId);

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		if (order.status === "pending") {
			order.status = "delivered";
			await order.save();
			return res.status(200).json({ message: "Order status updated to delivered successfully" });
		}

		res.status(400).json({ message: "Order is already delivered" });

	} catch (error) {
		res.status(500).json({ message: "Unable to update order status", error });

	}
}

export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find({});

		if (orders.length === 0) {
			return res.status(404).json({ message: "No orders found" });
		}

		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ message: "Unable to fetch orders", error });
		
	}
}

export const cancelOrder = async (req, res) => {
	try {
		const { orderId } = req.params;
		const userId = req.user._id;

		const order = await Order.findById(orderId);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		if (!order.user.equals(userId)) {
			return res.status(403).json({ message: "You are not authorized to cancel this order" });
		}

		if (order.status === "delivered") {
			return res.status(400).json({ message: "Order cannot be returned" });
		}

		// Delete the order
		await Order.findByIdAndDelete(orderId);

		// Now calculate updated revenue
		const salesData = await Order.aggregate([
			{
				$group: {
					_id: null,
					totalRevenue: { $sum: "$totalAmount" }
				}
			}
		]);

		const updatedRevenue = salesData[0]?.totalRevenue || 0;

		res.status(200).json({ message: "Order canceled successfully", updatedRevenue });

	} catch (error) {
		res.status(500).json({ message: "Unable to cancel order", error });
	}
};
