
import { Delivery } from '../models/Delivery.js'; 

export const createDelivery = async (orderId, address) => {
  try {
    const delivery = new Delivery({
      orderId,
      address,
      status: 'pending',  // Initial status
    });
    await delivery.save();
    return delivery;
  } catch (error) {
    throw new Error('Failed to create delivery');
  }
};

export const updateDeliveryStatus = async (deliveryId, status) => {
  try {
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      deliveryId,
      { status },
      { new: true }
    );
    return updatedDelivery;
  } catch (error) {
    throw new Error('Failed to update delivery status');
  }
};

export const getDeliveryStatus = async (deliveryId) => {
  try {
    const delivery = await Delivery.findById(deliveryId);
    return delivery.status;
  } catch (error) {
    throw new Error('Failed to fetch delivery status');
  }
};
