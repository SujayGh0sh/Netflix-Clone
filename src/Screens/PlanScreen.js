import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./PlanScreen.css";

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshort) => {
        querySnapshort.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products") 
      .where("active", "==", true)
      .get()
      .then((querySnapshort) => {
        const products = {};
        querySnapshort.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  console.log(products);
  if(subscription && subscription.role)
  if(subscription && subscription.current_period_end)
  
  console.log("ads",subscription, subscription.role);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occurred: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51MVcA6SCUViwXHI98bsZZ6SAApob7bE88hnBKjXFNM4Xh510P0D4WMNYgEvdpfcO4vMivKZnkMokYeewDMzahKz500voXiuD0n"
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="planScreen">
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productsId, productData]) => {

        let isCurrentPlan=null;
  if(subscription && subscription.role)
    isCurrentPlan = productData.name?.includes(subscription.role);
        return (
          <div
            key={productsId}
            className={`${isCurrentPlan && "planScreen_plan--disabled"} planScreen_plan`}
          >
            <div className="planScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPlan && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPlan ? "Current Plan" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  
  );
}

export default PlanScreen;
