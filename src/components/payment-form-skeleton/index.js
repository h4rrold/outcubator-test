import React from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const PaymentFormSkeleton = () => {
  return (
    <>
      <div className="form-content skeleton">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rect" animation="wave" height={48} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rect" animation="wave" height={48} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rect" animation="wave" height={65} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rect" animation="wave" height={48} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rect" animation="wave" height={48} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rect" animation="wave" height={48} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rect" animation="wave" height={48} />
          </Grid>
        </Grid>
      </div>
      <Skeleton variant="rect" animation="wave" height={48} />
    </>
  );
};

export default PaymentFormSkeleton;
