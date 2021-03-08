import React, { useEffect, useState } from 'react';
import { getUserCountryCode, getPaymentSystems } from './services/backend';
import { Card, Typography, LinearProgress } from '@material-ui/core';
import PaymentCardForm from './components/payment-form/index';
import PaymentFormSkeleton from './components/payment-form-skeleton';
import cc from 'currency-codes';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [userCountry, setUserCountry] = useState(null);
  const [paymentSystems, setPaymentSystems] = useState([]);

  useEffect(() => {
    async function fetchAndSetCountryCode() {
      setIsLoading(true);
      try {
        const response = await getUserCountryCode();
        if (response.status === 200) {
          const {
            data: { country }
          } = response;
          setUserCountry(country);
        }
      } catch (e) {
        console.log(e.error);
      }
      setIsLoading(false);
    }

    fetchAndSetCountryCode();
  }, []);

  useEffect(() => {
    async function getAndSetPaymentSystems() {
      if (userCountry) {
        setIsLoading(true);
        try {
          const response = await getPaymentSystems(userCountry);
          if (response.status === 200) {
            const { data: paymentSystems } = response;
            setPaymentSystems(paymentSystems);
          }
        } catch (e) {
          console.log(e.error);
        }
        setIsLoading(false);
      }
    }

    getAndSetPaymentSystems();
  }, [userCountry]);

  return (
    <div className="app">
      <header className="app-header">Payment widget</header>
      <main className="app-content">
        <Card className="widget-container">
          <div className="widget-loader-block">{isLoading && <LinearProgress />}</div>
          <div className="widget">
            <Typography align="center" variant="h5" color="primary" className="widget-title">
              Payment widget
            </Typography>

            {isLoading ? (
              <PaymentFormSkeleton />
            ) : (
              <PaymentCardForm
                currencies={cc.codes()}
                userCountry={userCountry}
                setUserCountry={setUserCountry}
                paymentSystems={paymentSystems}
              />
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}

export default App;
