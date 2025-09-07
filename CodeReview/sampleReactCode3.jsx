import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// Always good to add a description of what the PR is about - especially if it's not a one liner change like this one
// From what I can tell, this component is for a shopping cart that contains items, coupon code, discount rate and shipping info
// This component is too big - I would consider refactoring some of its code into child components - one for cart items display and one for cart summary

const ShoppingCart = ({ items, onUpdateCart, onCheckout }) => { // Props need types - remember that React is based on Typescript
  // What if items, onUpdateCart or onCheckout are undefined? Maybe have a default behaviour?
  const [cartItems, setCartItems] = useState(items || []); // Try to define the type of cartItems - we don't know what cartItems looks like. It's always better to be explicit with types for readability and future debugging purposes
  const [isLoading, setIsLoading] = useState(false); // The implementation works, but have you considered using a custom hook for this? Loading something is a common behaviour across the entire application, not just this component
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({ // Same idea here. Discount and coupon code seem specific to this component, but shipping info and payment method are likely information that could be used elsewhere, although you would probably know more about where exactly everything's used. Take a look at the rest of the application and try to refactor them into custom hooks if they're used somewhere else!
    address: "",
    city: "",
    zipCode: "",
    country: "US",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [orderNotes, setOrderNotes] = useState("");
  const router = useRouter();

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item // Expanding on the comment above about how carItem should have a type - without explicit typing, we don't know if "quantity" is a new field being added here or if that's the field that we're editing
        )
      );
    }
    onUpdateCart(cartItems);
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    onUpdateCart(cartItems);
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("/api/coupons/validate", {
        code: couponCode,
        items: cartItems,
      });

      if (response.data.valid) {
        setDiscount(response.data.discountAmount);
        alert(`Coupon applied! You saved $${response.data.discountAmount}`);
      } else {
        alert("Invalid coupon code");
      }
    } catch (error) {
      alert("Failed to apply coupon");
    }
    setIsLoading(false);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity; // What if price or quantity is null? Again, this is another reason why explicit typing is important.
    }, 0);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.08; // 8% tax
    // // Let this be a constant or enum - 8% is a static value.
    // This is a bit of a business logic comment, but have you also considered how tax rate might change depending on the country? Asking out of caution because you have US, Canada and UK for shipping options and they all have different tax rates
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal > 50) return 0; // 50 and 9.99 should be constants
    return 9.99;
  };

  // This function and all the calculate functions within it can all be moved to a util file so that they don't get redefined upon every render of the component. Just make sure to pass in the required data as parameters. You can then memoize them in this component so that they don't re-calculate every time
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const shipping = calculateShipping();
    return subtotal + tax + shipping - discount;
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty"); // Alert is fine but have you considered implementing a custom error message?
      return;
    }

    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.zipCode) {
      alert("Please fill in all shipping information");
      return;
    }

    setIsLoading(true);

    // Having API call in the component isn't wrong, but it makes components unnecessarily long. As a general rule of thumb for readability, consider the following options:
    // 1. If the application is already using react-query to handle service calls and data processing, you can use it
    // 2. If the API call along with relevant logic gets used in multiple places, you can use custom logic. For example, useOrderConfirmation.
    // 3. Even if the above don't work, you can still separate out the service calls into "Services" folder and call them here.

    try {
      const orderData = {
        items: cartItems,
        shipping: shippingInfo,
        paymentMethod,
        couponCode: couponCode || null,
        discount,
        notes: orderNotes,
        total: calculateTotal(),
      };

      const response = await axios.post("/api/orders", orderData);

      if (response.data.success) {
        alert("Order placed successfully!");
        onCheckout(response.data.orderId);
        router.push(`/order-confirmation/${response.data.orderId}`);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert("Invalid order data. Please check your information."); // These alert messages are better stored in a JSON file and called, especially if you want to support multilingual support in the future
      } else if (error.response?.status === 402) {
        alert("Payment failed. Please try a different payment method.");
      } else {
        alert("Failed to place order. Please try again.");
      }
    }

    setIsLoading(false);
  };

  // Could be in a util file. Or you ca
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span className="item-count">{cartItems.length} items</span>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button onClick={() => router.push("/products")}>
                {/* this is correct because <a> is for external, not internal, navigation */}
                {/* Using <Link> in react-router-dom is better, but this is still acceptable */}
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">{formatPrice(item.price)}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="item-actions">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div className="coupon-section">
            <h3>Coupon Code</h3>
            <div className="coupon-input">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
              />
              <button
                onClick={applyCoupon}
                disabled={isLoading || !couponCode.trim()}
              >
                Apply
              </button>
            </div>
          </div>

          <div className="shipping-section">
            {/* Form values are not sanitized */}
            <h3>Shipping Information</h3>
            <div className="shipping-form">
              <input
                type="text"
                placeholder="Address"
                value={shippingInfo.address}
                onChange={(e) =>
                  setShippingInfo((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="City"
                value={shippingInfo.city}
                onChange={(e) =>
                  setShippingInfo((prev) => ({ ...prev, city: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="ZIP Code"
                value={shippingInfo.zipCode}
                onChange={(e) =>
                  setShippingInfo((prev) => ({
                    ...prev,
                    zipCode: e.target.value,
                  }))
                }
              />
              <select
                value={shippingInfo.country}
                onChange={(e) =>
                  setShippingInfo((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
              >
                {/* Just like below, these options are refactorable with a constant instead of listing them all out */}
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>

          <div className="payment-section">
            <h3>Payment Method</h3>
            <div className="payment-options">
              {/* this is not wrong, but maybe we can refactor this - storing "Credit Card" and "Paypal" as a part of a payment methods constant in a static constants file would be one way */}
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={paymentMethod === "credit"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal
              </label>
            </div>
          </div>

          <div className="order-notes">
            <h3>Order Notes</h3>
            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Special instructions for your order..."
              rows="3"
            />
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>{formatPrice(calculateTax())}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{formatPrice(calculateShipping())}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount:</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total:</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={isLoading || cartItems.length === 0}
          >
            {isLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Consider implementing an error boundary so that the page doesn't go down because of a single error

export default ShoppingCart;
